import { useEffect } from "react";
import { CheckboxContainer, CheckboxLabel, HiddenCheckbox, StyledCheckbox } from "./Checkbox.styled";

interface CheckboxProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

function Checkbox (props: CheckboxProps): JSX.Element{

return(
    <CheckboxContainer>
      <HiddenCheckbox id={props.id} checked={props.checked} onChange={props.onChange} />
      <StyledCheckbox checked={props.checked} />
      <CheckboxLabel htmlFor={props.id}>{props.label}</CheckboxLabel>
    </CheckboxContainer>
  );
}
  
  export default Checkbox;