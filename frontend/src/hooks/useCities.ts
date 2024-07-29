import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import ICitiesModel from "src/Models/CitiesModel";
import { setCities } from "src/redux/features/cities/citiesSlice";
import { RootState } from "src/redux/store";
import ApiService from "src/Utils/ApiService";

function useCities(country: string) {
  // Hook into Redux store for dispatching actions
  const dispatch = useDispatch();

  // Select the cities slice from the redux store
  const cities = useSelector((state: RootState) => state.cities.cities);

  // Initialize the API service for social cities
  const citiesApi = new ApiService<ICitiesModel[]>("citiesEndPoint");

  const { isLoading, isError, error, data } = useQuery<ICitiesModel[], Error>({
    queryKey: ["cities", country],
    queryFn: async () => {
      if (cities.length > 0) {
        return cities;
      }
      const data = await citiesApi.getById(country);
      // Dispatch action to update Redux store with fetched cities
      dispatch(setCities(data));
      return data;
    },
    initialData: cities.length > 0 ? cities : undefined,
  });

  return {
    cities: data || cities,
    isLoading,
    isError,
    error,
  };
}

export default useCities;
