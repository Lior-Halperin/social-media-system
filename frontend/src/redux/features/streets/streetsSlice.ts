import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IStreetsModel from "src/Models/StreetsModel";

interface StreetsState {
  streets: IStreetsModel;
}

const initialState: StreetsState = {
  streets:{city:'',country:'',streets:[]},
};

const streetsSlice = createSlice({
  name: "streets",
  initialState,
  reducers: {
    setStreets: (state, action: PayloadAction<IStreetsModel>) => {
      state.streets = action.payload;
    },
  },
});

export const { setStreets } = streetsSlice.actions;

export default streetsSlice.reducer;
