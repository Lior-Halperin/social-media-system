import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import IProjectCustomerDetailsModel from "src/Models/ProjectCustomerDetailsModel";
import ApiService from "src/Utils/ApiService";
import { setCustomerAddresses } from "src/redux/features/customerAddresses/customerAddressesSlice";
import { RootState } from "src/redux/store";

function useCustomerAddresses() {
  // Hook into Redux store for dispatching actions
  const dispatch = useDispatch();

  // Select the customerAddresses slice from the Redux store
  const customerAddresses = useSelector(
    (state: RootState) => state.customerAddresses.customersAddresses
  );

  // Initialize the API service for customer addresses
  const apiService = new ApiService<IProjectCustomerDetailsModel[]>(
    "projectCustomerEndPoint"
  );

  // Function to get customer addresses by ID from the API
  const getCustomerAddressesById = async (id: number): Promise<IProjectCustomerDetailsModel[]> => {
    const data = await apiService.getById(id);
    return data;
  };

  // React Query's useQuery hook to fetch customer addresses by ID.
  // It fetches customer addresses from the server and updates the Redux store.
  const useGetCustomerAddressesById = (id: number) => {
    return useQuery({
      queryKey: ["customerAddresses", id],
      queryFn: async () => {
        const data = await getCustomerAddressesById(id);
        dispatch(setCustomerAddresses(data));
        return data;
      },
      // Conditional Data Fetching: The enabled option in useQuery ensures that the query only runs when a valid project_id is provided.
      // By setting a default value of -1 for the project_id, the query is disabled until a valid project is selected.
      enabled: id !== -1, // Ensure the query is only enabled when an ID is valid
    });
  };

  // Return the customer addresses data and the query function from the hook
  return {
    customerAddresses,
    useGetCustomerAddressesById,
  };
}

export default useCustomerAddresses;
