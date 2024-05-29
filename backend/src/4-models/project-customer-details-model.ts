
interface IProjectCustomerDetailsModel  {
    projectId: number;
    projectName: string;
    projectDate: Date;
    customerId: number;
    customerFirstName: string;
    customerLastName: string;
    customerTal?: number;
    streetId: number;
    streetHebrewName: string;
    addressId: number;
    houseNumber: string;
    apartmentNumber?: number;
    floor: number;
}

class ProjectCustomerDetailsModel implements IProjectCustomerDetailsModel{
    private _projectId: number;
    private _projectName: string;
    private _projectDate: Date;
    private _customerId: number;
    private _customerFirstName: string;
    private _customerLastName: string;
    private _customerTal?: number;
    private _streetId: number;
    private _streetHebrewName: string;
    private _addressId: number;
    private _houseNumber: string;
    private _apartmentNumber?: number;
    private _floor: number;

    constructor(details: IProjectCustomerDetailsModel) {
        this._projectId = details.projectId;
        this._projectName = details.projectName;
        this._projectDate = details.projectDate;
        this._customerId = details.customerId;
        this._customerFirstName = details.customerFirstName;
        this._customerLastName = details.customerLastName;
        this._customerTal = details.customerTal;
        this._streetId = details.streetId;
        this._streetHebrewName = details.streetHebrewName;
        this._addressId = details.addressId;
        this._houseNumber = details.houseNumber;
        this._apartmentNumber = details.apartmentNumber;
        this._floor = details.floor;
      }
      public get projectId() {
        return this._projectId;
      }
    
      public get projectName() {
        return this._projectName;
      }
    
      public get projectDate() {
        return this._projectDate;
      }
    
      public get customerId() {
        return this._customerId;
      }
    
      public get customerFirstName() {
        return this._customerFirstName;
      }
    
      public get customerLastName() {
        return this._customerLastName;
      }
    
      public get customerTal() {
        return this._customerTal;
      }
    
      public get streetId() {
        return this._streetId;
      }
    
      public get streetHebrewName() {
        return this._streetHebrewName;
      }
    
      public get addressId() {
        return this._addressId;
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

export default ProjectCustomerDetailsModel;