import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISocialCustomerModel } from "src/Models/SocialCustomerModel";

interface SocialCustomerState {
  socialCustomer: ISocialCustomerModel[];
  selectedCustomer: Record<string, ISocialCustomerModel>;
}

const initialState: SocialCustomerState = {
  socialCustomer: [],
  selectedCustomer: {},
};

const socialCustomerSlice = createSlice({
  name: "SocialCustomer",
  initialState,
  reducers: {
    setSocialCustomer: (
      state,
      action: PayloadAction<ISocialCustomerModel[]>
    ) => {
      state.socialCustomer = action.payload;
    },
    setSelectedCustomer: (
      state,
      action: PayloadAction<Record<string, ISocialCustomerModel>>
    ) => {
      state.selectedCustomer = action.payload;
    },
    addSocialCustomer: (state, action: PayloadAction<ISocialCustomerModel>) => {
      state.socialCustomer.push(action.payload);
    },
  }, 
});

export const { setSocialCustomer, addSocialCustomer, setSelectedCustomer } =
  socialCustomerSlice.actions;

export default socialCustomerSlice.reducer;
