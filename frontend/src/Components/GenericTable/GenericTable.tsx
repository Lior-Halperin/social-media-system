import { useState, useEffect, useCallback } from "react";
import {
  StyledWrapper,
  StyleTableRow,
  StyledTable,
  StyledTableData,
  StyledTableHeader,
} from "./GenericTable.styled";
import Checkbox from "../Checkbox/Checkbox";


interface GenericTableProps<T extends object> {
    data: T[];
    selectedItems: Record<string, T>;
    getItemId: (item: T) => number;
    onSelectedItemsChange: (selectedItems: Record<string, T>) => void;
  }
  
  function GenericTable<T extends object>({
    data,
    selectedItems,
    getItemId,
    onSelectedItemsChange,
  }: GenericTableProps<T>): JSX.Element {
    const [tableData, setTableData] = useState<T[]>([]);
  
    useEffect(() => {
      setTableData(data);
    }, [data]);
  
    const handleCheckboxChange = useCallback(
      (item: T) => {
        const newCheckboxState = { ...selectedItems };
        const itemId = getItemId(item);
        if (newCheckboxState[itemId]) {
          delete newCheckboxState[itemId];
        } else {
          newCheckboxState[itemId] = item;
        }
        onSelectedItemsChange(newCheckboxState);
        return newCheckboxState;
      },
      [selectedItems, getItemId, onSelectedItemsChange]
    );
  
    const tableHeaders = tableData.length > 0 ? Object.keys(tableData[0]) : [];
  
    if (tableData.length === 0) {
      return <StyledWrapper key={Math.random()}>Loading...</StyledWrapper>;
    }
  
    return (
      <StyledWrapper className="generic-table" key={Math.random()}>
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
            {tableData.map((item) => (
              <StyleTableRow key={getItemId(item)}>
                <td>
                  <Checkbox
                    id={`checkbox-${getItemId(item)}`}
                    label=""
                    checked={!!selectedItems[getItemId(item)]}
                    onChange={() => handleCheckboxChange(item)}
                  />
                </td>
                {tableHeaders.map((header) => (
                  <StyledTableData key={`${getItemId(item)}-${header}`}>
                    {String(item[header as keyof T])}
                  </StyledTableData>
                ))}
              </StyleTableRow>
            ))}
          </tbody>
        </StyledTable>
      </StyledWrapper>
    );
  }
  
  export default GenericTable;