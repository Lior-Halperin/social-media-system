import { memo, useCallback, useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { setSelectedVolunteerProject } from "./redux/features/volunteerProjects/volunteerProjectsSlice";
import { IVolunteerProjectModel } from "./Models/VolunteerProjectModel";
import useCustomerAddresses from "./hooks/useCustomerAddresses";

function App() {

  const [theme, setTheme] = useState<DefaultTheme>(darkTheme);

  const { volunteerProject } = useVolunteerProject();

  const [selectedProject, setSelectedProject] =
    useState<IVolunteerProjectModel | null>(
      volunteerProject[volunteerProject.length - 1]
    );

  const {useGetCustomerAddressesById } = useCustomerAddresses();

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  }, []);

  const navLinks = [
    { path: "/", namePage: "home" },
    { path: "/add-customer", namePage: "add customer" },
    { path: "/social-customer", namePage: "social customer" },
  ];


   const {status,error}=useGetCustomerAddressesById(
    selectedProject?.project_id ?? -1
  ); //called with selectedCustomerId ?? -1. This ensures that the query is only enabled when selectedCustomerId is not null.

  const options: IVolunteerProjectModel[] = volunteerProject.map((project) => ({
    date: project.date,
    name: project.name,
    project_id: project.project_id,
  }));

  const dispatch = useDispatch();
  const handleSelect = useCallback(
    (option: IVolunteerProjectModel) => {
      setSelectedProject(option);
      dispatch(setSelectedVolunteerProject(option));
    },
    [dispatch]
  );

  useEffect(() => {
    setSelectedProject(volunteerProject[volunteerProject.length - 1]);
  }, [volunteerProject]);

//   if(status === "loading") return <h1>loading addresses....</h1>
//   if(status === "error") return <h1>{JSON.stringify(error)}</h1>

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledWrapper>
        <header>
          header
          <button onClick={toggleTheme}>Toggle Theme</button>
          <NavBar links={navLinks} />
          <Dropdown
            options={options}
            onSelect={handleSelect}
            placeholder={
              selectedProject ? selectedProject.name : "Select an option"
            }
            renderOption={(option) => <span>{option.name}</span>}
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

export default memo(App);
