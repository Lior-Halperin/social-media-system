import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import IProjectCustomerDetailsModel from "src/Models/ProjectCustomerDetailsModel";
import ApiService from "src/Utils/ApiService";
import { setCustomerAddresses } from "src/redux/features/customerAddresses/customerAddressesSlice";
import { RootState } from "src/redux/store";

function useCustomerAddresses() {
  const dispatch = useDispatch();

  const customerAddresses = useSelector(
    (state: RootState) => state.customerAddresses.customersAddresses
  );

  const customerAddressesApi = new ApiService<IProjectCustomerDetailsModel[]>(
    "projectCustomerEndPoint"
  );

  const getCustomerAddressesById = async (id: number) => {
    const data = await customerAddressesApi.getById(id);
    return data;
  };

  const useGetCustomerAddressesById = (id: number) => {
    return useQuery(
      ["customerAddresses", id],
      async () => {
        const data = await getCustomerAddressesById(id);
        dispatch(setCustomerAddresses(data));
      },
      {
        /* Conditional Data Fetching: The enabled option in useQuery ensures that the query only runs when a valid project_id is provided.
         By setting a default value of -1 for the project_id, the query is disabled until a valid project is selected. */
         enabled: id !== -1, // Ensure the query is only enabled when an ID is valid
      }
    );
  };
  return {
    customerAddresses,
    useGetCustomerAddressesById,
  };
}

export default useCustomerAddresses;
