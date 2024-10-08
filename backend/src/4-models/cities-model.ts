import dal from "../2-utils/dal";

export type languageType = "he" | "en";
class CitiesModel {
  private _country: string;
  private _language: languageType;
  private _citiesUrl: string;

  constructor(country: string, language: languageType) {
    this._country = country;
    this._citiesUrl = `${process.env.GEOGRAPHIC_API}/cities`;
    this._language = language;
  }

  get country(): string {
    return this._country;
  }

  get citiesUrl(): string {
    return this._citiesUrl;
  }

  get language(): languageType {
    return this._language;
  }

  async getCitiesList() { // Todo: Move to business logic
    try {
      const result = await dal.api({
        method: "GET",
        url: "geographicApi",
        endpoint: `cities`,
        config: {params: { country: this._country , language: this._language}}
      });
      return result;
    } catch (err) {
      throw new Error(`Failed to fetch cities: ${err}`);
    }
  }
}

export default CitiesModel;
