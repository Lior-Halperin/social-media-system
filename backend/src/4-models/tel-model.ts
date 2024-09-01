import tools from "../2-utils/tools";

interface ITel {
  customerId: number;
  telNumber: number;
}

class TelModel implements ITel {
  private _telId: number;
  private _customerId: number;
  private _telNumber: number;
  private _updateDate: string;

  public constructor(tel: ITel) {
    this._telId = tools.generateId(99999, 10000);
    this._customerId = tel.customerId;
    this._telNumber = tel.telNumber;
    this._updateDate =  new Date().toISOString().split('T')[0];;
  }

  public get telId() {
    return this._telId;
  }

  public get customerId() {
    return this._customerId;
  }

  public set customerId(id: number) {
    if (id >= 10000 && id <= 99999) {
      this._customerId = id;
    }
  }

  public get telNumber() {
    return this._telNumber;
  }

  public get updateDate() {
    return this._updateDate;
  }
}

export default TelModel;
