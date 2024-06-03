import React from "react";
import styled, { ThemeProvider, DefaultTheme } from "styled-components";
import GlobalStyle from "./Theme/globalStyle";
import lightTheme from "./Theme/lightTheme";
import darkTheme from "./Theme/darkTheme";
import Splash from "./Views/Splash/Splash";
import Routing from "./Components/Routing";
import { StyledWrapper } from "./App.styled";
import NavBar from "./Components/NavBar/NavBar";
import Dropdown from "./Components/Dropdown/Dropdown";
import useVolunteerProject from "./hooks/useVolunteerProjects";
interface Option {
    value: number;
    label: string;
}

function App() {
  const [theme, setTheme] = React.useState<DefaultTheme>(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const navLinks = [
    { path: "/", namePage: "home" },
    { path: "/add-customer", namePage: "add customer" },
  ];
  const {error,isError,isLoading,volunteerProject} = useVolunteerProject();

  const options: Option[] = volunteerProject.map((project)=>{return{value:project.projectId,label:project.name}})
;

  const handleSelect = (option: Option) => {
    console.log('Selected option:', option);
};

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledWrapper>
        {/* <Splash/> */}
        <header>
          heder
          <button onClick={toggleTheme}>Toggle Theme</button>
          <NavBar links={navLinks} />
          <Dropdown
                options={options}
                onSelect={handleSelect}
                placeholder="Select an option"
                renderOption={(option) => <span>{option.label}</span>}
            />
        </header>
        <hr />
        <main>
          <Routing />
        </main>
        <hr />
        <footer>footer</footer>
      </StyledWrapper>
    </ThemeProvider>
  );
}

export default App;
