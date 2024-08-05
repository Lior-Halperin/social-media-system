import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ApiService from "src/Utils/ApiService";
import { IVolunteerProjectModel } from "src/Models/VolunteerProjectModel";
import { setVolunteerProject } from "src/redux/features/volunteerProjects/volunteerProjectsSlice";

function useVolunteerProject() {
  // Hook into Redux store for dispatching actions
  const dispatch = useDispatch();

  // Select the volunteerProject slice from the Redux store
  const volunteerProject = useSelector(
    (state: RootState) => state.volunteerProject.volunteerProject
  );

  // Initialize the API service for volunteer projects
  const volunteerProjectApi = new ApiService<IVolunteerProjectModel>(
    "volunteerProjectsEndPoint"
  );

  // React Query's useQuery hook to fetch volunteer projects.
  // If volunteer projects are already present in the Redux store, it uses them as initial data.
  // Otherwise, it fetches volunteer projects from the server and updates the Redux store.
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["volunteerProject"],
    queryFn: async () => {
      try {
        const data = await volunteerProjectApi.getAll();
        // Dispatch action to update Redux store with fetched volunteer projects
        dispatch(setVolunteerProject(data));
        return data;
      } catch (err: any) {
        console.log(err);
        throw err;
      }
    },
    initialData: volunteerProject.length > 0 ? volunteerProject : undefined,
  });

  // Return the volunteer project data, loading state, error state from the hook
  return {
    volunteerProject: data || volunteerProject,
    isLoading,
    isError,
    error,
  };
}

export default useVolunteerProject;
