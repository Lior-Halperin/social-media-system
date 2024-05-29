interface IStreetModel {
  streetId: number;
  cityId: number;
  hebrewName: string;
  englishName: string;
}
class StreetModel implements IStreetModel {
  private _streetId: number;
  private _cityId: number;
  private _hebrewName: string;
  private _englishName: string;

  public constructor(street: IStreetModel) {
    this._streetId = street.streetId;
    this._cityId = street.cityId;
    this._englishName = street.englishName;
    this._hebrewName = street.hebrewName;
  }

  public get streetId() {
    return this._streetId;
  }
  public get cityId() {
    return this._cityId;
  }
  public get hebrewName() {
    return this._hebrewName;
  }
  public get englishName() {
    return this._englishName;
  }
}

export default StreetModel;