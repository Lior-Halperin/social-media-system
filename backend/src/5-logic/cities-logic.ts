import CitiesModel, { languageType } from "../4-models/cities-model";
import { ValidationError } from "../4-models/errors-model";

async function getCitiesByCountry(
  country: string,
  language: languageType
): Promise<string[]> { // Todo: change the promise type 
  try {
    if (!country) {
      throw new ValidationError("Missing 'country' parameter");
    }
    if (!language) {
      throw new ValidationError("Missing 'language' parameter.");
    }
    const citiesModel = new CitiesModel(country,language);
    const result = await citiesModel.getCitiesList();
    return result.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(`Failed to get cities by country: ${err}`);
  }
}

export default { getCitiesByCountry };
