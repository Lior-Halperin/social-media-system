import styled from "styled-components"

export const StyledWrapper=styled.div`
 display: flex;
flex-direction: column;
 width: 100%;
 height: 100vh;
 background-color: ${(props)=> props.theme.colors.background};
 color: ${(props)=> props.theme.colors.text};
` 



