import dal from "../2-utils/dal";
import SocialCustomerModel from "../4-models/social-customer-model";
import SocketEvents from "../4-models/SocketEvents";
import Tel from "../4-models/tel-model";
import telLogic from "./tel-logic";
import addressesLogic from "./addresses-logic";
import socketLogic from "./socket-logic";
import AddressesModel from "../4-models/addresses-model";

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

async function addSocialCustomer(
    customer: SocialCustomerModel,
    tel: Tel,
    address: AddressesModel
  ): Promise<any> {
    const connection = await dal.getConnection();
  
    try {
      // Start the transaction
      await dal.beginTransaction(connection);
  
      // 1. Add new customer to the social_customers table in the DB.
      const sqlQuery = `INSERT INTO social_customers (customer_id, first_name, last_name) VALUES(?,?,?)`;
      await dal.execute(sqlQuery, [
        customer.customerId,
        customer.firstName,
        customer.lastName,
      ], connection);
  
      // 2. Add new telephone to the tel table in the DB.
      tel.customerId = customer.customerId;
      await telLogic.addTel(tel, connection);
  
      // 3. Add new address to the address table in the DB.
      address.customerId = customer.customerId;
      await addressesLogic.addAddress(address, connection);
  
      // Commit transaction if all queries succeed
      await dal.commitTransaction(connection);
  
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

export default { getAllSocialCustomer, addSocialCustomer };
