import useCustomerAddresses from "src/hooks/useCustomerAddresses";
import IProjectCustomerDetailsModel from "../../Models/ProjectCustomerDetailsModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import GenericTable from "src/Components/GenericTable/GenericTable";
import { setSelectedCustomerAddresses } from "src/redux/features/customerAddresses/customerAddressesSlice";
import { useCallback, useEffect, useMemo } from "react";
import HoveringButton from "src/Components/HoveringButton/HoveringButton";
import MapWithAddresses from "src/Components/MapWithAddresses/MapWithAddresses";

function CustomerAddressesView(): JSX.Element {
  // Utilize the custom hook to access customerAddresses data and functionalities
  const { customerAddresses } = useCustomerAddresses();

  // Select the customerAddresses slice from the Redux store
  const selectedAddresses = useSelector(
    (state: RootState) => state.customerAddresses.selectedCustomerAddresses
  );

  const dispatch = useDispatch();

  const handleSelectedItemsChange = useCallback(
    (newSelectedItems: Record<string, IProjectCustomerDetailsModel>) => {
      dispatch(setSelectedCustomerAddresses(newSelectedItems));
    },
    [dispatch]
  );

  const mappedAddresses = useMemo(
    () =>
      customerAddresses.flatMap((ad) => [
        {
          id: ad.addressId,
          name: `${ad.firstName} ${ad.lastName}`,
          latitude: ad.latitude,
          longitude: ad.longitude,
        },
      ]),
    [customerAddresses]
  );
  return (
    <>
      <MapWithAddresses
        addresses={mappedAddresses}
        mapCenterLandmark={[31.962129, 34.805361]}
      />
      <GenericTable<IProjectCustomerDetailsModel>
        data={customerAddresses}
        selectedItems={selectedAddresses}
        getItemId={(item) => item.customerId + item.addressId}
        onSelectedItemsChange={handleSelectedItemsChange}
      />
      <HoveringButton<IProjectCustomerDetailsModel>
        data={customerAddresses}
        selectedItems={selectedAddresses}
        getItemId={(item) => item.customerId + item.addressId}
        onSelectedItemsChange={handleSelectedItemsChange}
      />
    </>
  );
}
export default CustomerAddressesView;
