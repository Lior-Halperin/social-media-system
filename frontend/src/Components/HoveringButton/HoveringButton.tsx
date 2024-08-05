import { useEffect, useState } from "react";
import { ISocialCustomerModel } from "src/Models/SocialCustomerModel";
import {
  Button,
  ButtonWrapper,
  CloseButton,
  Overlay,
  PopupWrapper,
} from "./HoveringButton.styled";
import GenericTable, { GenericTableProps } from "../GenericTable/GenericTable";

interface HoveringButtonProps <T extends object> extends GenericTableProps<T>{}

function HoveringButton<T extends object>({getItemId,onSelectedItemsChange,selectedItems}:HoveringButtonProps<T>): JSX.Element {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const selectedCustomersArray = Object.values(selectedItems);

  useEffect(() => {
    setIsHidden(selectedCustomersArray.length > 0);
  }, [selectedCustomersArray.length]);

  return (
    <>
      {isHidden && (
        <>
          <ButtonWrapper>
            <Button onClick={handleButtonClick}>
              {selectedCustomersArray.length}
            </Button>
          </ButtonWrapper>
          {isPopupOpen && (
            <>
              <Overlay onClick={handleClosePopup} />
              <PopupWrapper>
                <CloseButton onClick={handleClosePopup}>X</CloseButton>
                <GenericTable<T>
                  data={selectedCustomersArray}
                  selectedItems={selectedItems}
                  getItemId={getItemId}
                  onSelectedItemsChange={onSelectedItemsChange}
                />
              </PopupWrapper>
            </>
          )}
        </>
      )}
    </>
  );
}

export default HoveringButton;
