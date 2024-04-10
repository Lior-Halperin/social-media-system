import {IDonateModel} from "../../Models/DonateModel";
import { useState, useEffect, useMemo } from "react";
import {
  StyledWrapper,
  StyleTableRow,
  StyledTable,
  StyledTableData,
  StyledTableHeader,
} from "./DonateTable.styled";

function DonateTable({ donate }: { donate: IDonateModel[] }): JSX.Element {

    
  const [donateState, setDonateState] = useState<IDonateModel[]>(donate);

  useEffect(() => {
    setDonateState(donate);
  }, [donate]);

  /* Memoization of Table Headers: useMemo is used to memoize the computation of tableHeaders,
   improving performance by avoiding unnecessary recalculations on re-renders.*/
  const tableHeaders = useMemo(() => (donateState.length > 0 ? Object.keys(donateState[0]) : []), [donateState]);

  if (donateState.length === 0) {
    return <StyledWrapper>Loading Donate...</StyledWrapper>;
  }

  return (
    <StyledWrapper className="Donate-table">
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
          {donateState.map((donate, index) => (
            <StyleTableRow key={donate.id || index}>
              {tableHeaders.map((header) => (
                <StyledTableData key={`${donate.id}-${header}`}>
                  {donate[header as keyof IDonateModel]}
                </StyledTableData>
              ))}
            </StyleTableRow>
          ))}
        </tbody>
      </StyledTable>
    </StyledWrapper>
  );
}

export default DonateTable;
