import React, { useCallback, useState, useRef } from "react";
import * as XLSX from "xlsx";
import ColumnMatchingPopup from "../ColumnMatchingPopup/ColumnMatchingPopup";
import DataTable from "../DataTable/DataTable";
import ExcelAddressesModel from "src/Models/AddressesListModel";
import { ReadExcelFileType } from "src/Types/ReadExcelFileType";
import Popup from "../Popup/Popup";

function ExcelTable(): React.ReactElement {
  const [data, setData] = useState<any[]>([]); // Todo: change the any type
  const [headers, setHeaders] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [columnMatches, setColumnMatches] = useState<ReadExcelFileType[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const excelAddresses = new ExcelAddressesModel();

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [showPopup]
  );

  const handleClickClose = useCallback(() => {
    setShowPopup(false);
  }, []);

  const handleConfirm = (columnMatches: ReadExcelFileType[]) => {
    setColumnMatches(columnMatches);
    setShowPopup(false);
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        ref={fileInputRef}
      />
      {showPopup && (
        <ColumnMatchingPopup
          confirm={handleConfirm}
          onClose={handleClickClose}
          dataKeysModel={Object.keys(excelAddresses)}
          headers={headers}
        />
      )}

      {data.length > 0 && columnMatches.length > 0 ? (
        <Popup onClose={handleClickClose} onContinue={()=>{}} title="Uploaded file">
            <DataTable data={data} columns={columnMatches} />
        </Popup>
      ) : (
        <p>Upload your file.</p>
      )}
    </div>
  );
}

export default ExcelTable;
