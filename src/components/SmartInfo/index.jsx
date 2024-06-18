import { Progress } from "antd";
import React from "react";
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

  const progressProps = {
    showInfo: false,
    size: 15,
  };

  if (hoursPerDay > hours) {
    // under a day: display day
    return (
      <>
        <SmartInfoText>
          <Highlight>{percentOfDay}%</Highlight> of your {hoursPerDay} hour day.
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
          <Highlight>{days} days</Highlight> of your {daysPerWeek} day work
          week.
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
          <Highlight>{days} days</Highlight> of your {daysPerWeek} day work
          week.
        </SmartInfoText>
        <WorkCal days={days} daysPerWeek={daysPerWeek} />
      </>
    );
  } else if (timeInMonths < 1) {
    // total time not over a month, but days exceed calendar work days
    return (
      <>
        <SmartInfoText>
          <Highlight>{months} months</Highlight> of your days of work.
        </SmartInfoText>
        <Progress percent={percentOfYear} steps="12" {...progressProps} />
      </>
    );
  } else {
    // under a year: display long timescale information
    return (
      <>
        <SmartInfoText>
          <Highlight>{timeInMonths} months</Highlight> of constant work without
          a break, or <Highlight>{months} months</Highlight> of days of work.
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
