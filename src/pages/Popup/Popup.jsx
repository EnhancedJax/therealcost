import {
  CalculatorOutlined,
  CodeOutlined,
  GlobalOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Button,
  Collapse,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n, { languages } from "../../utils/i18n";
import { restoreOptions, saveOptions } from "../../utils/storage";
import { Container, ContextHeader, Header } from "./styles";

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

const Popup = () => {
  const version = chrome.runtime.getManifest().version;
  const [form] = Form.useForm();
  const [url, setUrl] = useState("");
  const { t } = useTranslation();
  const [rates, setRates] = useState({});

  useEffect(() => {
    restoreOptions().then((items) => {
      form.setFieldsValue(items);
      setRates(items.rates.data);
    });

    chrome.tabs.query({ active: true }, function (tabs) {
      var currentTab = tabs[0];
      setUrl(currentTab.url);
    });
  }, []);

  return (
    <Container>
      <Header>
        {t("theRealCost")} <ContextHeader>v{version}</ContextHeader>
      </Header>
      <Divider
        plain
        orientation="left"
        orientationMargin={0}
        style={{ color: "gray" }}
      >
        {t("settings.label")}
      </Divider>
      <Form
        form={form}
        requiredMark={"optional"}
        onFinish={(values) => {
          saveOptions(values);
          chrome.runtime.sendMessage({ message: "refresh" });
        }}
        layout="vertical"
        variant="filled"
      >
        <Collapse
          size="small"
          style={{ marginBottom: "20px" }}
          accordion
          defaultActiveKey={1}
          expandIcon={({ isActive }) => (
            <GlobalOutlined rotate={isActive ? 90 : 0} />
          )}
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
        <Collapse
          size="small"
          style={{ marginBottom: "20px" }}
          accordion
          expandIcon={({ isActive }) => (
            <UnorderedListOutlined rotate={isActive ? 90 : 0} />
          )}
          items={[
            {
              key: "3",
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
                            label={
                              index === 0 ? t("settings.blacklist.label") : ""
                            }
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
        <Collapse
          size="small"
          style={{ marginBottom: "20px" }}
          accordion
          expandIcon={({ isActive }) => (
            <CodeOutlined rotate={isActive ? 90 : 0} />
          )}
          items={[
            {
              key: "4",
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
                    tooltip={t(
                      "settings.performance_max_empty_highlights.tooltip"
                    )}
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
                    tooltip={t(
                      "settings.performance_highlight_cooldown.tooltip"
                    )}
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t("settings.save")}
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Popup;
