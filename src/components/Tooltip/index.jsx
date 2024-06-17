import React, { useEffect, useRef, useState } from "react";
import { Container, Row } from "./styles";

const Tooltip = ({ data, settings }) => {
  const { amount, currency, dimensions, calculated } = data;
  const { x, y, w, h, sX, sY } = dimensions || {};
  const [selfH, setSelfH] = useState(0);
  const [selfW, setSelfW] = useState(0);
  const ref = useRef(null);

  const value = `${currency}${amount}`;

  useEffect(() => {
    if (dimensions) {
      setSelfH(ref.current.clientHeight);
      setSelfW(ref.current.clientWidth);
    }
  }, [dimensions]);

  if (!dimensions) return null;

  const pos = {
    left: x + w / 2 - selfW / 2 < 0 ? x + sX : x + w / 2 - selfW / 2 + sX,
    top: y - h - selfH < 0 ? y + sY + h + 5 : y + sY - selfH - 5,
  };

  return (
    <Container ref={ref} pos={pos} id="currency-tooltip">
      <Row>
        {value} = {calculated} hours
      </Row>
      <Row>
        You work {settings.hoursPerDay} hours a day. So this costs{" "}
        {((calculated / settings.hoursPerDay) * 100).toFixed(0)}% of your time
        in a day of work.
      </Row>
      <Row>
        You work {settings.daysPerWeek} days a week. So this costs{" "}
        {(
          (calculated / settings.hoursPerDay / settings.daysPerWeek) *
          100
        ).toFixed(0)}
        % of your time in a week of work.
      </Row>
    </Container>
  );
};

export default Tooltip;
