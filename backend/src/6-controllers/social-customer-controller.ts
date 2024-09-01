import express, { NextFunction, Request, Response } from "express";
import logic from "../5-logic/social-customer-logic";
import SocialCustomerModel from "../4-models/social-customer-model";
import AddressesModel from "../4-models/addresses-model";
import TelModel from "../4-models/tel-model";

const router = express.Router();

// GET http://localhost:3001/api/socialCustomer
router.get("/socialCustomer", async (request: Request, response: Response, next: NextFunction) => {
    try {
      const socialCustomer = await logic.getAllSocialCustomer();

      //Return all socialCustomer:
      response.status(201).json(socialCustomer);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:3001/api/socialCustomer
router.post("/socialCustomer", async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {customer, tel, address} = request.body;
      
      const newCustomer = new SocialCustomerModel(customer);
      const newTel = new TelModel(tel)
      const newAddress = new AddressesModel(address)
      const addedSocialCustomer = await logic.addSocialCustomer(newCustomer,newTel, newAddress);

      response.json(addedSocialCustomer);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router; // Export all routes from this controller.
