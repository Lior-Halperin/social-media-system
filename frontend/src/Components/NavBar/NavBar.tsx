import { NavLink } from "react-router-dom";
import StyledWrapper from "./NavBar.styled";

interface INavBar {
  path: string;
  namePage: string;
}

function NavBar({ links }: { links: INavBar[] }): JSX.Element {
  return (
    <StyledWrapper className="NavBar">
      NavBar Screen
      {links.map((link, index) => (
        <NavLink to={link.path} key={index}>
          <button>{link.namePage}</button>
        </NavLink>
      ))}
    </StyledWrapper>
  );
}

export default NavBar;
