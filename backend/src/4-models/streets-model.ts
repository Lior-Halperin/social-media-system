import axios from "axios";

class StreetsModel {
  private _country: string;
  private _city: string;
  private _streetsUrl: string;

  constructor(country: string, city: string) {
    this._city = city;
    this._country = country;
  }

  get country(): string {
    return this._country;
  }

  get city(): string {
    return this._city;
  }
  get streetUrl(): string {
    return this._streetsUrl;
  }

  async getStreetsList(): Promise<string[]>{
try{
    const result = await axios.get<string[]>(this._streetsUrl, {
        params: {country: this._country, city: this._city }
    })
    return result.data
}
catch(err: any){
    throw new Error(`Failed to fetch streets: ${err}`);

}
  }
}

export default StreetsModel;
