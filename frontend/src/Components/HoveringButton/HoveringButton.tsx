import { useEffect, useState } from "react";
import { ISocialCustomerModel } from "src/Models/SocialCustomerModel";
import { Button, ButtonWrapper, CloseButton, Overlay, PopupWrapper } from "./HoveringButton.styled";
import SocialCustomerTable from "../SocialCustomerTable/SocialCustomerTable";

interface HoveringButtonProps {
    selectedCustomers: Record<string, ISocialCustomerModel>;
  }

function HoveringButton({selectedCustomers}:HoveringButtonProps): JSX.Element{

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [isHidden, setIsHidden] = useState<boolean>(false)
  
    const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const selectedCustomersArray = Object.values(selectedCustomers);

  useEffect(()=>{
    setIsHidden(selectedCustomersArray.length > 0)
  }
    ,[selectedCustomersArray.length])

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
          <SocialCustomerTable socialCustomer={selectedCustomersArray} selectedCustomer={selectedCustomers}/>
          </PopupWrapper>
        </>
      )}
      </>
    )}
    </>
  );

}

export default HoveringButton