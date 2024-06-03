import styled from "styled-components"

export const StyledDropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    width: 200px;
`;

export const StyledSelectedOption = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
`;

export const StyledOptionsList = styled.ul`
    position: absolute;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid #ccc;
    border-top: none;
    max-height: 150px;
    overflow-y: auto;
    background: ${(props)=>props.theme.colors.background};
    z-index: 1;
`;

export const StyledOptionItem = styled.li`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background:  #f0f0f0;
        color: black;
    }
`;