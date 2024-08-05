import { memo, useState } from "react";
import { StyledDropdownContainer, StyledOptionItem, StyledOptionsList, StyledSelectedOption } from "./Dropdown.styled";

interface DropdownProps<T> {
    options: T[];
    onSelect: (value: T) => void;
    placeholder?: string;
    renderOption: (option: T) => React.ReactNode;
}

 function Dropdown <T,>({options, onSelect, placeholder, renderOption}:DropdownProps<T>): JSX.Element {
/* The trailing comma (,) is a syntax detail that helps avoid parsing ambiguity in TypeScript when used with JSX.
If the TypeScript parser encounters this, it might get confused and interpret <T> as the start of a JSX tag rather than a generic type parameter.
*/
    const [isOpen, setIsOpen] = useState(false);

    const [selectedOption, setSelectedOption] = useState<T | null>(null);

    const handleSelect = (option: T) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <StyledDropdownContainer>
            <StyledSelectedOption onClick={() => setIsOpen(!isOpen)}>
                {selectedOption ? renderOption(selectedOption) : placeholder}
            </StyledSelectedOption>
            {isOpen && (
                <StyledOptionsList>
                    {options.map((option, index) => (
                        <StyledOptionItem key={index} onClick={() => handleSelect(option)}>
                            {renderOption(option)}
                        </StyledOptionItem>
                    ))}
                </StyledOptionsList>
            )}
        </StyledDropdownContainer>
    );
};
    
    export default memo(Dropdown) as typeof Dropdown;