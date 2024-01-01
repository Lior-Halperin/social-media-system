import Joi from "joi";
import CityModel from "./city-model"

class CitiesListModel {
    private _citiesList: CityModel[]
    private _errorsList: {cityId: number, massage: string}[]
   
    public constructor (cities: CityModel[]){
        const errors =  []
        cities.forEach( city => {
                  const error: string = this.validatePostUploadCity(city) ;
                  errors.length > 0 && errors.push({cityId: city.cityId, massage: error})
        })

        this._errorsList = errors;

        this._citiesList = this.citiesList
    }

   public get citiesList() {
    return this._citiesList
   }

   public set citiesList(cities: CityModel[]){
    this._citiesList = cities
   }

   public get errorsList() {
    return this._errorsList
   }
   private static postUploadCityValidationSchema = Joi.object({
    cityId: Joi.number().required().min(1).max(10000),
    hebrewName: Joi.string().required().min(2).max(30),
    englishName: Joi.string().required().min(2).max(30)
});

private validatePostUploadCity(citiesList: CityModel): string {
    const result = CitiesListModel.postUploadCityValidationSchema.validate(citiesList, {
        abortEarly: false,
      });
      return result.error?.message;
}
   
}

export default CitiesListModel;