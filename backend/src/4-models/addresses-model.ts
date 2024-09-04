import tools from "../2-utils/tools";

interface IAddressesModel {
  customerId: number;
  country?: string;
  city: string;
  street: string;
  houseNumber: string;
  apartmentNumber: number;
  floor: number;
  comments?: string;
}

class AddressesModel implements IAddressesModel {
  private _addressId: number;
  private _customerId: number;
  private _country: string;
  private _city: string;
  private _street: string;
  private _houseNumber: string;
  private _apartmentNumber: number;
  private _floor: number;
  private _longitude: number;
  private _latitude: number;
  private _updateDate: string;
  private _distanceKmIntentionalPoint: number;
  private _comments?: string;

  public constructor(address: IAddressesModel) {
    this._addressId = tools.generateId(99999999, 10000000);
    this._customerId = address.customerId;
    this._country = address.country ? address.country : "israel";
    this._city = address.city;
    this._street = address.street;
    this._houseNumber = address.houseNumber;
    this._apartmentNumber = address.apartmentNumber;
    this._floor = address.floor;
    this._comments = address.comments;
    this._updateDate = new Date().toISOString().split("T")[0];
  }

  public get addressId() {
    return this._addressId;
  }

  public get customerId() {
    return this._customerId;
  }

  public set customerId(id: number) {
    if (id >= 10000 && id <= 99999) {
      this._customerId = id;
    }
  }

  public get country() {
    return this._country;
  }

  public get city() {
    return this._city;
  }

  public get street() {
    return this._street;
  }

  public get houseNumber() {
    return this._houseNumber;
  }

  public get apartmentNumber() {
    return this._apartmentNumber;
  }

  public get floor() {
    return this._floor;
  }

  public get longitude() {
    return this._longitude;
  }
  public set longitude(lon: number) {
    this._longitude = lon;
  }

  public get latitude() {
    return this._latitude;
  }

  public set latitude(lat: number) {
    this._latitude = lat;
  }

  public get updateDate() {
    return this._updateDate;
  }

  public get distanceKmIntentionalPoint() {
    return this._distanceKmIntentionalPoint;
  }

  public set distanceKmIntentionalPoint(distance: number) {
    this._distanceKmIntentionalPoint = distance;
  }

  public get comments() {
    return this._comments;
  }
}

export default AddressesModel;
