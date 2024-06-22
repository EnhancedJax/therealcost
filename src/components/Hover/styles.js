import styled from "styled-components";

export const Container = styled.div`
  font-family: interregular;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  left: ${(props) => `${props.d.x + props.d.sX}px`};
  top: ${(props) => `${props.d.y + props.d.sY}px`};
  z-index: 999; // have the invisible detection area above any elements so the popover shows
`;

export const ContentContainer = styled.div`
  padding: 10px 5px;
  display: flex;
  align-items: stretch;
`;

export const PsuedoBox = styled.div`
  width: ${(props) => `${props.d.w}px`};
  height: ${(props) => `${props.d.h}px`};
`;

export const Header = styled.p`
  font-family: interbold;
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  min-width: 250px;
  line-height: 1.5em;
`;

export const ContextHeader = styled.p`
  font-family: interregular;
  font-size: 12px;
  color: gray;
  margin: 0;
  line-height: 1.5em;
`;
