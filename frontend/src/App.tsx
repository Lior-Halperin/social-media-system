import React from "react";
import styled, { ThemeProvider, DefaultTheme } from "styled-components";
import GlobalStyle from "./Theme/globalStyle";
import { Theme } from "./theme";
import lightTheme from "./Theme/lightTheme";
import darkTheme from "./Theme/darkTheme";
import Splash from "./Views/Splash/Splash";
import Routing from "./Components/Routing";
import { StyledWrapper } from "./App.styled";

function App() {
    const [theme, setTheme] = React.useState<DefaultTheme>(darkTheme);

    const toggleTheme = () => {
      setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <StyledWrapper>
        <Splash/>
        <header>
            heder
            <button onClick={toggleTheme}>Toggle Theme</button>
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
