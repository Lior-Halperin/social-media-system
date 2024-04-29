import axios, {AxiosInstance} from "axios";
import { IConfig } from "./Config";

class ApiService<T> {
private api: AxiosInstance;
private endpoint: string

 constructor(apiConfig:IConfig){
    this.api = axios.create({baseURL:apiConfig.baseURL})
    this.endpoint = apiConfig.socialCustomerEndpoint
}

async getAll(): Promise<T[]> {
    try {
      const response = await this.api.get<T[]>(this.endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<T> {
    try {
      const response = await this.api.get<T>(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async create(item: T): Promise<T> {
    try {
      const response = await this.api.post<T>(`${this.endpoint}`, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, item: T): Promise<T> {
    try {
      const response = await this.api.put<T>(`${this.endpoint}/${id}`, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.api.delete<void>(`${this.endpoint}/${id}`);
    } catch (error) {
      throw error;
    }
}
}

export default ApiService;