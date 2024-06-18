import { Divider, Form, InputNumber, Select, Switch } from "antd";
import React from "react";
import { Container, ContextHeader, Header } from "./styles";

const Popup = () => {
  const version = chrome.runtime.getManifest().version;

  return (
    <Container>
      <Header>
        The Real Cost <ContextHeader>v{version}</ContextHeader>
      </Header>
      <Divider plain orientation="left" />
      <Form
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 12,
        }}
      >
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
      </Form>
      <Divider plain orientation="left" />
      <Switch />
    </Container>
  );
};

export default Popup;
