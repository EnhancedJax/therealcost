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
  align-items: flex-start;
  gap: 100px;
  flex: 1 0 0;
  align-self: stretch;
`;

export const FooterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const FooterText = styled.p`
  color: #666;
  text-align: right;
  font-family: "Kumbh Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 20px */
`;

export const FooterVersion = styled.span`
  font-weight: 300;
  font-size: 14px;
`;

export const TC = styled(motion.p)`
  display: flex;
  width: 1534px;
  align-items: center;
  align-content: center;
  gap: ${(props) => (props.small ? "20px 16px" : "20px 40px")};
  flex-wrap: wrap;
  width: ${(props) => (props.small ? "50%" : "100%")};
  min-width: 1000px;
`;

export const TB = styled(motion.span)`
  color: #000;
  font-family: "Kumbh Sans";
  font-size: ${(props) => (props.small ? "48px" : "96px")};
  font-style: normal;
  font-weight: ${(props) => (props.small ? "200" : "300")};
  line-height: 100%; /* 96px */
`;

export const TA = styled(motion.span)`
  color: ${(props) => (props.pending ? "#ccc" : "#000")};
  font-family: "Kumbh Sans";
  font-size: ${(props) => (props.small ? "48px" : "96px")};
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

export const NextContainer = styled.div`
  display: flex;
  height: 148px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  align-self: stretch;
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
