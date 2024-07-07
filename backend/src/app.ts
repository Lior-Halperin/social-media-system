import express, { NextFunction, Request, Response } from "express";
import config from "./2-utils/config";
import catchAll from "./3-middlewares/catch-all";
import logRequest from "./3-middlewares/log-request";
import authController from "./6-controllers/auth-controller";
import citiesController from "./6-controllers/cities-controller";
import socialCustomerController from "./6-controllers/social-customer-controller";
import volunteerProjectsController from "./6-controllers/volunteer-projects-controller";
import projectsCustomersController from "./6-controllers/projects-customers-controller";


import { RouteNotFound } from "./4-models/errors-model";
import cors from "cors";
import socketLogic from "./5-logic/socket-logic";

const expressServer = express();

//  Backend approval to browse AJAX to backend API
if (process.env.NODE_ENV === "development") expressServer.use(cors());

// Tell express to extract json object from request body into request.body variable:
expressServer.use(express.json());

// Middleware to run before controllers:
expressServer.use(logRequest);
// expressServer.use(verifyLoggedIn);

// Transfer requests to the controllers:
expressServer.use("/api",authController);
expressServer.use("/api",citiesController);
expressServer.use("/api",socialCustomerController);
expressServer.use("/api",volunteerProjectsController);
expressServer.use("/api",projectsCustomersController);
expressServer.use("/api",projectsCustomersController);

//If route not found:
expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
  const err = new RouteNotFound(request.method, request.originalUrl);
  next(err);
});

// Middleware to run if there is an error - must be last:
expressServer.use(catchAll);

const httpServer = expressServer.listen(config.serverPort, () => {
    try {
        console.log(`Listening on http://localhost:${config.serverPort}`);
    }    
    catch (err:any) {
        console.log("Error connecting to database:", err);
    }
    });


    socketLogic.init(httpServer)