import { InputNumber, Popover, Select } from "antd";
import React, { useEffect, useState } from "react";
import { saveOptions } from "../../../utils/storage";
import { Arrow, TA, TB, TC } from "../styles";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const defaultValues = {
  currency: "USD",
  hourlyRate: 30,
  hoursPerDay: 8,
  daysPerWeek: 5,
};

export default function Configurator({
  data,
  setData,
  rates,
  handlePageChange,
}) {
  const [section1Complete, setSection1Complete] = useState(true);
  const [section2Complete, setSection2Complete] = useState(true);
  const [section3Complete, setSection3Complete] = useState(true);

  useEffect(() => {
    console.log(data);
    if (data.currency && data.hourlyRate) {
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
    <TC variants={containerVariants} initial="hidden" animate="visible">
      {/* Section 1 */}
      <TB variants={itemVariants}>If you earn</TB>
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
          variants={itemVariants}
          whileHover={{ scale: [1, 1.15, 1.1] }}
          transition={{ duration: 0.2 }}
          pending={!data.currency}
        >
          {data.currency || defaultValues.currency}
        </TA>
      </Popover>

      <Popover
        content={
          <InputNumber
            defaultValue={defaultValues.hourlyRate}
            min={1}
            max={99999}
            changeOnWheel={true}
            onPressEnter={(e) => {
              setData({ ...data, hourlyRate: e.target.value });
            }}
            onChange={(value) => {
              setData({ ...data, hourlyRate: value });
            }}
          />
        }
      >
        <TA
          variants={itemVariants}
          whileHover={{ scale: [null, 1.15, 1.1] }}
          transition={{ duration: 0.2 }}
          pending={!data.hourlyRate}
        >
          {data.hourlyRate || defaultValues.hourlyRate}
        </TA>
      </Popover>
      <TB variants={itemVariants}>per hour,</TB>

      {/* Section 2 */}
      {section1Complete && (
        <>
          <TB variants={itemVariants}>work</TB>
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
              variants={itemVariants}
              whileHover={{ scale: [null, 1.15, 1.1] }}
              transition={{ duration: 0.2 }}
              pending={!data.hoursPerDay}
            >
              {(data.hoursPerDay || defaultValues.hoursPerDay) + " hours"}
            </TA>
          </Popover>
          <TB variants={itemVariants}>a day, </TB>
        </>
      )}

      {/* Section 3 */}
      {section2Complete && (
        <>
          <Popover
            content={
              <InputNumber
                defaultValue={defaultValues.daysPerWeek}
                min={1}
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
              variants={itemVariants}
              whileHover={{ scale: [null, 1.15, 1.1] }}
              transition={{ duration: 0.2 }}
              pending={!data.daysPerWeek}
            >
              {(data.daysPerWeek || defaultValues.daysPerWeek) + " days"}
            </TA>
          </Popover>
          <TB variants={itemVariants}>a week...</TB>
        </>
      )}
      {section3Complete && (
        <Arrow
          variants={itemVariants}
          onClick={() => {
            saveOptions(data);
            handlePageChange(1);
          }}
        >
          {">>"}
        </Arrow>
      )}
    </TC>
  );
}
