import { useState, useEffect, useCallback, useMemo } from "react";
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
import { Path, SubmitHandler, useForm } from "react-hook-form";

export interface GenericTableProps<T extends object> {
  data: T[];
  selectedItems: Record<string, T>;
  getItemId: (item: T) => number;
  onSelectedItemsChange: (selectedItems: Record<string, T>) => void;
  onSubmitChange?: (item: T) => void;
}

function GenericTable<T extends object>({
  data,
  selectedItems,
  getItemId,
  onSelectedItemsChange,
  onSubmitChange,
}: GenericTableProps<T>): JSX.Element {
  const [tableData, setTableData] = useState<T[]>([]);
  const [flippedRow, setFlippedRow] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<T>();

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

  const handleCardClick = (itemId: number) => {
    if (itemId !== flippedRow) {
      setFlippedRow(flippedRow === itemId ? null : itemId);
    }
  };

  const tableHeaders = useMemo(() => {
    return data.length > 0 ? Object.keys(data[0]) : [];
  }, [data]);

  const onSubmit: SubmitHandler<T> = async (formData) => {
    try {
      const listEditedItem = Object.keys(formData);
      const lastEditedItem = Object.values(formData)[listEditedItem.length - 1];
      onSubmitChange && onSubmitChange(lastEditedItem);
      reset();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  if (tableData.length === 0) {
    return <StyledWrapper key={Math.random()}>Loading...</StyledWrapper>;
  }

  return (
    <StyledWrapper className="generic-table" key={Math.random()}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  onClick={() => handleCardClick(itemId)} // For flip the card
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
                          defaultValue={String(item[header as keyof T])}
                          {...register(`${itemId}.${header}` as Path<T>)}
                        />
                      </StyledFlipTableDataBack>
                    ) : (
                      <StyledFlipTableDataFront key={`${itemId}-${header}`}>
                        {String(item[header as keyof T])}
                      </StyledFlipTableDataFront>
                    )
                  )}
                  <td>
                    {isFlipped && (
                      <button onClick={handleSubmit(onSubmit)}>Save</button>
                    )}
                  </td>
                </StyleFlipTableRowInner>
              );
            })}
          </StyleFlipTbody>
        </StyledTable>
      </form>
    </StyledWrapper>
  );
}

export default GenericTable;
