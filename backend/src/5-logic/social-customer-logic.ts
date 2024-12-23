import dal from "../2-utils/dal";
import SocialCustomerModel from "../4-models/social-customer-model";
import SocketEvents from "../4-models/SocketEvents";
import telLogic from "./tel-logic";
import addressesLogic from "./addresses-logic";
import projectsCustomersLogic from "./projects-customers-logic";
import socketLogic from "./socket-logic";
import AddressesModel, { IAddressesModel } from "../4-models/addresses-model";
import SocialCustomerItemModel from "../4-models/social-customer-item-model";
import TelModel from "../4-models/tel-model";
import ProjectsCustomersModel from "../4-models/projects-customers-model";

// Get all socialCustomer
async function getAllSocialCustomer(): Promise<SocialCustomerModel[]> {
  try {
    const query = `SELECT customer_id AS customerId, first_name AS firstName, last_name AS lastName FROM social_customers`;
    const existingSocialCustomer = await dal.execute(query);
    return existingSocialCustomer;
  } catch (err: any) {
    throw err;
  }
}

//#region 2 - Add social customer functions
async function addSocialCustomer(
  customer: SocialCustomerModel,
  tel: TelModel[],
  address: AddressesModel,
  projectCustomer: ProjectsCustomersModel
): Promise<any> {
  // Todo - Change the any type.
  const connection = await dal.getConnection();

  try {
    // Start the transaction
    await dal.beginTransaction(connection);

    // 1. Add new customer to the social_customers table in the DB.
    const sqlQuery = `INSERT INTO social_customers (customer_id, first_name, last_name) VALUES(?,?,?)`;
    await dal.execute(
      sqlQuery,
      [customer.customerId, customer.firstName, customer.lastName],
      connection
    );

    // 2. Add new telephone to the tel table in the DB.
    for (let i = 0; i < tel.length; i++) {
      tel[i].customerId = customer.customerId;
      await telLogic.addTel(tel[i], connection);
    }

    // 3. Add new address to the address table in the DB.
    address.customerId = customer.customerId;
    await addressesLogic.addAddress(address, connection);


    
    // Commit transaction if all queries succeed
    await dal.commitTransaction(connection);

    // 4. Associating a customer with a project in the DB.
    await projectsCustomersLogic.addProjectsCustomers(projectCustomer);
    
    // Report via socket.io a new social customer has been added:
    socketLogic.reportAddNewData(customer, SocketEvents.AddedSocialCustomer);

    return { customer, tel, address };
  } catch (err: any) {
    // Rollback transaction if any query fails
    await dal.rollbackTransaction(connection);
    throw err;
  } finally {
    connection.release(); // Always release the connection back to the pool
  }
}

async function addListOfSocialCustomer(customers: SocialCustomerItemModel[]) {
  if (!customers.length) throw new Error("No list was received to add");

  for (let i = 0; i < customers.length; i++) {
    const customerItem = customers[i];
    const socialCustomer = new SocialCustomerModel(customerItem.customer);
    customerItem.address["customerId"] = socialCustomer.customerId;
    const addressToAdd = customerItem.address as IAddressesModel;
    const newAddress = new AddressesModel(addressToAdd); // Create address object.
    const newProjectCustomer = new ProjectsCustomersModel({
      customerId: socialCustomer.customerId,
      projectId: customerItem.projectId,
    });

    const newTelList: TelModel[] = [];

    // Create phone object from the array of phone numbers.
    for (let i = 0; i < customerItem.tels.length; i++) {
      const newTel = new TelModel({
        customerId: socialCustomer.customerId,
        telNumber: customerItem.tels[i],
      });
      newTelList.push(newTel);
    }

    await addSocialCustomer(
      socialCustomer,
      newTelList,
      newAddress,
      newProjectCustomer
    );
  }
}

//#endregion 2 - Add social customer functions

export default {
  getAllSocialCustomer,
  addSocialCustomer,
  addListOfSocialCustomer,
};
