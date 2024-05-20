import { useSelector } from "react-redux";
import SocialCustomerTable from "src/Components/SocialCustomerTable/SocialCustomerTable";
import useSocialCustomer from "src/hooks/useSocialCustomer";
import { RootState } from "src/redux/store";

function SocialCustomerListView(): JSX.Element {
  // Utilize the custom hook to access socialCustomers data and functionalities
  const {
    socialCustomer,
    error,
    isError,
    isLoading,
  } = useSocialCustomer();

  // Select the socialCustomer slice from the Redux store
  const selectedCustomer = useSelector(
    (state: RootState
    ) => state.socialCustomer.SelectedCustomer
  );
  
  if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      <SocialCustomerTable socialCustomer={socialCustomer} selectedCustomer={selectedCustomer}/>
    </>
  );
}

export default SocialCustomerListView;
