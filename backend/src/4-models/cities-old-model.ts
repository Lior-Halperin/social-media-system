import CityModel from "./city-model";
import StreetModel from "./street-old-model";

// Todo - if not it use deleted. (this is an older version. in this version, an excel file is loaded and tables are updated in the DB.)
class CitiesModel extends CityModel{
   private streets: StreetModel[] ;

   public constructor(city: CityModel, streetsList: StreetModel[]){
    super(city)
    this.streets = streetsList
   }

}

export default CitiesModel;
