import styled, { keyframes, css } from "styled-components";

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
  background-color: ${(props) => props.theme.colors.border};
  padding: 0.5rem;
`;

export const StyleTableRow = styled.tr``;

export const StyleFlipTbody = styled.tbody`
  background-color: transparent;
`;

const StyledFadeAndScale = keyframes`
  from {
    opacity: 0;
    transform: rotateX(180deg);
  }
  to {
    opacity: 1;
    transform: rotateX(0deg);
  }
`;

export const StyleFlipTableRowInner = styled.tr`
  position: relative;
  height: 100%;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

export const StyledFlipTableDataFront = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 0.5rem;
  background-color: #bbb;
  color: black;
`;

export const StyledFlipTableDataBack = styled.td<{ $isflipped: boolean }>`
  text-align: left;
  padding: 0.5rem;
  -webkit-backface-visibility: hidden
  ;
  backface-visibility: hidden;
  background-color: #2980b9;
  color: white;
  animation: ${StyledFadeAndScale} 0.6s ease-in-out forwards;
`;

export const StyledInput = styled.input`
  display: flex;
  width: 100%;
`;
