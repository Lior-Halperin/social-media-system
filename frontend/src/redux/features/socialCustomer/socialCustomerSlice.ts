import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISocialCustomerModel } from "src/Models/SocialCustomerModel";

interface SocialCustomerState {
  SocialCustomer: ISocialCustomerModel[];
  SelectedCustomer: Record<string, ISocialCustomerModel>;
}

const initialState: SocialCustomerState = {
  SocialCustomer: [],
  SelectedCustomer: {},
};

const socialCustomerSlice = createSlice({
  name: "SocialCustomer",
  initialState,
  reducers: {
    setSocialCustomer: (
      state,
      action: PayloadAction<ISocialCustomerModel[]>
    ) => {
      state.SocialCustomer = action.payload;
    },
    setSelectedCustomer: (
      state,
      action: PayloadAction<Record<string, ISocialCustomerModel>>
    ) => {
      state.SelectedCustomer = action.payload;
    },
    addSocialCustomer: (state, action: PayloadAction<ISocialCustomerModel>) => {
      state.SocialCustomer.push(action.payload);
    },
  }, 
});

export const { setSocialCustomer, addSocialCustomer, setSelectedCustomer } =
  socialCustomerSlice.actions;

export default socialCustomerSlice.reducer;
