import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { restoreOptions, saveOptions } from "../../utils/storage";
import { Container, ContextHeader, Header } from "./styles";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
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
      offset: 4,
    },
  },
};

const Popup = () => {
  const version = chrome.runtime.getManifest().version;
  const [form] = Form.useForm();
  const [url, setUrl] = useState("");

  useEffect(() => {
    restoreOptions().then((items) => {
      form.setFieldsValue(items);
    });

    chrome.tabs.query({ active: true }, function (tabs) {
      var currentTab = tabs[0];
      setUrl(currentTab.url);
    });
  }, []);

  const onSave = (values) => {
    console.log("Received values of form: ", values);
    saveOptions(values);
    chrome.runtime.sendMessage({ message: "refresh" });
  };

  return (
    <Container>
      <Header>
        The Real Cost <ContextHeader>v{version}</ContextHeader>
      </Header>
      <Divider plain orientation="left" />
      <Form
        form={form}
        requiredMark={"optional"}
        onFinish={onSave}
        layout="vertical"
        variant="filled"
      >
        <Form.Item
          label="Replace amount text"
          name="replace"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Theme"
          name="theme"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Select
            options={[
              {
                value: "light",
                label: "Light",
              },
              {
                value: "dark",
                label: "Dark",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Minimum amount to highlight"
          name="minAmount"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <InputNumber addonAfter="$" min={0} />
        </Form.Item>
        <Form.Item
          label="Hourly Wage"
          name="hourlyWage"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <InputNumber addonAfter="$" min={1} />
        </Form.Item>
        <Form.Item
          label="Working hours"
          name="hoursPerDay"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <InputNumber addonAfter="hours" min={1} max={24} />
        </Form.Item>
        <Form.Item
          label="Working days"
          name="daysPerWeek"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Select
            showSearch
            placeholder=""
            optionFilterProp="label"
            options={[
              {
                value: "4",
                label: "4 Days",
              },
              {
                value: "5",
                label: "5 Days",
              },
              {
                value: "6",
                label: "6 Days",
              },
            ]}
          />
        </Form.Item>
        <Form.List name="viewBlacklist">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={
                    index === 0 ? "Don't replace text on these sites:" : ""
                  }
                  key={field.key}
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
                  Add this website to replace blacklist
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
                  label={index === 0 ? "Don't run on these sites:" : ""}
                  key={field.key}
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
                  Add this website to blacklist
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Popup;
