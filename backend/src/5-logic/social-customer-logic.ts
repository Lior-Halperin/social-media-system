import dal from "../2-utils/dal";
import SocialCustomerModel from "../4-models/social-customer-model";

// Get all socialCustomer
async function getAllSocialCustomer(): Promise<SocialCustomerModel[]> {
  try {
    const query = "SELECT * FROM socialCustomer";
    const existingSocialCustomer = await dal.execute(query);
    return existingSocialCustomer;
  } catch (err: any) {
    throw err;
  }
}

async function addSocialCustomer(customer: SocialCustomerModel): Promise<SocialCustomerModel> {
  try {
    const query =
      "INSERT INTO socialCustomer (customerId,firstName,lastName,tal) VALUES(?,?,?,?)";

    const result = await dal.execute(query, [
      customer.customerId,
      customer.firstName,
      customer.lastName,
      customer.tal,
    ]);

    return result[0]
  } catch (err: any) {
    throw err;
  }
}

export default { getAllSocialCustomer,addSocialCustomer };
