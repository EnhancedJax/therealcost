import styled, { keyframes } from "styled-components";

export const App = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  text-align: center;
  height: 100%;
  padding: 10px;
  background-color: #282c34;
`;

export const AppLogo = styled.img`
  height: 30vmin;
  pointer-events: none;
`;

export const AppHeader = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const AppLink = styled.a`
  color: #61dafb;
`;

export const AppLogoSpin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const AnimatedAppLogo = styled(AppLogo)`
  animation: ${AppLogoSpin} infinite 20s linear;
`;
