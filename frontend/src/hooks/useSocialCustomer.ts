import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ISocialCustomerModel } from "src/Models/SocialCustomerModel";
import {
  setSocialCustomer,
  addSocialCustomer,
} from "src/redux/features/socialCustomer/socialCustomerSlice";
import ApiService from "src/Utils/ApiService";

function useSocialCustomer() {
  // Hook into Redux store for dispatching actions and selecting state
  const dispatch = useDispatch();
  // React Query's client for managing cache and executing side effects on mutation
  const queryClient = useQueryClient();

  // Select the socialCustomer slice from the Redux store
  const socialCustomer = useSelector(
    (state: RootState) => state.socialCustomer.socialCustomer
  );

  const socialCustomerApi = new ApiService<ISocialCustomerModel>(
    "socialCustomerEndpoint"
  );

  // React Query's useQuery hook to fetch socialCustomer.
  // If socialCustomer are already present in the Redux store, it uses them as initial data.
  // Otherwise, it fetches socialCustomer from the server and updates the Redux store.
  const { isLoading, isError, error } = useQuery(
    "socialCustomer",
    async () => {
      const data = await socialCustomerApi.getAll();
      // Dispatch action to update Redux store with fetched socialCustomers
      dispatch(setSocialCustomer(data));
      return data;
    },
    { initialData: socialCustomer.length > 0 ? socialCustomer : undefined }
  );

  // React Query's useMutation hook to handle adding a new socialCustomer.
  // It posts the new socialCustomer to the server and, on success, updates the Redux store.
  const addSocialCustomerMutation = useMutation(
    (newSocialCustomer: ISocialCustomerModel) =>
      socialCustomerApi.create(newSocialCustomer),
    {
      onSuccess: (data) => {
        // Dispatch action to add the new socialCustomer to the Redux store
        dispatch(addSocialCustomer(data));
        // Invalidate 'socialCustomer' query to refetch if necessary, ensuring data consistency
        queryClient.invalidateQueries("socialCustomer");
      },
    }
  );
  // Return the socialCustomer data, loading state, error state, and mutation function from the hook
  return {
    socialCustomer,
    isLoading,
    isError,
    error,
    addSocialCustomerMutation,
  };
}

export default useSocialCustomer;
