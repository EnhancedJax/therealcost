import { GlobalOutlined } from "@ant-design/icons";
import { Collapse, Form, InputNumber, Select } from "antd";
import React from "react";
import i18n, { languages } from "../../../utils/i18n";
import { saveOptions } from "../../../utils/storage";

const General = ({ t, rates }) => (
  <Collapse
    size="small"
    style={{ marginBottom: "20px" }}
    accordion
    defaultActiveKey={1}
    expandIcon={({ isActive }) => <GlobalOutlined rotate={isActive ? 90 : 0} />}
    items={[
      {
        key: "1",
        label: t("settings.titles.general"),
        children: (
          <>
            <Form.Item
              label={t("settings.lang.label")}
              name="lang"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Select
                options={Object.keys(languages).map((key) => ({
                  value: key,
                  label: languages[key],
                }))}
                onChange={(value) => {
                  i18n.changeLanguage(value);
                  chrome.runtime.sendMessage({ message: "refresh" });
                  saveOptions({ lang: value });
                }}
              />
            </Form.Item>
            <Form.Item
              label={t("settings.theme.label")}
              tooltip={t("settings.theme.tooltip")}
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
              label={t("settings.currency.label")}
              tooltip={t("settings.currency.tooltip")}
              name="currency"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Select
                options={
                  rates &&
                  Object.keys(rates).map((key) => ({
                    label: key,
                    value: key,
                  }))
                }
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>
            <Form.Item
              label={t("settings.minAmount.label")}
              tooltip={t("settings.minAmount.tooltip")}
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
          </>
        ),
      },
    ]}
  />
);

export default General;
