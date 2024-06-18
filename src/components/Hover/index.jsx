import {
  DollarOutlined,
  EyeInvisibleOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Divider, Flex, Popover, Select, Tooltip } from "antd";
import React, { useState } from "react";
import SmartInfo from "../SmartInfo";
import {
  Container,
  ContentContainer,
  ContextHeader,
  Header,
  PsuedoBox,
} from "./styles";

const Hover = ({ data, settings }) => {
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
        <ContextHeader>The real cost of {originalStr}:</ContextHeader>
        <Header>{hours} hours</Header>
        <SmartInfo values={values} />
      </div>
      <Divider type="vertical" style={{ height: "auto" }} />
      <Flex vertical gap="small" justify="center">
        <Tooltip title="Fix site currency">
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
        <Tooltip title="Do not show on this website">
          <Button
            onClick={() => {
              chrome.runtime.sendMessage({ message: "addToBlacklist" });
            }}
            icon={<EyeInvisibleOutlined />}
          />
        </Tooltip>
        <Button
          onClick={() => {
            chrome.runtime.sendMessage({ message: "openOptions" });
          }}
          icon={<SettingOutlined />}
        />
      </Flex>
    </ContentContainer>
  );
  return (
    <Container id="currency-Hover" d={dimensions}>
      <Popover content={content} id="test">
        <PsuedoBox d={dimensions} id="psuedo-box" />
      </Popover>
    </Container>
  );
};

export default Hover;
