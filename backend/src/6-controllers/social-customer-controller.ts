import express, { NextFunction, Request, Response } from "express";
import logic from "../5-logic/social-customer-logic";
import SocialCustomerModel from "../4-models/social-customer-model";
import AddressesModel from "../4-models/addresses-model";
import TelModel from "../4-models/tel-model";
import ProjectsCustomersModel from "../4-models/projects-customers-model";

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
      const {customer, tel, address, projectId} = request.body;
      
      const newCustomer = new SocialCustomerModel(customer);
      const newTel = new TelModel(tel)
      const newAddress = new AddressesModel(address)
      const newProjectCustomer = new ProjectsCustomersModel({customerId:newCustomer.customerId, projectId:projectId})
      const addedSocialCustomer = await logic.addSocialCustomer(newCustomer,[newTel], newAddress, newProjectCustomer);

      response.json(addedSocialCustomer);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:3001/api/socialCustomerList
router.post("/socialCustomerList", async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log('socialCustomerList')
      const {customers} = request.body;
      const addedSocialCustomer = await logic.addListOfSocialCustomer(customers);

      response.json(addedSocialCustomer);
    } catch (err: any) {
      next(err);
    }
  }
);
export default router; // Export all routes from this controller.
