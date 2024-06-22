import {
  BulbOutlined,
  FileExclamationOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Button, Flex } from "antd";
import React from "react";

const Foot = ({ t }) => (
  <Flex gap="small" wrap="wrap">
    <Button
      type="dashed"
      icon={<FileExclamationOutlined />}
      danger
      href="https://github.com/EnhancedJax/therealcost/issues"
    >
      {t("settings.footerButtons.report")}
    </Button>
    <Button
      type="dashed"
      icon={<BulbOutlined />}
      href="https://github.com/EnhancedJax/therealcost/issues"
    >
      {t("settings.footerButtons.suggest")}
    </Button>
    {/* <Button type="dashed" icon={<GithubOutlined />}>
      Leave a review
    </Button> */}
    <Button
      type="dashed"
      icon={<GithubOutlined />}
      href="https://github.com/EnhancedJax/therealcost"
    >
      {t("settings.footerButtons.repo")}
    </Button>
  </Flex>
);

export default Foot;
