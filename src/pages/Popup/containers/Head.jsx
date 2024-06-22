import { SaveOutlined } from "@ant-design/icons";
import { Button, Flex, Form } from "antd";
import React from "react";
import { ContextHeader, Header } from "../styles";

const Head = ({ t }) => {
  const version = chrome.runtime.getManifest().version;
  return (
    <Flex justify="space-between" style={{ marginTop: "20px" }}>
      <Header>
        {t("theRealCost")} <ContextHeader>v{version}</ContextHeader>
      </Header>
      <Form.Item style={{ marginBottom: "0px" }}>
        <Button
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
          shape="circle"
          size="large"
        />
      </Form.Item>
    </Flex>
  );
};

export default Head;
