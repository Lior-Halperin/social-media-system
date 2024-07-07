import { useState, useEffect, useCallback } from "react";
import {
  StyledWrapper,
  StyleTableRow,
  StyledTable,
  StyledTableHeader,
  StyleFlipTbody,
  StyleFlipTableRowInner,
  StyledFlipTableDataFront,
  StyledFlipTableDataBack,
  StyledInput,
} from "./GenericTable.styled";
import Checkbox from "../Checkbox/Checkbox";

export interface GenericTableProps<T extends object> {
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
  const [flippedRow, setFlippedRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Record<number, Partial<T>>>({});

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleCardClick = (itemId: number) => {
    setFlippedRow(flippedRow === itemId ? null : itemId);
  };

  const handleInputChange = (itemId: number, field: keyof T, value: string) => {
    setEditedData((prevData) => ({
      ...prevData,
      [itemId]: {
        ...prevData[itemId],
        [field]: value,
      },
    }));
  };

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
        <StyleFlipTbody>
          {tableData.map((item) => {
            const itemId = getItemId(item);
            const isFlipped = flippedRow === itemId;
            return (
              <StyleFlipTableRowInner
                key={itemId}
                onClick={() => handleCardClick(itemId)}
              >
                <td>
                  <Checkbox
                    id={`checkbox-${itemId}`}
                    label=""
                    checked={!!selectedItems[itemId]}
                    onChange={() => handleCheckboxChange(item)}
                  />
                </td>
                {tableHeaders.map((header) =>
                  isFlipped ? (
                    <StyledFlipTableDataBack
                      $isflipped={isFlipped} // Use $ prefix for transient props
                      key={`${itemId}-${header}`}
                    >
                      <StyledInput
                        type="text"
                        value={String(item[header as keyof T])}
                        onChange={(e) =>
                          handleInputChange(
                            itemId,
                            header as keyof T,
                            e.target.value
                          )
                        }
                      />
                    </StyledFlipTableDataBack>
                  ) : (
                    <StyledFlipTableDataFront
                      key={`${itemId}-${header}`}
                    >
                      {String(item[header as keyof T])}
                    </StyledFlipTableDataFront>
                  )
                )}
              </StyleFlipTableRowInner>
            );
          })}
        </StyleFlipTbody>
      </StyledTable>
    </StyledWrapper>
  );
}

export default GenericTable;
