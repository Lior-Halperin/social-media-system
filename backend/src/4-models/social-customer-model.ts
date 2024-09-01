import tools from "../2-utils/tools";
interface ISocialCustomerModel {
  customerId: number;
  firstName: string;
  lastName: string;
}

class SocialCustomerModel implements ISocialCustomerModel {
  private _customerId: number;
  private _firstName: string;
  private _lastName: string;

  public constructor(customer: ISocialCustomerModel) {
    this._customerId = tools.generateId(99999, 10000);
    for (const property in customer) {
      this[property] = customer[property];
    }
  }

  // Todo: add validation
  public get customerId() {
    return this._customerId;
  }

  public get firstName() {
    return this._firstName;
  }
  public set firstName(firstName: string) {
    this._firstName = firstName;
  }
  public get lastName() {
    return this._lastName;
  }
  public set lastName(lastName: string) {
    this._lastName = lastName;
  }
}

export default SocialCustomerModel;
