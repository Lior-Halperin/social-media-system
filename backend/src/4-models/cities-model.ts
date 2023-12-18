import CityModel from "./city-model";

class CitiesModel extends CityModel{
   private streets: StreetModel[] ;

   public constructor(city: CityModel, streetsList: StreetModel[]){
    super(city)
    this.streets = streetsList
   }

}

export default CitiesModel;
