import { Flex, theme } from "antd";
import React from "react";
import { Box } from "./styles";

const { useToken } = theme;

function generateCalendar(days, daysPerWeek) {
  const { token } = useToken();
  const totalDays = 30;
  const skipDays = 6; // Starts on a Saturday
  const calendarSize = 42; // 7x6 grid
  let calendar = new Array(calendarSize)
    .fill(null)
    .map((_, index) => <Box key={index} color={token.colorBorderSecondary} />);

  // Define the positions of holidays in the 30-day calendar
  const holidays = {
    // 1-based index
    4: [1, 2, 3, 8, 9, 10, 15, 16, 17, 22, 23, 24, 29, 30],
    5: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30],
    6: [2, 9, 16, 23, 30],
  };

  // Fill the 30-day calendar with 'H', 'F', or 'U'
  let filledDays = 0;
  for (let i = 0; i < totalDays + skipDays; i++) {
    if (i < skipDays) {
      continue;
    }
    if (holidays[daysPerWeek].includes(i + 1 - skipDays)) {
      // Holidays
      calendar[i] = <Box key={i} color={token.colorBorder} />;
    } else if (filledDays < days) {
      // Filled days
      calendar[i] = <Box key={i} color={token.colorPrimary} />;
      filledDays++;
    } else {
      // Unfilled days
      calendar[i] = <Box key={i} color={token.colorBorder} />;
    }
  }

  return calendar;
}

export default function WorkCal({ days, daysPerWeek }) {
  const calendarDays = generateCalendar(days, daysPerWeek);

  //calendar is 5 days tall, 7 days wide

  return (
    <Flex gap="2px" vertical>
      <Flex gap="2px">{calendarDays.slice(0, 7)}</Flex>
      <Flex gap="2px">{calendarDays.slice(7, 14)}</Flex>
      <Flex gap="2px">{calendarDays.slice(14, 21)}</Flex>
      <Flex gap="2px">{calendarDays.slice(21, 28)}</Flex>
      <Flex gap="2px">{calendarDays.slice(28, 35)}</Flex>
      <Flex gap="2px">{calendarDays.slice(35, 42)}</Flex>
    </Flex>
  );
}
