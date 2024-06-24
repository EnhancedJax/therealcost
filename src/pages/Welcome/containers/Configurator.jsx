import { InputNumber, Popover, Select } from "antd";
import React from "react";
import { saveOptions } from "../../../utils/storage";
import { Arrow, TA, TB, TC } from "../styles";

export default function Configurator({ data, setData, rates }) {
  return (
    <TC>
      <TB>If you earn</TB>
      <Popover
        content={
          <Select
            showSearch
            defaultValue={data.currency}
            onChange={(value) => setData({ ...data, currency: value })}
            options={Object.keys(rates).map((key) => ({
              label: key,
              value: key,
            }))}
          />
        }
      >
        <TA>{data.currency}</TA>
      </Popover>

      <Popover
        content={
          <InputNumber
            defaultValue={data.hourlyRate}
            min={1}
            max={99999}
            changeOnWheel={true}
            onChange={(value) => setData({ ...data, hourlyRate: value })}
          />
        }
      >
        <TA>{data.hourlyRate}</TA>
      </Popover>
      <TB>per hour, work</TB>

      <Popover
        content={
          <InputNumber
            defaultValue={data.hoursPerDay}
            min={1}
            max={24}
            changeOnWheel={true}
            onChange={(value) => setData({ ...data, hoursPerDay: value })}
          />
        }
      >
        <TA>{data.hoursPerDay} hours</TA>
      </Popover>
      <TB>a day, </TB>
      <Popover
        content={
          <InputNumber
            defaultValue={data.daysPerWeek}
            min={1}
            max={6}
            changeOnWheel={true}
            onChange={(value) => setData({ ...data, daysPerWeek: value })}
          />
        }
      >
        <TA>{data.daysPerWeek} days</TA>
      </Popover>
      <TB>a week...</TB>
      <Arrow
        onClick={() => {
          saveOptions(data);
        }}
      >
        {">>"}
      </Arrow>
    </TC>
  );
}
