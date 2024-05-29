import tools from "../2-utils/tools";

interface IAddressesModel {
  addressesId: number;
  customerId: number;
  cityId: number;
  streetId: number;
  houseNumber: string;
  apartmentNumber: number;
  floor: number;
}

class AddressesModel implements IAddressesModel{
  private _addressesId: number;
  private _customerId: number;
  private _cityId: number;
  private _streetId: number;
  private _houseNumber: string;
  private _apartmentNumber: number;
  private _floor: number;

  public constructor(address: Omit<IAddressesModel, "addressesId">) {
    this._addressesId = tools.generateId(99999999, 10000000);
    this._customerId = address.customerId;
    this._cityId = address.cityId;
    this._streetId = address.streetId;
    this._houseNumber = address.houseNumber;
    this._floor = address.floor;
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
}

export default AddressesModel;
