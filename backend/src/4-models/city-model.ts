import Joi from "joi";
import { ValidationError } from "./errors-model";
import cyber from "../2-utils/cyber";

interface ICityModel {
  cityId: number;
  hebrewName: string;
  englishName: string;
  hashDetails: string;
}
class CityModel {
  private _cityId: number;
  private _hebrewName: string;
  private _englishName: string;
  private _hashDetails: string;

  public constructor(city: CityModel) {
    try {
      this.validation(city)
      this._cityId = city.cityId;
      this._englishName = city.englishName;
      this._hebrewName = city.hebrewName;
      this._hashDetails = cyber.hash(city.cityId + city.englishName + city.hebrewName)
    } catch (err: any) {
      throw err;
    }
  }

  public get cityId() {
    return this._cityId;
  }
  public set cityId(id: number) {
    this.validation('cityId',id)
    this._cityId = id;
  }

  public get hebrewName() {
    return this._hebrewName;
  }

  public set hebrewName(name: string) {
    this.validation('hebrewName', name)
    this._hebrewName = name;
  }

  public get englishName() {
    return this._englishName;
  }

  public set englishName(name: string) {
    try{
        this.validation('englishName',name)
        this._englishName = name;
    }
    catch(err:any){
        throw err
    }
  }

  public get hashDetails(){
    return this._hashDetails
  }
  
  private validation (property: keyof ICityModel | CityModel, value?: string | number) {
    try{
        const error = this.validatePostUploadCity(property,value)
        if(error){
            throw new ValidationError(error);
        }
    }
    catch(err:any){
        throw err
    }
  }
  private static postUploadCityValidationSchema = Joi.object({
    cityId: Joi.number().required().min(7).max(10000),
    hebrewName: Joi.string().required().min(2).max(30),
    englishName: Joi.string().required().min(2).max(30),
  });

  private validatePostUploadCity(property: keyof ICityModel | CityModel, value?: string | number): string {
    try {
        let singleValidation;
        if (value){
            singleValidation = {property: value}
        }
      const result = CityModel.postUploadCityValidationSchema.validate(singleValidation ? singleValidation : property, {
        abortEarly: false,
      });
      return result.error?.message;
    } catch (err: any) {
      throw err;
    }
  }
}

export default CityModel;
