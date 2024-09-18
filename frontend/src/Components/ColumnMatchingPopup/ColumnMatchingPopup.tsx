import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import Popup from "../Popup/Popup";

interface ColumnMatchingPopupProps {
  headers: string[];
  dataKeysModel: string[];
  onClose: (value: "matching" | "table") => void;
  confirm: (columnMatches: { Header: string; accessor: string }[],popupType: "matching" | "table") => void;
}

const ColumnMatchingPopup: React.FC<ColumnMatchingPopupProps> = ({
  headers,
  dataKeysModel,
  onClose,
  confirm,
}) => {
  const [columnMatches, setColumnMatches] = useState<
    { Header: string; accessor: string }[]
  >([]);
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());

  const handleMatchChange = (excelColumn: string, modelColumn: string) => {
    setColumnMatches((prev) => {
      const newMatches = prev.filter((match) => match.Header !== excelColumn);
      if (modelColumn) {
        newMatches.push({ Header: excelColumn, accessor: modelColumn });
      }
      return newMatches;
    });

    setSelectedValues((prev) => {
      const newSelected = new Set(prev);
      const oldValue = columnMatches.find(
        (match) => match.Header === excelColumn
      )?.accessor;
      if (oldValue) newSelected.delete(oldValue);
      if (modelColumn) newSelected.add(modelColumn);
      return newSelected;
    });
  };

  const handleConfirm = () => {
    confirm(columnMatches,"matching");

    // Implement the logic to proceed with the matched columns
  };

  const handleClose = () => {
    onClose("matching");
  };

  return (
    <>
      <Popup
        title="Match Columns"
        onClose={handleClose}
        onContinue={handleConfirm}
      >
          {dataKeysModel.map((header, idx) => (
            <div key={idx}>
              <span>{header}:</span>
              <Select
                value={
                  columnMatches.find((match) => match.Header === header)
                    ?.accessor || ""
                }
                onChange={(e) =>
                  handleMatchChange(header, e.target.value as string)
                }
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {headers.map((col) => (
                  <MenuItem
                    key={col}
                    value={col}
                    disabled={
                      selectedValues.has(col) &&
                      columnMatches.find((match) => match.Header === header)
                        ?.accessor !== col
                    }
                  >
                    {col}
                  </MenuItem>
                ))}
              </Select>
            </div>
          ))}
      </Popup>
    </>
  );
};

export default ColumnMatchingPopup;
