import CitiesModel from "../4-models/cities-model";
import englishHebrewNameModel from "../4-models/english-hebrew-name-model";

async function getCitiesByCountry(
  country: string
): Promise<englishHebrewNameModel[]> {
  try {
    const citiesModel = new CitiesModel(country);
    const result = await citiesModel.getCitiesList();
    return result.data;
  } catch (err: any) {
    throw new Error(`Failed to get cities by country: ${err}`);
  }
}

export default { getCitiesByCountry };
