import styled from "styled-components";

export const Container = styled.div`
  padding: 5px;
  width: 150px;
  height: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  display: block;
  z-index: 9999;
  color: #000;
  position: absolute;
  left: ${(props) => `${props.d.x + props.d.w / 2 - 150 / 2}px`};
  top: ${(props) => `${props.d.y - props.d.h - 30}px`};
`;
