import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVolunteerProjectModel } from "src/Models/VolunteerProjectModel";

interface VolunteerProjectState {
  volunteerProject: IVolunteerProjectModel[];
}

const initialState: VolunteerProjectState = {
  volunteerProject: [],
};

const volunteerProjectSlice = createSlice({
  name: "VolunteerProject",
  initialState,
  reducers: {
    setVolunteerProject: (
      state,
      action: PayloadAction<IVolunteerProjectModel[]>
    ) => {
      state.volunteerProject = action.payload;
    },
  },
});

export const { setVolunteerProject } = volunteerProjectSlice.actions;

export default volunteerProjectSlice.reducer;
