import express, { NextFunction, Request, Response } from "express";
import config from "./2-utils/config";
import catchAll from "./3-middlewares/catch-all";
import logRequest from "./3-middlewares/log-request";
import authController from "./6-controllers/auth-controller";
import citiesController from "./6-controllers/cities-controller";
import donateController from "./6-controllers/donate-controller";

import { RouteNotFound } from "./4-models/errors-model";
import cors from "cors";

const server = express();

//  Backend approval to browse AJAX to backend API
if (process.env.NODE_ENV === "development") server.use(cors());

// Tell express to extract json object from request body into request.body variable:
server.use(express.json());

// Middleware to run before controllers:
server.use(logRequest);
// server.use(verifyLoggedIn);

// Transfer requests to the controllers:
server.use("/api",authController);
server.use("/api",citiesController);
server.use("/api",donateController);

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
