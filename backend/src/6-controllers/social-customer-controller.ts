import express, { NextFunction, Request, Response } from "express";
import logic from "../5-logic/social-customer-logic"

const router = express.Router();

// GET http://localhost:3001/api/socialCustomer
router.get("/socialCustomer", async (request: Request, response: Response, next: NextFunction) => {

    try{
        
        const socialCustomer = await logic.getAllSocialCustomer();

        //Return all socialCustomer:
        response.status(201).json(socialCustomer)
    }
    catch(err: any){
        next(err);
    }
});

export default router; // Export all routes from this controller.

