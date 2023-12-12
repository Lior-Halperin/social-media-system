// The app.ts file is only picks up the server is does not listen to readings.
// He routes the calls to the controllers

import express, { NextFunction, Request, Response } from "express";
import catchAll from "./3-middlewares/catch-all";
import logRequest from "./3-middlewares/log-request";
import verifyLoggedIn from "./3-middlewares/verify-logged-in";
import { RouteNotFound } from "./4-models/errors-model";
import authController from "./6-controllers/auth-controller";
import config from "./2-utils/config";

// Create server:
const server = express();

// Tell express to extract json object from request body into request.body variable:
server.use(express.json());

// Middleware to run before controllers:
server.use(logRequest);
// server.use(verifyLoggedIn);

// Transfer requests to the controllers:
server.use("/api", authController);

//If route not found:
server.use("*", (request: Request, response: Response, next: NextFunction) => {
  const err = new RouteNotFound(request.method, request.originalUrl);
  next(err);
});

// Middleware to run after controllers

// Middleware to run if there is an error - must be last:
server.use(catchAll);

// Listen on port 3001:
server.listen(config.serverPort, () => {
try {
    console.log(`Listening on http://localhost:${config.serverPort}`);
}    
catch (err:any) {
    console.log("Error connecting to database:", err);
}
});
