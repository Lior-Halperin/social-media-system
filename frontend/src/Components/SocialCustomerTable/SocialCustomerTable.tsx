import { ISocialCustomerModel } from "../../Models/SocialCustomerModel";
import { useState, useEffect, useCallback } from "react";
import {
  StyledWrapper,
  StyleTableRow,
  StyledTable,
  StyledTableData,
  StyledTableHeader,
} from "./SocialCustomerTable.styled";
import Checkbox from "../Checkbox/Checkbox";
import { useDispatch} from "react-redux";
import { setSelectedCustomer } from "src/redux/features/socialCustomer/socialCustomerSlice";

interface SocialCustomerTableProps {
  socialCustomer: ISocialCustomerModel[];
  selectedCustomer: Record<string, ISocialCustomerModel>;
}

function SocialCustomerTable({socialCustomer,selectedCustomer}: SocialCustomerTableProps): JSX.Element {

  const [socialCustomerState, setSocialCustomerState] = useState<ISocialCustomerModel[]>([]);
  const dispatch = useDispatch();
 
  useEffect(() => {
      setSocialCustomerState(socialCustomer);
  }, [socialCustomer]);

  const handleCheckboxChange = useCallback((customer: ISocialCustomerModel) => {
    // Wrapped the handleCheckboxChange in useCallback to prevent unnecessary recreations of the function on each render.
    const newCheckboxState = { ...selectedCustomer };
    if (newCheckboxState[customer.customerId]) {
      delete newCheckboxState[customer.customerId];
    } else {
      newCheckboxState[customer.customerId] = customer;
    }
    dispatch(setSelectedCustomer(newCheckboxState))
    return newCheckboxState;
  }, [dispatch,selectedCustomer]);

  const tableHeaders =
    socialCustomerState.length > 0 ? Object.keys(socialCustomerState[0]) : [];

  if (socialCustomerState.length === 0) {
    return <StyledWrapper>Loading Social Customers...</StyledWrapper>;
  }
  return (
    <StyledWrapper className="SocialCustomer-table">
      <StyledTable>
        <thead>
          <StyleTableRow>
            <StyledTableHeader key={"header"}>{""}</StyledTableHeader>

            {tableHeaders.map((header) => (
              <StyledTableHeader key={header}>{header}</StyledTableHeader>
            ))}
          </StyleTableRow>
        </thead>
        <tbody>
          {socialCustomerState.map((socialCustomer) => (
            <StyleTableRow key={socialCustomer.customerId}>
              <td>
                <Checkbox
                  id={`checkbox-${socialCustomer.customerId}`}
                  label=""
                //   checked={!!checkedState[socialCustomer.customerId]} // The !! operator is a shorthand way of converting a value to boolean.
                  checked={!!selectedCustomer[socialCustomer.customerId]} // The !! operator is a shorthand way of converting a value to boolean.
                  onChange={() => handleCheckboxChange(socialCustomer)}
                />
              </td>
              {tableHeaders.map((header) => (
                <StyledTableData key={`${socialCustomer.customerId}-${header}`}>
                  {socialCustomer[header as keyof ISocialCustomerModel]}
                </StyledTableData>
              ))}
            </StyleTableRow>
          ))}
        </tbody>
      </StyledTable>
    </StyledWrapper>
  );
}

export default SocialCustomerTable;
