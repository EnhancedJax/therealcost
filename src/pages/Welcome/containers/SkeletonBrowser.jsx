import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  MenuOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Flex } from "antd";
import React from "react";
import {
  BrowserContainer,
  BrowserRow,
  Dot,
  DotRow,
  SearchBar,
} from "../styles";

export default function SkeletonBrowser({ children }) {
  return (
    <BrowserContainer>
      <DotRow>
        <Dot color="red" />
        <Dot />
        <Dot color="green" />
      </DotRow>
      <BrowserRow>
        <Flex gap="middle">
          <ArrowLeftOutlined />
          <ArrowRightOutlined />
          <RedoOutlined />
        </Flex>
        <SearchBar>https://phone.shop</SearchBar>
        <MenuOutlined />
      </BrowserRow>
      {children}
    </BrowserContainer>
  );
}
