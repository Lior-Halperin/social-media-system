import { PoolConnection } from "mysql2";
import dal from "../2-utils/dal";
import AddressesModel from "../4-models/addresses-model";

// Function for add new address.
async function addAddress(address: AddressesModel, dbConnection: PoolConnection): Promise<AddressesModel> {
    try {
      const fullAddressForApi: string = `${address.country} ${address.city} ${address.street} ${address.houseNumber}`;
      // 1. Getting the Address coordinates.
      const addressCoordinates = await dal.api({
        method: "POST",
        url: "geographicApi",
        endpoint: `address-coordinates`,
        data: { address: fullAddressForApi },
      });
      const coordinates: { lat: number; lon: number } = addressCoordinates.data;
      address.latitude = coordinates.lat;
      address.longitude = coordinates.lon;
  
      // 2. Obtaining the calculation of the distance in kilometers between the address and the intentional point.
      const intentionalPoint = {
        lat: "31.77800105",
        lon: "35.235739945119654",
      };
      const distance = await dal.api({
        method: "POST",
        url: "geographicApi",
        endpoint: `coordinates-distance`,
        data: {
          addresses: { location1: intentionalPoint, location2: coordinates },
        },
      });
  
      const distanceInKm: number = distance.data;
      address.distanceKmIntentionalPoint = distanceInKm;
  
      // 3. Add to DB using the passed connection
      const sqlQuery =
        "INSERT INTO addresses (address_id, customer_id, country, city, street, house_number, apartment_number, floor, longitude, latitude, update_date, distance_km_from_intentional_point, comments) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
      await dal.execute(sqlQuery, [
        address.addressId,
        address.customerId,
        address.country,
        address.city,
        address.street,
        address.houseNumber,
        address.apartmentNumber,
        address.floor,
        address.longitude,
        address.latitude,
        address.updateDate,
        address.distanceKmIntentionalPoint,
        address.comments,
      ], dbConnection);
      
      return address;
    } catch (err: any) {
      throw err;
    }
  }

// Todo: Function for update partial address.

// Todo: Function for delete address.

export default { addAddress };
