import { CodeOutlined } from "@ant-design/icons";
import { Collapse, Form, InputNumber } from "antd";
import React from "react";

const Performance = ({ t }) => (
  <Collapse
    size="small"
    style={{ marginBottom: "20px" }}
    expandIcon={({ isActive }) => <CodeOutlined rotate={isActive ? 90 : 0} />}
    items={[
      {
        key: "1",
        label: t("settings.titles.performance"),
        children: (
          <>
            <Form.Item
              label={t("settings.performance_load_delay.label")}
              tooltip={t("settings.performance_load_delay.tooltip")}
              name="performance_load_delay"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              label={t("settings.performance_max_empty_highlights.label")}
              tooltip={t("settings.performance_max_empty_highlights.tooltip")}
              name="performance_max_empty_highlights"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <InputNumber min={3} />
            </Form.Item>
            <Form.Item
              label={t("settings.performance_highlight_cooldown.label")}
              tooltip={t("settings.performance_highlight_cooldown.tooltip")}
              name="performance_highlight_cooldown"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              label={t("settings.performance_stop_threshold.label")}
              tooltip={t("settings.performance_stop_threshold.tooltip")}
              name="performance_stop_threshold"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <InputNumber min={20} />
            </Form.Item>
          </>
        ),
      },
    ]}
  />
);

export default Performance;
