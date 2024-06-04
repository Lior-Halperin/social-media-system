import { useEffect, useState } from "react";
import { StyledLogoImage, StyledSplashScreenWrapper } from "./Splash.styled";

function Splash(): JSX.Element | null {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <StyledSplashScreenWrapper>
      <StyledLogoImage imageName={'logo'} alt="StyledLogoImage"/>
    </StyledSplashScreenWrapper>
  );
}

export default Splash;
