import {
  DollarOutlined,
  EyeInvisibleOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Divider,
  Flex,
  Popover,
  Select,
  Tooltip,
  theme,
} from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ANTTHEME } from "../../constants";
import SmartInfo from "../SmartInfo";
import {
  Container,
  ContentContainer,
  ContextHeader,
  Header,
  PsuedoBox,
} from "./styles";

const Hover = ({ data, settings }) => {
  const { t } = useTranslation();
  const { amount, currency, dimensions, calculated: hours } = data;
  const { hoursPerDay, daysPerWeek } = settings;
  const [openCurrencySelector, setOpenCurrencySelector] = useState(false);

  if (!dimensions) return null;

  /* -------------- Calcs ------------- */
  const rdays = Number(hours / hoursPerDay);
  const days = parseFloat((hours / hoursPerDay).toFixed(2));
  const timeInDays = Number(hours / 24);
  const percentOfDay = ((hours / hoursPerDay) * 100).toFixed(0);
  const percentOfWeek = (rdays / daysPerWeek) * 100;
  const months = parseFloat((rdays / (daysPerWeek * 4)).toFixed(2)); // months needed including only work days
  const percentOfYear = (months / 12) * 100;
  const timeInMonths = parseFloat((timeInDays / 30).toFixed(2)); // months needed by time needed
  const percentOfTimeInYears = (timeInMonths / 12) * 100;
  const years = parseFloat((rdays / (daysPerWeek * 4 * 12)).toFixed(2)); // years needed including only work days
  const timeInYears = (timeInDays / 365).toFixed(2); // years needed by time needed

  const values = {
    hoursPerDay,
    daysPerWeek,

    hours,
    days,
    percentOfDay,
    percentOfWeek,

    months,
    percentOfYear,
    timeInMonths,
    percentOfTimeInYears,
    years,
    timeInYears,
  };

  // console.log(values);

  const originalStr = `${currency}${amount}`;

  const content = (
    <ContentContainer>
      <div>
        <ContextHeader>{t("theRealCostOf", { 1: originalStr })}:</ContextHeader>
        <Header>
          {hours} {t("Hours")}
        </Header>
        <SmartInfo values={values} />
      </div>
      <Divider type="vertical" style={{ height: "auto" }} />
      <Flex vertical gap="small" justify="center">
        <Tooltip title={`${t("tooltips.not")} ${settings.currency}?`}>
          {openCurrencySelector ? (
            <Flex gap="small">
              {" "}
              <Select
                showSearch
                placeholder={settings.currency}
                optionFilterProp="label"
                options={Object.keys(settings.rates.data).map((key) => ({
                  label: key,
                  value: key,
                }))}
                onSelect={(value) =>
                  chrome.runtime.sendMessage({
                    value: value,
                    message: "changeCurrency",
                  })
                }
              />
              <Button
                onClick={() => {
                  chrome.runtime.sendMessage({
                    value: settings.currency,
                    message: "changeCurrency",
                  });
                }}
                icon={<ReloadOutlined />}
              />
            </Flex>
          ) : (
            <Button
              onClick={() => {
                setOpenCurrencySelector(true);
              }}
              icon={<DollarOutlined />}
            />
          )}
        </Tooltip>
        <Tooltip title={t("tooltips.doNotShowOnThisWebsite")}>
          <Button
            onClick={() => {
              chrome.runtime.sendMessage({ message: "addToBlacklist" });
            }}
            icon={<EyeInvisibleOutlined />}
          />
        </Tooltip>
        <Tooltip title={t("tooltips.settings")}>
          <Button
            onClick={() => {
              chrome.runtime.sendMessage({ message: "openOptions" });
            }}
            icon={<SettingOutlined />}
          />
        </Tooltip>
      </Flex>
    </ContentContainer>
  );
  return (
    <ConfigProvider
      theme={{
        algorithm:
          settings.theme === "light"
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
        ...ANTTHEME,
      }}
    >
      <Container id="currency-Hover" d={dimensions}>
        <Popover content={content} id="test">
          <PsuedoBox d={dimensions} id="psuedo-box" />
        </Popover>
      </Container>
    </ConfigProvider>
  );
};

export default Hover;
