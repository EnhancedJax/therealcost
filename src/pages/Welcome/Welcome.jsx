import { GlobalOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";
import i18n, { languages } from "../../utils/i18n";
import saveOptions from "../../utils/storage";
import { Container, Faded, Header, PageContainer } from "./styles";

export default function Welcome() {
  return (
    <Container>
      <Header>The Real Cost</Header>
      <PageContainer>
        <Faded>Currency</Faded>
      </PageContainer>
      <Dropdown
        menu={{
          items: Object.keys(languages).map((key) => ({
            key: key,
            label: languages[key],
          })),
          onSelect: (key) => {
            i18n.changeLanguage(key);
            saveOptions({ lang: key });
          },
          theme: "dark",
        }}
        placement="topLeft"
      >
        <Button
          type="dashed"
          icon={<GlobalOutlined />}
          size="large"
          style={{ backgroundColor: "transparent", color: "white" }}
        />
      </Dropdown>
    </Container>
  );
}

// Bottom presistent selector for langauge
// Page 1: Full screen input for currency selector
// Page 2:
