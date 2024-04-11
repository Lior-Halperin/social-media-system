import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISocialCustomerModel } from "src/Models/SocialCustomerModel";

interface SocialCustomerState {
SocialCustomer: ISocialCustomerModel[]
}

const initialState: SocialCustomerState = {
    SocialCustomer:[]

};

const socialCustomerSlice = createSlice({
  name: "SocialCustomer",
  initialState,
  reducers: {
    setSocialCustomer: (state, action: PayloadAction<ISocialCustomerModel[]>) => { 
      state.SocialCustomer = action.payload
    },
    addSocialCustomer: (state, action: PayloadAction<ISocialCustomerModel>)=>{
        state.SocialCustomer.push(action.payload)
    }
  },
});

export const { setSocialCustomer, addSocialCustomer } = socialCustomerSlice.actions;

export default socialCustomerSlice.reducer;
