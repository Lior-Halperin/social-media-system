import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setCities } from "src/redux/features/cities/citiesSlice";
import { RootState } from "src/redux/store";
import ApiService from "src/Utils/ApiService";

export type languageType = 'he' | 'en' 

function useCities(country: string, language: languageType) {
  // Hook into Redux store for dispatching actions
  const dispatch = useDispatch();

  // Select the cities slice from the redux store
  const cities = useSelector((state: RootState) => state.cities.cities);

  // Initialize the API service for social cities
  const citiesApi = new ApiService<string[]>("citiesEndPoint");

  const { isLoading, isError, error, data } = useQuery<string[], Error>({
    queryKey: ["cities", country,"language",language],
    queryFn: async () => {
      if (cities.length > 0) {
        return cities;
      }
      const data = await citiesApi.getByParams([country, language]);
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
