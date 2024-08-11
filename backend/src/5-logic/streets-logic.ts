import { ValidationError } from "../4-models/errors-model";

async function getStreetsByCity(city: string, country:string ):Promise<any>{ // Todo: change the any type
    try{
        if (!country) {
            throw new ValidationError("Missing 'country' parameter");
          }
          if (!city) {
            throw new ValidationError("Missing 'city' parameter.");
          }

    }
    catch(err){
        throw err
    }
}