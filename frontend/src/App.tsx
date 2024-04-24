import React from "react";
import styled, { ThemeProvider, DefaultTheme } from "styled-components";
import GlobalStyle from "./Theme/globalStyle";
import lightTheme from "./Theme/lightTheme";
import darkTheme from "./Theme/darkTheme";
import Splash from "./Views/Splash/Splash";
import Routing from "./Components/Routing";
import { StyledWrapper } from "./App.styled";
import NavBar from "./Components/NavBar/NavBar";

function App() {
    const [theme, setTheme] = React.useState<DefaultTheme>(darkTheme);

    const toggleTheme = () => {
      setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    const navLinks = [
        { path: "/", namePage: "home" },
        { path: "/add-customer", namePage: "add customer" },
      ];
    
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <StyledWrapper>
        <Splash/>
        <header>
            heder
            <button onClick={toggleTheme}>Toggle Theme</button>
            <NavBar links={navLinks} />

        </header>
        <hr/>
        < main>
        <Routing/>
        </main>
        <hr/>
        <footer>
            footer
        </footer>
        </StyledWrapper>
    </ThemeProvider>
  );
}

export default App;
