import Joi from "joi";
import CityModel from "./city-model";
import cyber from "../2-utils/cyber";

interface ICitiesListModel {
  citiesList: CityModel[];
  errorsList: { cityId: number; massage: string }[];
}
class CitiesListModel {
  private _citiesList: CityModel[];
  private _errorsList: { cityId: number; massage: string }[];

  public constructor(cities: CityModel[]) {
    const errors = [];
    cities.forEach((city) => {
        city.hashDetails = cyber.hash(city.cityId + city.englishName + city.hebrewName)
      const error: string = this.validatePostUploadCity(city);
      errors.length > 0 && errors.push({ cityId: city.cityId, massage: error });
    });

    this._errorsList = errors;

    this._citiesList = this.citiesList;
  }

  public get citiesList() {
    return this._citiesList;
  }

  public set citiesList(cities: CityModel[]) {
    this._citiesList = cities;
  }

  public get errorsList() {
    return this._errorsList;
  }
  private static postUploadCityValidationSchema = Joi.object({
    cityId: Joi.number().required().min(1).max(10000),
    hebrewName: Joi.string().required().min(2).max(30),
    englishName: Joi.string().required().min(2).max(30),
  });

  private validatePostUploadCity(property: keyof ICitiesListModel | CityModel): string {
    try {
      const result = CitiesListModel.postUploadCityValidationSchema.validate(
        property,
        {
          abortEarly: false,
        }
      );
      return result.error?.message;
    } catch (err: any) {
      throw err;
    }
  }
}

export default CitiesListModel;
