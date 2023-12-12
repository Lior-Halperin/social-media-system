import fs from "fs/promises";
import { NextFunction, Request, Response } from "express";
import { stripColors } from "colors";

const filePath = "./src/1-assets/log/log.txt"
console.log(stripColors)

// Get information on users actions (**it is recommended to use the library "winston")
async function logRequest(request: Request, response: Response, next: NextFunction){

    const now = new Date(); 
    const method = request.method;
    const route = request.originalUrl;
    const ip = request.ip;
    const data = `Time: ${now.toLocaleString()}, Method: ${method}, Route: ${route} ip:${ip}\n\n`;
    await fs.appendFile(filePath, data);

    next();
}

export default logRequest;

