import { configureStore } from "@reduxjs/toolkit";
import socialCustomerReducer from "./features/socialCustomer/socialCustomerSlice";
import volunteerProjectReducer from "./features/volunteerProjects/volunteerProjectsSlice";
import customerAddressesReducer from "./features/customerAddresses/customerAddressesSlice";
import citiesReducer from "./features/cities/citiesSlice";

export const store = configureStore({
  reducer: {
    socialCustomer: socialCustomerReducer,
    volunteerProject: volunteerProjectReducer,
    customerAddresses: customerAddressesReducer,
    cities: citiesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
