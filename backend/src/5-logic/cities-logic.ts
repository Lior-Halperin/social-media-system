import dal from "../2-utils/dal";
import CitiesListModel from "../4-models/citiesList-model";
import CityModel from "../4-models/city-model";
import { ValidationError } from "../4-models/errors-model";

async function updateFullCities(cities: CityModel[]): Promise<any> {
  try {
    // step-1: Perform validation for all cities:
    const citiesList = new CitiesListModel(cities);

    if (citiesList.errorsList.length > 0) {
      throw new ValidationError(JSON.stringify(citiesList.errorsList));
    }

    // step-2: Checking duplicate cities against the DB based on cityId.

    // step-3: Create chunks of cities for bulk operations
    const chunkSize = 2; // Determine the appropriate size based on your environment
    let chunksList = [];

    for (let i = 0; i < cities.length; i += chunkSize) {//  i += chunkSize => (i = i + chunkSize)
      const cityChunk = cities.slice(i, i + chunkSize);
      chunksList.push(cityChunk);
    }

    // step-4: Update the database with the cities
    const promises = chunksList.map(async (chunk) => {
      try {
        // step-3.1: Check if the city does not already exist in the DB

        await updateCityChunk(chunk);


        const  updateCitiesIdsList = chunk.flatMap(city=> city.cityId)
        return  {result: "Success", updateCitiesIds :updateCitiesIdsList }
      } catch (err: any) {
            return {result: "Failed", reason: `Custom error: ${err.message}`}
      }
    });

    return await Promise.allSettled(promises);

  } catch (err: any) {
    throw err;
  }
}

async function updateCityChunk(cities: CityModel[]): Promise<void> {
  try {
    // UPDATE cities
    // SET
    //     hebrewName = CASE cityId
    //         WHEN 7 THEN 'lior'
    //         WHEN 10 THEN 'mor'
    //     END
    // WHERE cityId IN (7, 10); 
    
    const updateQuery = `UPDATE cities SET `; // Bulk update query

    // Split cities into those that need to be updated and those that need to be inserted
    const { citiesToUpdate, citiesToInsert } = await splitCities(cities);
    if (citiesToUpdate.length > 0) {
      await dal.execute(updateQuery, citiesToUpdate);
    }
  
    if (citiesToInsert.length > 0) {
      const insertValue = citiesToInsert.flatMap((city) => [
        city.cityId,
        city.hebrewName,
        city.englishName,
        city.hashDetails,
      ]);
      const placeholders = citiesToInsert.map(() => "(?, ?, ?, ?)").join(", ");
      const insertQuery = `INSERT INTO cities (cityId, hebrewName, englishName, hashDetails) VALUES ${placeholders}`;
      await dal.execute(insertQuery, insertValue);
    }


  } catch (err: any) {
    console.log(err)
    throw err;
  }
}

async function splitCities(
  cities: CityModel[]
): Promise<{ citiesToUpdate: CityModel[]; citiesToInsert: CityModel[] }> {
  try {
    const query = "SELECT cityId, hashDetails FROM cities WHERE cityId IN (?)";
    const existingCities = await dal.execute(
      query,
      cities.map((city) => city.cityId)
    ); 

    let citiesToUpdate: CityModel[] = [];
    let citiesToInsert: CityModel[] = [];

    const mappedHashDetailsOfCities = new Map();
    existingCities.forEach((city) => {
      mappedHashDetailsOfCities.set(city.cityId, city.hashDetails);
    });

    cities.forEach((cityInTheRequest) => {
      if (mappedHashDetailsOfCities.has(cityInTheRequest.cityId)) {
        cityInTheRequest.hashDetails !==
          mappedHashDetailsOfCities.get(cityInTheRequest.cityId) &&
          citiesToUpdate.push(cityInTheRequest);
      } else {
        citiesToInsert.push(cityInTheRequest);
      }
    });

    return { citiesToUpdate, citiesToInsert };
  } catch (err: any) {
    throw err;
  }
}

async function addCity(city: CityModel): Promise<CityModel> {
  try {
    const query = `INSERT INTO cities(cityId, hebrewName, englishName, hashDetails) VALUES(?,?,?,?)`;

    const result = await dal.execute(query, [
      city.cityId,
      city.hebrewName,
      city.englishName,
      city.hebrewName,
    ]);

    const addedCity = result[0];

    return addedCity;
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
