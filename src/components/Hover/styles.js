import styled from "styled-components";

export const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  left: ${(props) => `${props.d.x + props.d.sX}px`};
  top: ${(props) => `${props.d.y + props.d.sY}px`};
  z-index: 999; // have the invisible detection area above any elements so the popover shows
`;

export const ContentContainer = styled.div`
  padding: 5px;
  display: flex;
  align-items: stretch;
`;

export const PsuedoBox = styled.div`
  width: ${(props) => `${props.d.w}px`};
  height: ${(props) => `${props.d.h}px`};
`;

export const Header = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  min-width: 250px;
`;

export const ContextHeader = styled.p`
  font-size: 12px;
  font-weight: 300;
  color: gray;
  margin: 10px 0 0 0;
`;
