import React, { useEffect, useRef, useState } from "react";
import Bar from "../Bar";
import { Container, Row } from "./styles";

const Tooltip = ({ data, settings }) => {
  const { amount, currency, dimensions, calculated } = data;
  const { x, y, w, h, sX, sY } = dimensions || {};
  const [selfH, setSelfH] = useState(0);
  const [selfW, setSelfW] = useState(0);
  const ref = useRef(null);

  const value = `${currency}${amount}`;
  const days = (calculated / settings.hoursPerDay).toFixed(0);
  const percentDay = ((calculated / settings.hoursPerDay) * 100).toFixed(0);

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
      {settings.hoursPerDay > calculated ? (
        <Row>
          Or {percentDay}% of your {settings.hoursPerDay} hour day.
        </Row>
      ) : (
        <Row>
          Or {days} days of your {settings.daysPerWeek} day work week.
        </Row>
      )}
      <Bar percent={percentDay} total={settings.hoursPerDay} />
    </Container>
  );
};

export default Tooltip;
