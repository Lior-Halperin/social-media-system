import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ApiService from "src/Utils/ApiService";
import { IVolunteerProjectModel } from "src/Models/VolunteerProjectModel";
import { setVolunteerProject } from "src/redux/features/volunteerProjects/volunteerProjectsSlice";

function useVolunteerProject() {
  const dispatch = useDispatch();

  const volunteerProject = useSelector(
    (state: RootState) => state.volunteerProject.volunteerProject
  );

  const volunteerProjectApi = new ApiService<IVolunteerProjectModel>(
    "volunteerProjectsEndPoint"
  );

  const { isLoading, isError, error } = useQuery(
    "volunteerProject",
    async () => {
      try {
        const data = await volunteerProjectApi.getAll();
        dispatch(setVolunteerProject(data));
        return data;
      } catch (err: any) {
        console.log(err);
        throw err;
      }
    },
    { initialData: volunteerProject.length > 0 ? volunteerProject : undefined }
  );
  return { volunteerProject, isLoading, isError, error };
}

export default useVolunteerProject;
