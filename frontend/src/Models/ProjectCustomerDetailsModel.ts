
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

export default IProjectCustomerDetailsModel;