import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
`;

export const Header = styled.p`
  width: 100%;
  text-align: center;
  margin: 0;
  color: rgb(255, 255, 255, 0.3);
  font-family: "Righteous";
`;

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const Faded = styled.p`
  background: linear-gradient(to bottom, white, transparent);
  font-size: 128px;
  margin: 0;
`;
