import { motion } from "framer-motion";
import styled from "styled-components";

export const lightTheme = {
  background: "whitesmoke",
  text: "#000",
  footerText: "#666",
  pendingText: "#ccc",
  primary: "#5a92ff",
  borderColor: "#ccc",
  searchBarBackground: "#efeded",
};

export const darkTheme = {
  background: "#141414",
  text: "#fff",
  footerText: "#999",
  pendingText: "#666",
  primary: "#7aa7ff",
  borderColor: "#444",
  searchBarBackground: "#2a2a2a",
};

export const Container = styled.div`
  display: flex;
  padding: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 42px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  box-sizing: border-box;
  transition: background-color 0.3s;
`;

export const MainContainer = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-start; */
  /* gap: 100px; */
  flex: 1 0 0;
  align-self: stretch;
`;

export const FooterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 24px;
`;

export const FooterText = styled.p`
  color: ${({ theme }) => theme.footerText};
  text-align: right;
  font-family: "Kumbh Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`;

export const T = styled(motion.p)`
  color: ${({ theme }) => theme.text};
  font-family: "Kumbh Sans";
  font-style: normal;
  font-size: 96px;
  font-weight: 300;
  line-height: 100%;
`;

export const FooterVersion = styled.span`
  font-weight: 300;
  font-size: 12px;
`;

export const TC = styled(motion.p)`
  display: flex;
  max-width: 1534px;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  width: 100%;
  font-size: 96px;
  gap: 20px 40px;
  color: ${({ theme }) => theme.text};
  font-family: "Kumbh Sans";
  font-style: normal;
  font-weight: 300;
`;

export const TB = styled(motion.span)`
  line-height: 100%; /* 96px */
`;

export const TA = styled(motion.span)`
  color: ${(props) =>
    props.pending === "1" ? props.theme.pendingText : props.theme.text};
  font-family: "Kumbh Sans";
  font-style: normal;
  font-weight: ${(props) => (props.small ? "400" : "800")};
  line-height: 100%;
  border-bottom: 4px solid;
  cursor: pointer;
`;

export const Arrow = styled(motion.span)`
  width: 100px;
  height: 96px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.primary};
  font-family: "Kumbh Sans";
  font-size: 96px;
  font-style: normal;
  font-weight: 800;
  line-height: 80%;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s;
  &:hover {
    background-color: ${({ theme }) => `${theme.primary}1A`};
    scale: 1.1;
  }
`;

export const BlurredOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const InitialContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const TryContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const BrowserContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background};
  height: 100%;
  position: relative;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.color === "red"
      ? "#EE5E58"
      : props.color === "green"
      ? "#54C840"
      : "#F5BB2E"};
  margin: 0 4px;
`;

export const DotRow = styled.div`
  display: flex;
  margin: 8px;
`;

export const BrowserRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 12px;
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

export const SearchBar = styled.div`
  margin: 8px 60px 8px 8px;
  padding: 4px 10px;
  background-color: ${({ theme }) => theme.searchBarBackground};
  border-radius: 1000px;
  width: 100%;
`;

export const BrowserViewContainer = styled.div`
  display: flex;
  align-items: center;
  height: 400px;
  gap: 24px;
  padding: 32px;
  box-sizing: border-box;
  position: relative;
`;

export const LargePrice = styled.div`
  font-size: 48px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  position: relative;
`;

export const ExtensionImg = styled.img`
  position: absolute;
  top: 24px;
  right: 40px;
  z-index: 2;
`;

export const PulseCircle = styled(motion.div)`
  position: absolute;
  top: 24px;
  right: 40px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #ffc06446;
  z-index: 1;
`;

export const Underline = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.text};
`;

export const ExtensionTip = styled(motion.div)`
  position: absolute;
  width: max-content;
  display: flex;
  align-items: center;
`;

export const TipText = styled.p`
  display: inline-block;
  margin: 8px;
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.footerText};
  max-width: 300px;
`;
