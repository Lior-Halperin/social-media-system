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

interface SocialCustomerTableProps {
  socialCustomer: ISocialCustomerModel[];
  selectedCustomer: ISocialCustomerModel[];
}

function SocialCustomerTable({socialCustomer,selectedCustomer}: SocialCustomerTableProps): JSX.Element {

  const [socialCustomerState, setSocialCustomerState] = useState<ISocialCustomerModel[]>([]);
  const [checkedState, setCheckedState] = useState<Record<string, ISocialCustomerModel>>({}); // Record - Constructs an object type whose property keys are Keys and whose property values are Type.

  useEffect(() => {
    setSocialCustomerState(socialCustomer);
  }, [socialCustomer]);

  const handleCheckboxChange = useCallback((customer: ISocialCustomerModel) => {
    // Wrapped the handleCheckboxChange in useCallback to prevent unnecessary recreations of the function on each render.

    setCheckedState((prevState) => {
      const newCheckboxState = { ...prevState };
      if (newCheckboxState[customer.customerId]) {
        delete newCheckboxState[customer.customerId];
      } else {
        newCheckboxState[customer.customerId] = customer;
      }
      return newCheckboxState;
    });
  }, []);

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
                  checked={!!checkedState[socialCustomer.customerId]} // The !! operator is a shorthand way of converting a value to boolean.
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
