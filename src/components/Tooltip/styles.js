import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

export const Container = styled.div`
  padding: 10px;
  width: 150px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  display: block;
  z-index: 9999;
  color: #000;
  position: absolute;
  left: ${(props) => `${props.pos.left}px`};
  top: ${(props) => `${props.pos.top}px`};
  /* animation: ${fadeIn} 0.5s ease-in; */
`;

export const Row = styled.div`
  text-align: center;
  margin: 10px;
`;
