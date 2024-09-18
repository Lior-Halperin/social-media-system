import React from "react";
import { useTable, Column } from "react-table";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { ReadExcelFileType } from "src/Types/ReadExcelFileType";

interface DataTableProps {
  data: any[];
  columns: ReadExcelFileType[];
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: columns as Column<any>[],
    data,
  });

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()} aria-label="data table">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>{column.render("Header")}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
