import AddressesModel, { IAddressesModel } from "./addresses-model";
import SocialCustomerModel, {
  ISocialCustomerModel,
} from "./social-customer-model";

interface ISocialCustomerItemModel {
  customer: ISocialCustomerModel;
  address: Omit<IAddressesModel, "customerId">;
  tels: number[];
  projectId: number;
}

class SocialCustomerItemModel {
  private _customer: ISocialCustomerModel;

  private _address: Omit<IAddressesModel, "customerId">;

  private _tels: number[];

  private _projectId: number;

  constructor(socialCustomer: ISocialCustomerItemModel) {
    this._customer = socialCustomer.customer;
    this._address = socialCustomer.address;
    this._tels = socialCustomer.tels;
    this._projectId = socialCustomer.projectId;
  }

  // Todo: add validation

  get customer() {
    return this._customer;
  }

  set customer(customerItem: ISocialCustomerModel) {
    this.customer = customerItem;
  }
  get address() {
    return this._address;
  }

  set address(addressItem: Omit<IAddressesModel, "customerId">) {
    this.address = addressItem;
  }
  get tels() {
    return this._tels;
  }

  set tels(telsItem: number[]) {
    this.tels = telsItem;
  }

  get projectId() {
    return this._projectId;
  }

  set projectId(projectIdItem: number) {
    this.projectId = projectIdItem;
  }
}

export default SocialCustomerItemModel;
