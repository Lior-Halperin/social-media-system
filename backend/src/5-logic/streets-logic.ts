import { ValidationError } from "../4-models/errors-model";
import StreetsModel from "../4-models/streets-model";

async function getStreetsByCity(street: StreetsModel): Promise<any> {
  // Todo: change the any type
  try {
    if (!street.country) {
      throw new ValidationError("Missing 'country' parameter");
    }
    if (!street.city) {
      throw new ValidationError("Missing 'city' parameter.");
    }

    const result = await street.getStreetsList();

    return result;
  } catch (err: any) {
    throw err;
  }
}

export default { getStreetsByCity };
