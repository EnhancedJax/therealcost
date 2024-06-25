import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 42px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
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
  color: #666;
  text-align: right;
  font-family: "Kumbh Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 20px */
`;

export const FooterVersion = styled.span`
  font-weight: 300;
  font-size: 12px;
`;

export const T = styled(motion.p)`
  color: #000;
  font-family: "Kumbh Sans";
  font-style: normal;
  font-size: 96px;
  font-weight: 300;
  line-height: 100%; /* 96px */
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
  color: #000;
  font-family: "Kumbh Sans";
  font-style: normal;
  font-weight: 300;
`;

export const TB = styled(motion.span)`
  line-height: 100%; /* 96px */
`;

export const TA = styled(motion.span)`
  color: ${(props) => (props.pending ? "#ccc" : "#000")};
  font-family: "Kumbh Sans";
  font-style: normal;
  font-weight: ${(props) => (props.small ? "400" : "800")};
  line-height: 100%; /* 96px */
  border-bottom: 4px solid;
  cursor: pointer;
`;

export const Arrow = styled(motion.span)`
  width: 100px;
  height: 96px;
  flex-shrink: 0;
  color: #5a92ff;
  font-family: "Kumbh Sans";
  font-size: 96px;
  font-style: normal;
  font-weight: 800;
  line-height: 80%; /* 76.8px */
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(90, 146, 255, 0.1);
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
  z-index: 1;
  display: flex;
  justify-content: center;
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
`;

export const BrowserContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
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
  border-bottom: 1px solid #ccc;
`;

export const SearchBar = styled.div`
  margin: 8px 60px 8px 8px;
  padding: 4px 10px;
  background-color: #efeded;
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
  color: #000;
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
  background-color: black;
`;

export const ExtensionTip = styled(motion.div)`
  position: absolute;
  font-size: 14px;
  font-weight: 300;
  color: #7e7e7e;
`;
