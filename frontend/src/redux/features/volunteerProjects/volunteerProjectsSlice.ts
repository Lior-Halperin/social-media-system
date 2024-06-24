import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVolunteerProjectModel } from "src/Models/VolunteerProjectModel";
interface VolunteerProjectState {
  volunteerProject: IVolunteerProjectModel[];
  selectedProject: IVolunteerProjectModel;
}

const initialState: VolunteerProjectState = {
  volunteerProject: [],
  selectedProject: {} as IVolunteerProjectModel,
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
    setSelectedVolunteerProject: (
      state,
      action: PayloadAction<IVolunteerProjectModel>
    ) => {
      state.selectedProject = action.payload;
    },
  },
});

export const { setVolunteerProject, setSelectedVolunteerProject } =
  volunteerProjectSlice.actions;

export default volunteerProjectSlice.reducer;
