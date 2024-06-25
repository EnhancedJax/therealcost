import { InputNumber, Popover, Select } from "antd";
import React, { useEffect, useState } from "react";
import { saveOptions } from "../../../utils/storage";
import { fadeIn, stagger } from "../animations";
import { Arrow, TA, TB, TC } from "../styles";

const defaultValues = {
  currency: "USD",
  hourlyWage: 30,
  hoursPerDay: 8,
  daysPerWeek: 5,
};

export default function Configurator({
  data,
  setData,
  rates,
  handlePageChange,
}) {
  const [section1Complete, setSection1Complete] = useState(false);
  const [section2Complete, setSection2Complete] = useState(false);
  const [section3Complete, setSection3Complete] = useState(false);

  useEffect(() => {
    console.log(data);
    if (data.currency && data.hourlyWage) {
      setSection1Complete(true);
    }
    if (data.hoursPerDay) {
      setSection2Complete(true);
    }
    if (data.daysPerWeek) {
      setSection3Complete(true);
    }
  }, [data]);

  return (
    <TC variants={stagger} initial="hidden" animate="visible">
      {/* Section 1 */}
      <TB variants={fadeIn}>If you earn</TB>
      <Popover
        content={
          <Select
            showSearch
            defaultValue={defaultValues.currency}
            onSelect={(value) => {
              setData({ ...data, currency: value });
            }}
            options={Object.keys(rates).map((key) => ({
              label: key,
              value: key,
            }))}
          />
        }
      >
        <TA
          variants={fadeIn}
          // whileHover={{ scale: [1, 1.15, 1.1] }}
          transition={{ duration: 0.2 }}
          pending={!data.currency}
        >
          {data.currency || defaultValues.currency}
        </TA>
      </Popover>

      <Popover
        content={
          <InputNumber
            defaultValue={defaultValues.hourlyWage}
            min={1}
            max={99999}
            changeOnWheel={true}
            onPressEnter={(e) => {
              setData({ ...data, hourlyWage: e.target.value });
            }}
            onChange={(value) => {
              setData({ ...data, hourlyWage: value });
            }}
          />
        }
      >
        <TA
          variants={fadeIn}
          // whileHover={{ scale: [null, 1.15, 1.1] }}
          transition={{ duration: 0.2 }}
          pending={!data.hourlyWage}
        >
          {data.hourlyWage || defaultValues.hourlyWage}
        </TA>
      </Popover>
      <TB variants={fadeIn}>per hour,</TB>

      {/* Section 2 */}
      {section1Complete && (
        <>
          <TB variants={fadeIn}>work</TB>
          <Popover
            content={
              <InputNumber
                defaultValue={defaultValues.hoursPerDay}
                min={1}
                max={24}
                changeOnWheel={true}
                onPressEnter={(e) => {
                  setData({ ...data, hoursPerDay: e.target.value });
                }}
                onChange={(value) => {
                  setData({ ...data, hoursPerDay: value });
                }}
              />
            }
          >
            <TA
              variants={fadeIn}
              // whileHover={{ scale: [null, 1.15, 1.1] }}
              transition={{ duration: 0.2 }}
              pending={!data.hoursPerDay}
            >
              {(data.hoursPerDay || defaultValues.hoursPerDay) + " hours"}
            </TA>
          </Popover>
          <TB variants={fadeIn}>a day, </TB>
        </>
      )}

      {/* Section 3 */}
      {section2Complete && (
        <>
          <Popover
            content={
              <InputNumber
                defaultValue={defaultValues.daysPerWeek}
                min={4}
                max={6}
                changeOnWheel={true}
                onPressEnter={(e) =>
                  setData({ ...data, daysPerWeek: e.target.value })
                }
                onChange={(value) => {
                  setData({ ...data, daysPerWeek: value });
                }}
              />
            }
          >
            <TA
              variants={fadeIn}
              // whileHover={{ scale: [null, 1.15, 1.1] }}
              transition={{ duration: 0.2 }}
              pending={!data.daysPerWeek}
            >
              {(data.daysPerWeek || defaultValues.daysPerWeek) + " days"}
            </TA>
          </Popover>
          <TB variants={fadeIn}>a week...</TB>
        </>
      )}
      {section3Complete && (
        <Arrow
          variants={fadeIn}
          onClick={() => {
            saveOptions(data);
            handlePageChange();
          }}
        >
          {">>"}
        </Arrow>
      )}
    </TC>
  );
}
