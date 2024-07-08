import dal from "../2-utils/dal";
import SocialCustomerModel from "../4-models/social-customer-model";
import SocketEvents from "../4-models/socketEvents";
import socketLogic from "./socket-logic";

// Get all socialCustomer
async function getAllSocialCustomer(): Promise<SocialCustomerModel[]> {
  try {
    const query = "SELECT customer_id AS customerId, first_name AS firstName, last_name AS lastName, tal  FROM social_customers";
    const existingSocialCustomer = await dal.execute(query);
    return existingSocialCustomer;
  } catch (err: any) {
    throw err;
  }
}

async function addSocialCustomer(customer: SocialCustomerModel): Promise<SocialCustomerModel> {
  try {
    const query =
      "INSERT INTO social_customers (customer_id, first_name, last_name, tal) VALUES(?,?,?,?)";

    await dal.execute(query, [
      customer.customerId,
      customer.firstName,
      customer.lastName,
      customer.tal,
    ]);

    // Report via socket.io a new social customer has been added:
    socketLogic.reportAddNewData(customer,SocketEvents.AddedSocialCustomer)
    
    return customer;
  } catch (err: any) {
    throw err;
  }
}

export default { getAllSocialCustomer, addSocialCustomer };
