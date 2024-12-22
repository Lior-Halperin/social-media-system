import AddressesModel, { IAddressesModel } from "./addresses-model";
import SocialCustomerModel, {
  ISocialCustomerModel,
} from "./social-customer-model";

interface ISocialCustomerItemModel {
  customer: ISocialCustomerModel;
  address: Omit<IAddressesModel, "customerId">;
  tels: number[];
}

class SocialCustomerItemModel {
  private _customer: ISocialCustomerModel;

  private _address: Omit<IAddressesModel, "customerId">;

  private _tels: number[];

  constructor(socialCustomer: ISocialCustomerItemModel) {
    this._customer = socialCustomer.customer;
    this._address = socialCustomer.address;
    this._tels = socialCustomer.tels;
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
}

export default SocialCustomerItemModel;
