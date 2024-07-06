import {
  BulbOutlined,
  FileExclamationOutlined,
  GithubOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Flex } from "antd";
import React from "react";

const Foot = ({ t }) => {
  const handleLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Flex gap="small" wrap="wrap">
      <Button
        type="dashed"
        icon={<FileExclamationOutlined />}
        danger
        onClick={() =>
          handleLinkClick("https://github.com/EnhancedJax/therealcost/issues")
        }
      >
        {t("settings.footerButtons.report")}
      </Button>
      <Button
        type="dashed"
        icon={<BulbOutlined />}
        onClick={() =>
          handleLinkClick("https://github.com/EnhancedJax/therealcost/issues")
        }
      >
        {t("settings.footerButtons.suggest")}
      </Button>
      <Button
        type="dashed"
        icon={<StarOutlined />}
        onClick={() =>
          handleLinkClick(
            "https://chromewebstore.google.com/detail/the-real-cost/aigjgdabjgnoelaapnkhlemoemkfajeb"
          )
        }
      >
        Leave a review
      </Button>
      <Button
        type="dashed"
        icon={<GithubOutlined />}
        onClick={() =>
          handleLinkClick("https://github.com/EnhancedJax/therealcost")
        }
      >
        {t("settings.footerButtons.repo")}
      </Button>
    </Flex>
  );
};

export default Foot;
