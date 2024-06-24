import { GlobalOutlined, MoonOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import i18n, { languages } from "../../utils/i18n";
import { saveOptions } from "../../utils/storage";
import Configurator from "./containers/Configurator";
import {
  Container,
  FooterContainer,
  FooterText,
  FooterVersion,
  MainContainer,
} from "./styles";

export default function Welcome() {
  const version = chrome.runtime.getManifest().version;
  const [data, setData] = useState({
    currency: "USD",
    hourlyRate: 30,
    hoursPerDay: 8,
    daysPerWeek: 5,
  });
  const [rates, setRates] = useState({});

  useEffect(() => {
    chrome.runtime.sendMessage({ message: "getNecessaryInfo" });

    chrome.runtime.onMessage.addListener(function (message) {
      setRates(message.rates);
    });
  }, []);

  return (
    <Container>
      <MainContainer>
        <Configurator data={data} setData={setData} rates={rates} />
      </MainContainer>
      {/* <MainContainer>
        <TC small="true">
          <TB small="true">If you earn</TB>
          <TA small="true">$</TA>
          <TA small="true">30</TA>
          <TB small="true">per hour, </TB>
          <TA small="true">80 hours</TA>
          <TB small="true">a day, </TB>
          <TA small="true">5 days</TA>
          <TB small="true">a week...</TB>
        </TC>
        <TB>Your new phone isn't $999, it's 33 hours of your life.</TB>
        <NextContainer></NextContainer>
      </MainContainer> */}
      <FooterContainer>
        <Button type="dashed" icon={<MoonOutlined />} size="large" />
        <FooterText>
          THE REAL COST <FooterVersion>{version}</FooterVersion>
        </FooterText>

        <Dropdown
          menu={{
            items: Object.keys(languages).map((key) => ({
              key: key,
              label: languages[key],
            })),
            onSelect: (key) => {
              i18n.changeLanguage(key);
              saveOptions({ lang: key });
            },
            theme: "dark",
          }}
          placement="topCenter"
        >
          <Button type="dashed" icon={<GlobalOutlined />} size="large" />
        </Dropdown>
      </FooterContainer>
    </Container>
  );
}

// Bottom presistent selector for langauge
// Page 1: Full screen input for currency selector
// Page 2:
