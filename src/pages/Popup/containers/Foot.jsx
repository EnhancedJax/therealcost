import {
  BulbOutlined,
  FileExclamationOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Button, Flex } from "antd";
import React from "react";

const Foot = () => (
  <Flex gap="small" wrap="wrap">
    <Button
      type="dashed"
      icon={<FileExclamationOutlined />}
      danger
      href="https://github.com/EnhancedJax/therealcost/issues"
    >
      Report an issue
    </Button>
    <Button
      type="dashed"
      icon={<BulbOutlined />}
      href="https://github.com/EnhancedJax/therealcost/issues"
    >
      Suggest a feature
    </Button>
    {/* <Button type="dashed" icon={<GithubOutlined />}>
      Leave a review
    </Button> */}
    <Button
      type="dashed"
      icon={<GithubOutlined />}
      href="https://github.com/EnhancedJax/therealcost"
    >
      View repository
    </Button>
  </Flex>
);

export default Foot;
