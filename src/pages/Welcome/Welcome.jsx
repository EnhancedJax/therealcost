import { GlobalOutlined, MoonOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import i18n, { languages } from "../../utils/i18n";
import { saveOptions } from "../../utils/storage";
import Configurator from "./containers/Configurator";
import Display from "./containers/Display";
import Initial from "./containers/Initial";
import Try from "./containers/Try";
import {
  BlurredOverlay,
  Container,
  FooterContainer,
  FooterText,
  FooterVersion,
  MainContainer,
} from "./styles";

export default function Welcome() {
  const version = chrome.runtime.getManifest().version;
  const [data, setData] = useState({
    currency: "",
    hourlyWage: "",
    hoursPerDay: "",
    daysPerWeek: "",
  });
  const [rates, setRates] = useState({});
  const [settings, setSettings] = useState({});
  const [page, setPage] = useState(3);

  useEffect(() => {
    chrome.runtime.sendMessage({ message: "getNecessaryInfo" });

    chrome.runtime.onMessage.addListener(function (message) {
      setRates(message.rates);
      setSettings(message.settings);
    });
  }, []);

  function handlePageChange() {
    setPage(page + 1);
  }

  return (
    <Container>
      <MainContainer>
        <AnimatePresence mode="wait">
          {page == 0 ? (
            <motion.div
              key="page0"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -500, opacity: 0 }}
              transition={{ duration: 1.2, type: "spring" }}
              style={{ width: "100%" }}
            >
              <Initial handlePageChange={handlePageChange} />
            </motion.div>
          ) : page == 1 ? (
            <motion.div
              key="page1"
              initial={{ y: 500, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, type: "spring" }}
            >
              <Configurator
                data={data}
                setData={setData}
                rates={rates}
                handlePageChange={handlePageChange}
              />
            </motion.div>
          ) : page == 2 ? (
            <motion.div
              key="page2"
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 1.2, type: "spring" }}
            >
              <Display
                data={data}
                rates={rates}
                handlePageChange={handlePageChange}
              />
            </motion.div>
          ) : (
            page == 3 && (
              <motion.div
                key="page3"
                initial={{ y: 500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 1.2, type: "spring" }}
                style={{ width: "100%", height: "100%" }}
              >
                <Try
                  rates={rates}
                  data={data}
                  settings={settings}
                  handlePageChange={handlePageChange}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
        {page == 4 && (
          <BlurredOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <img src="icon-128.png" width="64px" height="64px" />
            Setup complete, enjoy the extension!
          </BlurredOverlay>
        )}
      </MainContainer>

      <FooterContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button type="dashed" icon={<MoonOutlined />} size="small" />
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
          placement="top"
        >
          <Button type="dashed" icon={<GlobalOutlined />} size="small" />
        </Dropdown>
      </FooterContainer>
    </Container>
  );
}

// Bottom presistent selector for langauge
// Page 1: Full screen input for currency selector
// Page 2:
