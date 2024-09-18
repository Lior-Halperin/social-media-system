class ExcelAddressesModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public country: string;
  public street: string;
  public houseNumber: string;
  public apartmentNumber: string;
  public floor: string;
  public comments?: string;

  constructor() {
    this.id = Math.floor(Math.random() * 1000000);
    this.firstName = "";
    this.lastName = "";
    this.country = "";
    this.street = "";
    this.houseNumber = "";
    this.apartmentNumber = "";
    this.floor = "";
  }
}

export default ExcelAddressesModel;
