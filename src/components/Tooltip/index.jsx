import {
  DollarOutlined,
  EyeInvisibleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Divider, Flex, Popover } from "antd";
import React, { useState } from "react";
import SmartInfo from "../SmartInfo";
import {
  Container,
  ContentContainer,
  ContextHeader,
  Header,
  PsuedoBox,
} from "./styles";

const Tooltip = ({ data, settings, callbacks }) => {
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
        <ContextHeader>The real cost of {originalStr}:</ContextHeader>
        <Header>{hours} hours</Header>
        <SmartInfo values={values} />
      </div>
      <Divider type="vertical" style={{ height: "auto" }} />
      <Flex vertical gap="small" justify="center">
        <Button
          onClick={() => {
            callbacks.log("Hello");
          }}
          icon={<DollarOutlined />}
        />
        <Button
          onClick={() => {
            callbacks.log("Hello");
          }}
          icon={<EyeInvisibleOutlined />}
        />
        <Button
          onClick={() => {
            callbacks.log("Hello");
          }}
          icon={<SettingOutlined />}
        />
      </Flex>
    </ContentContainer>
  );
  return (
    <Container id="currency-tooltip" d={dimensions}>
      <Popover content={content} id="test">
        <PsuedoBox d={dimensions} id="psuedo-box" />
      </Popover>
    </Container>
  );
};

export default Tooltip;
