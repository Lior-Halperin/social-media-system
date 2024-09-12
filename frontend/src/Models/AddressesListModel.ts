class ExcelAddressesModel {
  public projectId: number;
  public firstName: string;
  public lastName: string;
  public country: string;
  public city: string;
  public street: string;
  public houseNumber: string;
  public apartmentNumber: string;
  public floor: string;
  public comments?: string;

  constructor() {
    this.projectId = 0;
    this.firstName = "";
    this.lastName = "";
    this.country = "";
    this.city = "";
    this.street = "";
    this.houseNumber = "";
    this.apartmentNumber = "";
    this.floor = "";
  }
}

export default ExcelAddressesModel;
