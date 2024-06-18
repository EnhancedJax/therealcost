import { Flex } from "antd";
import { Box, FBox, TBox } from "./styles";

export default function Cal({ days }) {
  const padDays = 3;
  const calendarDays = Array.from({ length: 35 }, (_, i) =>
    i < padDays ? (
      <TBox index={i} />
    ) : i < days + padDays ? (
      <FBox index={i} />
    ) : i >= 30 + padDays ? (
      <TBox index={i} />
    ) : (
      <Box index={i} />
    )
  );

  //calendar is 5 days tall, 7 days wide

  return (
    <Flex gap="2px" vertical>
      <Flex gap="2px">{calendarDays.slice(0, 7)}</Flex>
      <Flex gap="2px">{calendarDays.slice(7, 14)}</Flex>
      <Flex gap="2px">{calendarDays.slice(14, 21)}</Flex>
      <Flex gap="2px">{calendarDays.slice(21, 28)}</Flex>
      <Flex gap="2px">{calendarDays.slice(28, 35)}</Flex>
    </Flex>
  );
}
