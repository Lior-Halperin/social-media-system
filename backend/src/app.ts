import express, { NextFunction, Request, Response } from "express";
import catchAll from "./3-middlewares/catch-all";
import logRequest from "./3-middlewares/log-request";
import authController from "./6-controllers/auth-controller";
import { RouteNotFound } from "./4-models/errors-model";
import config from "./2-utils/config";

const server = express();

//  Backend approval to browse AJAX to backend API
// if (config.isDevelopment) expressServer.use(cors());

// Tell express to extract json object from request body into request.body variable:
server.use(express.json());

// Middleware to run before controllers:
server.use(logRequest);
// server.use(verifyLoggedIn);

// Transfer requests to the controllers:
// server.use("/api", authController);

//If route not found:
server.use("*", (request: Request, response: Response, next: NextFunction) => {
  const err = new RouteNotFound(request.method, request.originalUrl);
  next(err);
});

// Middleware to run if there is an error - must be last:
server.use(catchAll);

server.listen(config.serverPort, () => {
    try {
        console.log(`Listening on http://localhost:${config.serverPort}`);
    }    
    catch (err:any) {
        console.log("Error connecting to database:", err);
    }
    });
