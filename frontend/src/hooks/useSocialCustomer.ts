import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ISocialCustomerModel } from "src/Models/SocialCustomerModel";
import {
  setSocialCustomer,
  addSocialCustomer,
} from "src/redux/features/socialCustomer/socialCustomerSlice";
import ApiService from "src/Utils/ApiService";
import useSocketIo from "./useSocketIo";
import config from "src/Utils/Config";
import SocketEvents from "src/Models/SocketEvents";

function useSocialCustomer() {
  // Hook into Redux store for dispatching actions
  const dispatch = useDispatch();
  // React Query's client for managing cache and executing side effects on mutation
  const queryClient = useQueryClient();

  // Select the socialCustomer slice from the Redux store
  const socialCustomer = useSelector(
    (state: RootState) => state.socialCustomer.socialCustomer
  );
  
  // Initialize the API service for social customers
  const socialCustomerApi = new ApiService<ISocialCustomerModel>("socialCustomerEndpoint");

  // React Query's useQuery hook to fetch social customers.
  // If social customers are already present in the Redux store, it uses them as initial data.
  // Otherwise, it fetches social customers from the server and updates the Redux store.
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["socialCustomer"],
    queryFn: async () => {
      const data = await socialCustomerApi.getAll();
      // Dispatch action to update Redux store with fetched social customers
      dispatch(setSocialCustomer(data));
      return data;
    },
    initialData: socialCustomer.length > 0 ? socialCustomer : undefined,
  });

  // React Query's useMutation hook to handle adding a new social customer.
  // It posts the new social customer to the server and, on success, updates the Redux store.
  const addSocialCustomerMutation = useMutation({
    mutationFn: (newSocialCustomer: ISocialCustomerModel) => socialCustomerApi.create(newSocialCustomer),
    onSuccess: (data) => {
      // Dispatch action to add the new social customer to the Redux store
      dispatch(addSocialCustomer(data));
      // Invalidate 'socialCustomer' query to refetch if necessary, ensuring data consistency
      queryClient.invalidateQueries({ queryKey: ["socialCustomer"] });
    },
  });

  const handleSocketData = (newSocialCustomer: ISocialCustomerModel) =>{
    dispatch(addSocialCustomer(newSocialCustomer))
    queryClient.invalidateQueries({queryKey:["socialCustomer"]})
  }

  useSocketIo(config.baseURL,SocketEvents.AddedSocialCustomer,handleSocketData)
  
  // Return the social customer data, loading state, error state, and mutation function from the hook
  return {
    socialCustomer: data || socialCustomer,
    isLoading,
    isError,
    error,
    addSocialCustomerMutation,
  };
}

export default useSocialCustomer;
