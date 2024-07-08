import tools from "../2-utils/tools";

interface IAddressesModel {
  addressesId: number;
  customerId: number;
  cityId: number;
  streetId: number;
  houseNumber: string;
  apartmentNumber: number;
  floor: number;
  longitude: number;
  latitude: number;
}

class AddressesModel implements IAddressesModel {
  private _addressesId: number;
  private _customerId: number;
  private _cityId: number;
  private _streetId: number;
  private _houseNumber: string;
  private _apartmentNumber: number;
  private _floor: number;
  private _longitude: number;
  private _latitude: number;

  public constructor(address: Omit<IAddressesModel, "addressesId">) {
    this._addressesId = tools.generateId(99999999, 10000000);
    this._customerId = address.customerId;
    this._cityId = address.cityId;
    this._streetId = address.streetId;
    this._houseNumber = address.houseNumber;
    this._floor = address.floor;
    this._longitude = address.longitude;
    this._latitude = address.latitude;
  }

  public get addressesId() {
    return this._addressesId;
  }

  public get customerId() {
    return this._customerId;
  }

  public get cityId() {
    return this._cityId;
  }

  public get streetId() {
    return this._streetId;
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

  public get latitude() {
    return this._latitude;
  }
}

export default AddressesModel;
