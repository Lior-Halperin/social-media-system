import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

// Todo: continue write the routes.

// GET http://localhost:3001/api/addresses
router.get("/addresses", async (request: Request, response: Response, next: NextFunction) => {
    try {
    
    } catch (err: any) {
      next(err);
    }
  }
);
