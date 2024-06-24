import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProjectCustomerDetailsModel from "src/Models/ProjectCustomerDetailsModel";

interface CustomersAddressesState {
  customersAddresses: IProjectCustomerDetailsModel[];
  selectedCustomerAddresses: Record<string, IProjectCustomerDetailsModel>;
}

const initialState: CustomersAddressesState = {
  customersAddresses: [],
  selectedCustomerAddresses: {},
};

const customersAddressesSlice = createSlice({
  name: "CustomerAddresses",
  initialState,
  reducers: {
    setCustomerAddresses: (
      state,
      action: PayloadAction<IProjectCustomerDetailsModel[]>
    ) => {
      state.customersAddresses = action.payload;
    },
    setSelectedCustomerAddresses: (
      state,
      action: PayloadAction<Record<string, IProjectCustomerDetailsModel>>
    ) => {
      state.selectedCustomerAddresses = action.payload;
    },
  },
});
export const { setCustomerAddresses, setSelectedCustomerAddresses } =
  customersAddressesSlice.actions;

export default customersAddressesSlice.reducer;
