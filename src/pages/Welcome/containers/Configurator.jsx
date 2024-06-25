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
  t,
  data,
  setData,
  rates,
  handlePageChange,
}) {
  const [section1Complete, setSection1Complete] = useState(false);
  const [section2Complete, setSection2Complete] = useState(false);
  const [section3Complete, setSection3Complete] = useState(false);

  useEffect(() => {
    if (data?.currency && data?.hourlyWage) {
      setSection1Complete(true);
    }
    if (data?.hoursPerDay) {
      setSection2Complete(true);
    }
    if (data?.daysPerWeek) {
      setSection3Complete(true);
    }
  }, [data]);

  return (
    <TC variants={stagger} initial="hidden" animate="visible">
      {/* Section 1 */}
      <TB variants={fadeIn}>{t("welcome.configurator.1")}</TB>
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
          transition={{ duration: 0.2 }}
          pending={!data.currency}
        >
          {data.currency || defaultValues.currency}
        </TA>
      </Popover>

      <Popover
        content={
          <InputNumber
            defaultValue=""
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
      <TB variants={fadeIn}>{t("welcome.configurator.2")}</TB>

      {/* Section 2 */}
      {section1Complete && (
        <>
          <TB variants={fadeIn}>{t("welcome.configurator.3")}</TB>
          <Popover
            content={
              <InputNumber
                defaultValue=""
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
              {(data.hoursPerDay || defaultValues.hoursPerDay) + t("hours")}
            </TA>
          </Popover>
          <TB variants={fadeIn}>{t("welcome.configurator.4")}</TB>
        </>
      )}

      {/* Section 3 */}
      {section2Complete && (
        <>
          <Popover
            content={
              <InputNumber
                defaultValue=""
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
              {(data.daysPerWeek || defaultValues.daysPerWeek) + t("days")}
            </TA>
          </Popover>
          <TB variants={fadeIn}>{t("welcome.configurator.5")}</TB>
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
