import dal from "../2-utils/dal"
import DonateModel from "../4-models/donate-model"

// Get all donate 
async function getAllDonate(): Promise<DonateModel[]>{

    const query = "SELECT * FROM donate"
    const existingDonate = await dal.execute(query)
    return existingDonate
}

export default {getAllDonate} 