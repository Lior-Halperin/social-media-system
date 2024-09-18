import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Path, SubmitHandler, useForm } from "react-hook-form";

export interface GenericTableProps<T extends object> {
  data: T[];
  selectedItems: Record<string, T>;
  getItemId: (item: T) => number ;
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
    return <Box>Loading...</Box>;
  }

  return (
    <TableContainer component={Paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              {tableHeaders.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item) => {
              const itemId = getItemId(item);
              const isFlipped = flippedRow === itemId;
              return (
                <TableRow
                  key={itemId}
                  onClick={() => handleCardClick(itemId)}
                  hover
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={!!selectedItems[itemId]}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  </TableCell>
                  {tableHeaders.map((header) =>
                    isFlipped ? (
                      <TableCell key={`${itemId}-${header}`}>
                        <TextField
                          defaultValue={String(item[header as keyof T])}
                          {...register(`${itemId}.${header}` as Path<T>)}
                          variant="standard"
                          fullWidth
                        />
                      </TableCell>
                    ) : (
                      <TableCell key={`${itemId}-${header}`}>
                        {String(item[header as keyof T])}
                      </TableCell>
                    )
                  )}
                  <TableCell>
                    {isFlipped && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(onSubmit)}
                      >
                        Save
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </form>
    </TableContainer>
  );
}

export default GenericTable;
