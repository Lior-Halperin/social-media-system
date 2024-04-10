import styled, { keyframes } from "styled-components";

const fadeAndScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const SplashScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it's above other content */
`;

export const Logo = styled.img`
  width: 100%;
  animation: ${fadeAndScale} 1.5s ease-in-out forwards;
`;
