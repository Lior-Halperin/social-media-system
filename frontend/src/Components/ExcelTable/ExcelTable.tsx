import React, { useCallback, useState } from "react";
import * as XLSX from "xlsx";
import ColumnMatchingPopup from "../ColumnMatchingPopup/ColumnMatchingPopup";
import DataTable from "../DataTable/DataTable";
import ExcelAddressesModel from "src/Models/AddressesListModel";

function ExcelTable(): React.ReactElement {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [columnMatches, setColumnMatches] = useState<
    { Header: string; accessor: string }[]
  >([]);
  const excelAddresses = new ExcelAddressesModel();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        const headerRow = jsonData[0] as string[];
        const rows = jsonData.slice(1); // Skip the header row

        // Transform rows to objects using header row
        const formattedData = rows.map((row) => {
          const rowArray = row as any[]; // Cast row as an array
          const rowObject: Record<string, any> = {};
          headerRow.forEach((header, index) => {
            rowObject[header] = rowArray[index];
          });
          return rowObject;
        });

        setHeaders(headerRow);
        setData(formattedData); // Correctly structured data
        setShowPopup(true); // Show popup for column matching
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleClickClose = useCallback(() => {
    setShowPopup(false);
  }, [showPopup]);

  const handleConfirm = (
    columnMatches: { Header: string; accessor: string }[]
  ) => {
    setColumnMatches(columnMatches);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <ColumnMatchingPopup
        confirm={handleConfirm}
        open={showPopup}
        onClose={handleClickClose}
        dataKeysModel={Object.keys(excelAddresses)}
        headers={headers}
      />
      {data.length > 0 && columnMatches ? (
        <DataTable data={data} columns={columnMatches} />
      ) : (
        <p>Upload your file.</p>
      )}
    </div>
  );
}

export default ExcelTable;
