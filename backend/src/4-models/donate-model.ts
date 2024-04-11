interface IDonateModel {
  id: number;
  name: string;
//   serialNumber: number;
//   tal: string;
//   city: string;
//   street: string;
}

class DonateModel {
  private _id: number;
  private _name: string;
//   private _serialNumber: number;
//   private _tal: string;
//   private _city: string;
//   private _street: string;

  public constructor(donate: IDonateModel){
    for (const property in donate){
        this[property] = donate[property]
    }
  }
}

export default DonateModel;


