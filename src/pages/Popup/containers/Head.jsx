import { Flex } from "antd";
import React from "react";
import { ContextHeader, Header } from "../styles";

const Head = ({ t }) => {
  const version = chrome.runtime.getManifest().version;
  return (
    <Flex justify="space-between" style={{ marginTop: "10px" }}>
      <Flex gap="small">
        <img src="icon-128.png" alt="icon" width="40" height="40" />
        <Header>
          {t("theRealCost")} <ContextHeader>v{version}</ContextHeader>
        </Header>
      </Flex>
    </Flex>
  );
};

export default Head;
