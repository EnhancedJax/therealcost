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
import React, { useEffect } from "react";
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

  useEffect(() => {
    restoreOptions().then((items) => {
      form.setFieldsValue(items);
    });
  }, []);

  const onSave = (values) => {
    console.log("Received values of form: ", values);
    saveOptions(values);
  };

  return (
    <Container>
      <Header>
        The Real Cost <ContextHeader>v{version}</ContextHeader>
      </Header>
      <Divider plain orientation="left" />
      <Form
        form={form}
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 12,
        }}
        onFinish={onSave}
      >
        <Form.Item label="Replace amount text" name="replace">
          <Switch />
        </Form.Item>
        <Form.Item label="Theme" name="theme">
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
        <Form.Item label="Minimum amount to highlight" name="minAmount">
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
        <Form.List name="blacklist">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Blacklist" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    noStyle
                  >
                    <Input
                      placeholder="url"
                      style={{
                        width: "60%",
                      }}
                    />
                  </Form.Item>
                  {/* {fields.length > 0 ? ( */}
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                  {/* ) : null} */}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "60%",
                  }}
                  icon={<PlusOutlined />}
                >
                  Add blacklist item
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
