import { useDispatch, useSelector } from "react-redux";
import GenericTable from "src/Components/GenericTable/GenericTable";
import HoveringButton from "src/Components/HoveringButton/HoveringButton";
import { ISocialCustomerModel } from "src/Models/SocialCustomerModel";
import useSocialCustomer from "src/hooks/useSocialCustomer";
import { setSelectedCustomer } from "src/redux/features/socialCustomer/socialCustomerSlice";
import { RootState } from "src/redux/store";

function SocialCustomerListView(): JSX.Element {
  // Utilize the custom hook to access socialCustomers data and functionalities
  const { socialCustomer, error, isError, isLoading } = useSocialCustomer();

  // Select the socialCustomer slice from the Redux store
  const selectedCustomer = useSelector(
    (state: RootState) => state.socialCustomer.selectedCustomer
  );
  const dispatch = useDispatch();

  const handleSelectedItemsChange = (
    newSelectedItems: Record<string, ISocialCustomerModel>
  ) => {
    dispatch(setSelectedCustomer(newSelectedItems));
  };
  if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      <GenericTable<ISocialCustomerModel>
        data={socialCustomer}
        selectedItems={selectedCustomer}
        getItemId={(item) => item.customerId}
        onSelectedItemsChange={handleSelectedItemsChange}
      />
      <HoveringButton<ISocialCustomerModel>
        data={socialCustomer}
        selectedItems={selectedCustomer}
        getItemId={(item) => item.customerId}
        onSelectedItemsChange={handleSelectedItemsChange}
      />
    </>
  );
}

export default SocialCustomerListView;
