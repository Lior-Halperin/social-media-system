interface IProjectCustomerDetailsModel {
  projectId: number;
  customerId: number;
  firstName: string;
  lastName: string;
  addressId: number;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  apartmentNumber: number;
  floor: number;
  longitude: number;
  latitude: number;
  distanceKmFromIntentionalPoint: number;
  addressUpdateDate: Date;
  comments: string;
}
export default IProjectCustomerDetailsModel;
