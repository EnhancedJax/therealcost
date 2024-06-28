import {
  DollarOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  ReloadOutlined,
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
import { ANTTHEME } from "../../utils/constants";
import SmartInfo from "../SmartInfo";
import {
  Container,
  ContentContainer,
  ContextHeader,
  Header,
  PsuedoBox,
} from "./styles";

const Hover = ({ data, settings, siteReplaceBlacklisted, isDemo }) => {
  const { t } = useTranslation();
  const { price, siteCurrency, currency, dimensions, calculated } = data;
  const { hoursPerDay, daysPerWeek } = settings;
  const [openCurrencySelector, setOpenCurrencySelector] = useState(false);

  /* -------------- Calcs ------------- */
  const hours = Number(calculated);
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

  const originalStr = `${currency}${price}`;

  const content = (
    <ContentContainer>
      <Flex gap="0" vertical justify="center">
        <ContextHeader>
          {t("theRealCostOf", { 1: originalStr })}{" "}
          {siteCurrency !== "" ? `(${siteCurrency})` : ""}
        </ContextHeader>
        <Header>
          {hours} {t("cHours")}
        </Header>
        <SmartInfo values={values} />
      </Flex>
      <Divider type="vertical" style={{ height: "auto" }} />
      <Flex vertical gap="small" justify="center">
        <Tooltip
          title={`${t("tooltips.not")} ${
            siteCurrency !== "" ? siteCurrency : settings.currency
          }?`}
          getPopupContainer={() =>
            document.getElementById("therealcost-reactRoot")
          }
        >
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
                if (!isDemo) setOpenCurrencySelector(true);
              }}
              icon={<DollarOutlined />}
            />
          )}
        </Tooltip>
        <Tooltip
          title={t(
            siteReplaceBlacklisted
              ? "tooltips.doReplace"
              : "tooltips.doNotReplace"
          )}
          getPopupContainer={() =>
            document.getElementById("therealcost-reactRoot")
          }
        >
          <Button
            onClick={() => {
              if (!isDemo)
                chrome.runtime.sendMessage({
                  message: siteReplaceBlacklisted
                    ? "removeFromReplaceBlacklist"
                    : "addToReplaceBlacklist",
                });
            }}
            icon={<EyeOutlined />}
            type={siteReplaceBlacklisted ? "primary" : "default"}
          />
        </Tooltip>
        <Tooltip
          title={t("tooltips.doNotRun")}
          getPopupContainer={() =>
            document.getElementById("therealcost-reactRoot")
          }
        >
          <Button
            onClick={() => {
              if (!isDemo)
                chrome.runtime.sendMessage({ message: "addToBlacklist" });
            }}
            icon={<MinusCircleOutlined />}
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
        <Popover
          content={content}
          getPopupContainer={() =>
            document.getElementById("therealcost-reactRoot")
          }
        >
          <PsuedoBox d={dimensions} id="psuedo-box" />
        </Popover>
      </Container>
    </ConfigProvider>
  );
};

export default Hover;
