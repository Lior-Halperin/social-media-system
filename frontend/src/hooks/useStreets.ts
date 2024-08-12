import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { setStreets } from "src/redux/features/streets/streetsSlice"; // Import the action creator
import ApiService from "src/Utils/ApiService";
import { useQuery } from "@tanstack/react-query";

function useStreets(country: string, city: string) {
  const dispatch = useDispatch();

  // Use the Redux selector to get the streets state
  const streets = useSelector((state: RootState) => state.streets.streets);

  const streetsApi = new ApiService<string[]>("streetsEndPoint");

  const { data, isLoading, isError, error } = useQuery({ // Todo: change any type
    queryKey: ["country", country, "city", city],
    queryFn: async () => {
      try {
        if (streets.city === city) {
          return streets;
        }
        const data = await streetsApi.getByParams([country, city]);
        dispatch(setStreets({ city: city, country: country, streets: data }));
        return data;
      } catch (err: any) {
        console.log(err);
      }
    },
    initialData: streets.city === city ? streets : undefined,
  });
  const streetsResponse = { data, isLoading, isError, error, streets }
  return streetsResponse;
}

export default useStreets;
