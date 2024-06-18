import {
  DollarOutlined,
  EyeInvisibleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Divider, Flex, Popover, Tooltip } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const [open, setOpen] = useState(true);

  if (!dimensions) return null;

  /* -------------- Calcs ------------- */
  const days = Number((hours / hoursPerDay).toFixed(0));
  const timeInDays = Number(hours / 24);
  const percentOfDay = ((hours / hoursPerDay) * 100).toFixed(0);
  const percentOfWeek = (days / daysPerWeek) * 100;
  const months = (days / (daysPerWeek * 4)).toFixed(2); // months needed including only work days
  const percentOfYear = (months / 12) * 100;
  const timeInMonths = (timeInDays / 30).toFixed(2); // months needed by time needed
  const percentOfTimeInYears = (timeInMonths / 12) * 100;
  const years = (days / (daysPerWeek * 4 * 12)).toFixed(2); // years needed including only work days
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
        <Button
          onClick={() => {
            chrome.runtime.sendMessage("changeCurrency");
          }}
          icon={<DollarOutlined />}
        />
        <Tooltip title="Do not show on this website">
          <Button
            onClick={() => {
              chrome.runtime.sendMessage("addToBlacklist");
            }}
            icon={<EyeInvisibleOutlined />}
          />
        </Tooltip>
        <Button
          onClick={() => {
            chrome.runtime.sendMessage("openOptions");
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
