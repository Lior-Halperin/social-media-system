import axios from "axios";

export type languageType = 'he' | 'en'
class CitiesModel {
  private _country: string;
  private _language: languageType
  private _citiesUrl: string;

  constructor(country: string, language: languageType) {
    this._country = country;
    this._citiesUrl = process.env.GEOGRAPHIC_API_CITIES;
    this._language = language
  }

  get country(): string {
    return this._country;
  }

  get citiesUrl(): string {
    return this._citiesUrl;
  }

  get language(): languageType{
    return this._language
  }

  async getCitiesList(){
    try {
      const result= await axios.get(this._citiesUrl, {
        params: { country: this._country , language: this._language},
      });
      return result;
    } catch (err) {
        throw new Error(`Failed to fetch cities: ${err}`);
        ;
    }
  }
}

export default CitiesModel;
