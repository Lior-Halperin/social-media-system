import {ISocialCustomerModel} from "../../Models/SocialCustomerModel";
import { useState, useEffect, useMemo } from "react";
import {
  StyledWrapper,
  StyleTableRow,
  StyledTable,
  StyledTableData,
  StyledTableHeader,
} from "./SocialCustomerTable.styled";

function SocialCustomerTable({ socialCustomer }: { socialCustomer: ISocialCustomerModel[] }): JSX.Element {

    
  const [socialCustomerState, setSocialCustomerState] = useState<ISocialCustomerModel[]>(socialCustomer);

  useEffect(() => {
    setSocialCustomerState(socialCustomer);
  }, [socialCustomer]);

  /* Memoization of Table Headers: useMemo is used to memoize the computation of tableHeaders,
   improving performance by avoiding unnecessary recalculations on re-renders.*/
  const tableHeaders = useMemo(() => (socialCustomerState.length > 0 ? Object.keys(socialCustomerState[0]) : []), [socialCustomerState]);

  if (socialCustomerState.length === 0) {
    return <StyledWrapper>Loading SocialCustomer...</StyledWrapper>;
  }

  return (
    <StyledWrapper className="SocialCustomer-table">
      <StyledTable>
        {/* todo */}
        <thead> 
          <StyleTableRow>
            {tableHeaders.map((header) => (
              <StyledTableHeader key={header}>{header}</StyledTableHeader>
            ))}
          </StyleTableRow>
        </thead>
        <tbody>
          {socialCustomerState.map((socialCustomer, index) => (
            <StyleTableRow key={socialCustomer.id || index}>
              {tableHeaders.map((header) => (
                <StyledTableData key={`${socialCustomer.id}-${header}`}>
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
