interface IProjectCustomerDetailsModel {
  customerId: number;
  firstName: string;
  lastName: string;
  addressId: number;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  apartmentNumber: number;
  floor: number;
  longitude: number;
  latitude: number;
  distanceKmFromIntentionalPoint: number;
  addressUpdateDate: Date;
  comments: string;
}

class ProjectCustomerDetailsModel implements IProjectCustomerDetailsModel {
  private _projectId: number;
  private _customerId: number;
  private _firstName: string;
  private _lastName: string;
  private _addressId: number;
  private _country: string;
  private _city: string;
  private _street: string;
  private _houseNumber: number;
  private _apartmentNumber: number;
  private _floor: number;
  private _longitude: number;
  private _latitude: number;
  private _distanceKmFromIntentionalPoint: number;
  private _addressUpdateDate: Date;
  private _comments: string;
  // Todo: Add tel 

  constructor(details: IProjectCustomerDetailsModel) {
    this._customerId = details.customerId;
    this._firstName = details.firstName;
    this._lastName = details.lastName;
    this._addressId = details.addressId;
    this._country = details.country;
    this._city = details.city;
    this._street = details.street;
    this._houseNumber = details.houseNumber;
    this._apartmentNumber = details.apartmentNumber;
    this._floor = details.floor;
    this._longitude = details.longitude;
    this._latitude = details.latitude;
    this._distanceKmFromIntentionalPoint =
      details.distanceKmFromIntentionalPoint;
    this._addressUpdateDate = details.addressUpdateDate;
    this._comments = details.comments;
  }

  public get projectId() {
    return this._projectId;
  }

  public set projectId(id: number) {
    if (id >= 10000 && id <= 99999) {
      this._projectId = id;
    }
  }

  public get customerId() {
    return this._customerId;
  }
  public get firstName() {
    return this._firstName;
  }
  public get lastName() {
    return this._lastName;
  }
  public get addressId() {
    return this._addressId;
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
  public get latitude() {
    return this._latitude;
  }
  public get distanceKmFromIntentionalPoint() {
    return this._distanceKmFromIntentionalPoint;
  }
  public get addressUpdateDate() {
    return this._addressUpdateDate;
  }
  public get comments() {
    return this._comments;
  }
}

export default ProjectCustomerDetailsModel;
