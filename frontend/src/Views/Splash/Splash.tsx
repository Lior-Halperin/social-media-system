import { useEffect, useState } from "react";
import { Logo, SplashScreenWrapper } from "./Splash.styled";
import logoImage from "../../assets/logo.jpg";

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
    <SplashScreenWrapper>
      <Logo src={logoImage} alt="Logo" />
    </SplashScreenWrapper>
  );
}

export default Splash;
