import axios from "axios";
import englishHebrewNameModel from "./english-hebrew-name-model";

class CitiesModel {
  private _country: string;
  private _citiesUrl: string;

  constructor(country: string) {
    this._country = country;
    this._citiesUrl = process.env.GEOGRAPHIC_API_CITIES;
  }

  get country(): string {
    return this._country;
  }

  get citiesUrl(): string {
    return this._citiesUrl;
  }

  async getCitiesList(){
    try {
      const result= await axios.get(this._citiesUrl, {
        params: { country: this._country },
      });
      return result;
    } catch (err) {
        throw new Error(`Failed to fetch cities: ${err}`);
        ;
    }
  }
}

export default CitiesModel;
