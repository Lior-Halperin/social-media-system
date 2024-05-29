import tools from '../2-utils/tools';
interface ISocialCustomerModel {
  firstName: string;
  lastName: string;
  tal: number;
}

class SocialCustomerModel implements ISocialCustomerModel {
  private _customerId: number;
  private _firstName: string;
  private _lastName: string;
  private _tal: number;

  public constructor(donate: ISocialCustomerModel) {
    
    this._customerId = tools.generateId(99999,10000)
    for (const property in donate) {
      this[property] = donate[property]
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
  public get tal() {
    return this._tal;
  }
  public set tal(tal: number) {
 this._tal = tal;
  }
}

export default SocialCustomerModel;
