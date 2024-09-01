import mysql from "mysql2";
import config from "./config";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Create pool of connection and supply one when needed:
const pool = mysql.createPool({
  host: config.dbConfig.host, // computer name
  user: config.dbConfig.user, // database username
  password: config.dbConfig.password, // database password
  database: config.dbConfig.database, // database name
});

// Define API URLs
const apiListUrl = {
    geographicApi: process.env.GEOGRAPHIC_API || "",
  };
  
  // Define the interface for the API request configuration
  interface ApiRequest {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: keyof typeof apiListUrl;
    endpoint: string;
    data?: any;  // Optional, as not all requests will have a body
    config?: AxiosRequestConfig; // Optional, additional Axios config if needed
  }
  
  // Generic function to issue requests to an external API
  async function api({ method, url, endpoint, data, config }: ApiRequest): Promise<AxiosResponse<any>> {
    try {
        
      const fullUrl = `${apiListUrl[url]}/${endpoint}`;
      const response = await axios({
        method,
        url: fullUrl,
        data,
        ...config,
      });
      return response;
    } catch (error: any) {
      throw error
    }
  }

// Promisified execute function for running SQL queries
function execute(
  sql: string,
  values?: any[],
  connection?: mysql.PoolConnection
): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    // Determine the appropriate query function
    const queryFunction = connection
      ? connection.query.bind(connection)
      : pool.query.bind(pool); // is the method provided by the mysql2 library to execute SQL queries using a specific connection.
    queryFunction(sql, values, (err, result) => {
      if (err) return reject(err); // If there's an error, reject the promise
      resolve(result); // If successful, resolve the promise with the result
    });
  });
}

// Function to get a connection from the pool for transaction handling
function getConnection(): Promise<mysql.PoolConnection> {
  return new Promise<mysql.PoolConnection>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);
      resolve(connection);
    });
  });
}

// Promisified function to begin a transaction
function beginTransaction(connection: mysql.PoolConnection): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    connection.beginTransaction((err) => {
      if (err) return reject(err); // If there's an error, reject the promise
      resolve(); // If successful, resolve the promise
    });
  });
}

// Promisified function to commit a transaction
function commitTransaction(connection: mysql.PoolConnection): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    connection.commit((err) => {
      if (err) return reject(err); // If there's an error, reject the promise
      resolve(); // If successful, resolve the promise
    });
  });
}

// Promisified function to rollback a transaction
function rollbackTransaction(connection: mysql.PoolConnection): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    connection.rollback((err) => {
      if (err) return reject(err); // If there's an error, reject the promise
      resolve(); // If successful, resolve the promise
    });
  });
}

export default {
  rollbackTransaction,
  commitTransaction,
  beginTransaction,
  execute,
  getConnection,
  api
};
