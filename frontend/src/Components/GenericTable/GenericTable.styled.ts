import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledTable = styled.table`
  background-color: ${(props) => props.theme.colors.background};
  font-family: Arial, Helvetica, sans-serif;
`;
export const StyledTableHeader = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: ${(props)=>props.theme.colors.border};
`;
export const StyledTableData = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 0.5rem;
`;

export const StyleTableRow = styled.tr``;
