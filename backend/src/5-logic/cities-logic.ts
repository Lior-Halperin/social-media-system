import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CitiesListModel from "../4-models/citiesList-model";
import CityModel from "../4-models/city-model";
import { ValidationError } from "../4-models/errors-model";
import fs from "fs/promises";

async function addCity(city: CityModel): Promise<CityModel> {
  try {
    const query = `INSERT INTO cities(cityId, hebrewName, englishName) VALUES(?,?,?)`;

    const result = await dal.execute(query, [
      city.cityId,
      city.hebrewName,
      city.englishName,
    ]);

    const addedCity = result[0];

    return addedCity;
  } catch (err: any) {
    throw err;
  }
}

async function updateFullCities(cities: CityModel[]): Promise<any> {
  try {
    // step-1: Todo - deleting upload fille:
    await fs.rm("./uploads", { recursive: true, force: true });

    // step-2: Perform validation for all cities:
    const citiesList = new CitiesListModel(cities);

    if (citiesList.errorsList.length > 0) {
      throw new ValidationError(JSON.stringify(citiesList.errorsList));
    }

    // step-3: Update the database with the cities
    const promises = cities.map(async (city) => {
      try {
        // step-3.1: Check if the city does not already exist in the DB
        const getCity = await getOneCityById(city.cityId);
        const cityFromDB: CityModel = getCity[0];

        const hashCityFromRequest = cyber.hash(
          city.cityId + city.englishName + city.hebrewName
        );
        const hashCityFromDB =
          cityFromDB &&
          cyber.hash(
            cityFromDB.cityId + cityFromDB.englishName + cityFromDB.hebrewName
          );

        // step-3.2: There has been a change in the details of the city
        const isCityDetailsChanged: boolean =
          hashCityFromRequest !== hashCityFromDB;

        if (cityFromDB && isCityDetailsChanged) {
          await updatePartialCity(city);
        }

        if (!cityFromDB) {
          addCity(city);
        }

        return { cityId: city.cityId, city: city, result: "Success" };
      } catch (err: any) {
        return {
          cityId: city.cityId,
          result: "Failed",
          reason: `Custom error: ${err.message}`,
        };
      }
    });

    return await Promise.allSettled(promises);
  } catch (err: any) {
    throw err;
  }
}

async function getOneCityById(cityId: number): Promise<CityModel> {
  try {
    const query = `SELECT * FROM cities  WHERE cityId = ${cityId}`;

    const city = await dal.execute(query);

    return city;
  } catch (err: any) {
    throw err;
  }
}

async function updatePartialCity(city: CityModel): Promise<void> {
  try {
    const query = `UPDATE cities SET hebrewName = "${city.hebrewName}", englishName = "${city.englishName}" WHERE cityId = ${city.cityId}`;
    await dal.execute(query);
  } catch (err: any) {
    throw err;
  }
}

export default {
  updateFullCities,
  getOneCityById,
  addCity,
  updatePartialCity,
};
