import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CitiesState {
  cities: string[];
}
const initialState: CitiesState = {
  cities: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload;
    },
  },
});

export const { setCities } = citiesSlice.actions;

export default citiesSlice.reducer;
