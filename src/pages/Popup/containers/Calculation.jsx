import { CalculatorOutlined } from "@ant-design/icons";
import { Collapse, Form, InputNumber, Select, Switch } from "antd";
import React from "react";

const Calculation = ({ t }) => (
  <Collapse
    size="small"
    style={{ marginBottom: "20px" }}
    accordion
    expandIcon={({ isActive }) => (
      <CalculatorOutlined rotate={isActive ? 90 : 0} />
    )}
    items={[
      {
        key: "2",
        label: t("settings.titles.calculation"),
        children: (
          <>
            <Form.Item
              label={t("settings.hourlyWage.label")}
              tooltip={t("settings.hourlyWage.tooltip")}
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
              label={t("settings.hoursPerDay.label")}
              tooltip={t("settings.hoursPerDay.tooltip")}
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
              label={t("settings.daysPerWeek.label")}
              tooltip={t("settings.daysPerWeek.tooltip")}
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
            <Form.Item
              label={t("settings.noReplace.label")}
              tooltip={t("settings.noReplace.tooltip")}
              name="noReplace"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Switch />
            </Form.Item>
          </>
        ),
      },
    ]}
  />
);

export default Calculation;
