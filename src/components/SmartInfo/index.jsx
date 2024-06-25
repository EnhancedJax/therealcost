import { Progress } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import WorkCal from "../Workcal";
import { Highlight, SmartInfoText } from "./styles";

export default function SmartInfo({ values }) {
  const {
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
  } = values;
  const { t } = useTranslation();

  const progressProps = {
    showInfo: false,
    size: 15,
  };

  console.log(hours, hoursPerDay);

  if (hoursPerDay > hours) {
    // under a day: display day
    return (
      <>
        <SmartInfoText>
          {t("sInfo.underDay.p", { hoursPerDay })}
          <Highlight>{percentOfDay}%</Highlight>
          {t("sInfo.underDay.s", { hoursPerDay })}
        </SmartInfoText>
        <Progress
          percent={percentOfDay}
          steps={hoursPerDay}
          {...progressProps}
        />
      </>
    );
  } else if (days < daysPerWeek) {
    // under a week: display week
    return (
      <>
        <SmartInfoText>
          {t("sInfo.underMonth.p", { daysPerWeek })}
          <Highlight>
            {days} {t("days")}
          </Highlight>
          {t("sInfo.underMonth.s", { daysPerWeek })}
        </SmartInfoText>
        <Progress
          percent={percentOfWeek}
          steps={daysPerWeek}
          {...progressProps}
        />
      </>
    );
  } else if (days >= daysPerWeek && days < 22) {
    // under a month: display days in month
    return (
      <>
        <SmartInfoText>
          {t("sInfo.underMonth.p", { daysPerWeek })}
          <Highlight>
            {days} {t("days")}
          </Highlight>
          {t("sInfo.underMonth.s", { daysPerWeek })}
        </SmartInfoText>
        <WorkCal days={days} daysPerWeek={daysPerWeek} />
      </>
    );
  } else if (timeInMonths < 1) {
    // total time not over a month, but days exceed calendar work days
    return (
      <>
        <SmartInfoText>
          {t("sInfo.underTimeMonth.p")}
          <Highlight>
            {months} {t("months")}
          </Highlight>
          {t("sInfo.underTimeMonth.s")}
        </SmartInfoText>
        <Progress percent={percentOfYear} steps="12" {...progressProps} />
      </>
    );
  } else {
    // under a year: display long timescale information
    return (
      <>
        <SmartInfoText>
          {t("sInfo.longTimeScale.1")}
          <Highlight>
            {timeInMonths} {t("months")}
          </Highlight>
          {t("sInfo.longTimeScale.2")}
          <Highlight>
            {months} {t("months")}
          </Highlight>
          {t("sInfo.longTimeScale.3")}
        </SmartInfoText>
        {percentOfTimeInYears <= 100 && (
          <Progress
            percent={percentOfTimeInYears}
            steps="12"
            {...progressProps}
          />
        )}
      </>
    );
  }
}
