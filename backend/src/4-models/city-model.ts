
class CityModel {
    private cityId: string;
    private hebrewName: string;
    private englishName: string;

    public constructor(city: CityModel){
        this.cityId = city.cityId;
        this.englishName = city.englishName;
        this.hebrewName = city.hebrewName
    }
}

export default CityModel