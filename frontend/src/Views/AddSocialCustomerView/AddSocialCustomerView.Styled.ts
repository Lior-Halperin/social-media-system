import styled from "styled-components"

export const StyledWrapper=styled.div`
 display: flex;
 flex-direction: column;
 width: 50%;
` 
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

export const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const StyledButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledErrorMessage = styled.div`
color: red;
margin-top: -5px;
margin-bottom: 10px;
`;

export const StyledSelectInput = styled.select`

`