import dal from "../2-utils/dal"
import SocialCustomerModel from "../4-models/social-customer-model"

// Get all socialCustomer 
async function getAllSocialCustomer(): Promise<SocialCustomerModel[]>{

    const query = "SELECT * FROM socialCustomer"
    const existingSocialCustomer = await dal.execute(query)
    return existingSocialCustomer
}

export default {getAllSocialCustomer} 