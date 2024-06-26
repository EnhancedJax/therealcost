import {
  MinusCircleOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Collapse, Form, Input } from "antd";
import React from "react";

const SiteSpecific = ({ t, url }) => {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 20,
      },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 0,
      },
    },
  };

  return (
    <Collapse
      size="small"
      style={{ marginBottom: "20px" }}
      expandIcon={({ isActive }) => (
        <UnorderedListOutlined rotate={isActive ? 90 : 0} />
      )}
      items={[
        {
          key: "1",
          label: t("settings.titles.siteSpecific"),
          children: (
            <>
              <Form.List name="viewBlacklist">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={
                          index === 0
                            ? t("settings.replace_blacklist.label")
                            : ""
                        }
                        key={field.key}
                        tooltip={t("settings.replace_blacklist.tooltip")}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          noStyle
                          rules={[{ required: true, message: "Required" }]}
                        >
                          <Input
                            placeholder="url"
                            style={{
                              width: "60%",
                            }}
                          />
                        </Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => remove(field.name)}
                          style={{
                            marginLeft: "12px",
                          }}
                          icon={<MinusCircleOutlined />}
                        ></Button>
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add(new URL(url).origin)}
                        icon={<PlusOutlined />}
                      >
                        {t("settings.replace_blacklist.button")}
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.List name="blacklist">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? t("settings.blacklist.label") : ""}
                        key={field.key}
                        tooltip={t("settings.blacklist.tooltip")}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          noStyle
                          rules={[{ required: true, message: "Required" }]}
                        >
                          <Input
                            placeholder="url"
                            style={{
                              width: "60%",
                            }}
                          />
                        </Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => remove(field.name)}
                          style={{
                            marginLeft: "12px",
                          }}
                          icon={<MinusCircleOutlined />}
                        ></Button>
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add(new URL(url).origin)}
                        icon={<PlusOutlined />}
                      >
                        {t("settings.blacklist.button")}
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </>
          ),
        },
      ]}
    />
  );
};

export default SiteSpecific;
