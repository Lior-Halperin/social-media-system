import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ICitiesModel from "src/Models/CitiesModel";

interface CitiesState {
  cities: ICitiesModel[];
}
const initialState: CitiesState = {
  cities: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<ICitiesModel[]>) => {
      state.cities = action.payload;
    },
  },
});

export const { setCities } = citiesSlice.actions;

export default citiesSlice.reducer;
