import { GlobalOutlined, MoonOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Dropdown, theme } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { ThemeProvider } from "styled-components";
import { ANTTHEME } from "../../utils/constants";
import { languages } from "../../utils/i18n";
import { saveOptions } from "../../utils/storage";
import Configurator from "./containers/Configurator";
import Display from "./containers/Display";
import Initial from "./containers/Initial";
import Try from "./containers/Try";
import { useAppContext } from "./models/Welcome";
import {
  BlurredOverlay,
  Container,
  FooterContainer,
  FooterText,
  FooterVersion,
  MainContainer,
  darkTheme,
  lightTheme,
} from "./styles";

export default function Welcome() {
  const { setSettings, settings, page, version, t, i18n } = useAppContext();

  return (
    <ThemeProvider theme={settings?.theme === "dark" ? darkTheme : lightTheme}>
      <ConfigProvider
        theme={{
          algorithm:
            settings?.theme === "dark"
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          ...ANTTHEME,
        }}
      >
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
                  <Initial />
                </motion.div>
              ) : page == 1 ? (
                <motion.div
                  key="page1"
                  initial={{ y: 500, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={false}
                  transition={{ duration: 1.2, type: "spring" }}
                >
                  <Configurator />
                </motion.div>
              ) : page == 2 ? (
                <motion.div
                  key="page2"
                  initial={false}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 1.2, type: "spring" }}
                >
                  <Display />
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
                    <Try />
                  </motion.div>
                )
              )}
            </AnimatePresence>
            {page == 4 && (
              <BlurredOverlay
                key="complete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                <img src="icon-128.png" width="64px" height="64px" />
                {t("welcome.complete")}
                <Button
                  shape="round"
                  type="primary"
                  onClick={() => window.close()}
                >
                  {t("welcome.close")}
                </Button>
              </BlurredOverlay>
            )}
          </MainContainer>

          <FooterContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              type="dashed"
              icon={<MoonOutlined />}
              size="small"
              onClick={() => {
                const newTheme = settings?.theme === "dark" ? "light" : "dark";
                setSettings({ ...settings, theme: newTheme });
                saveOptions({ theme: newTheme });
              }}
            />
            <FooterText>
              THE REAL COST <FooterVersion>{version}</FooterVersion>
            </FooterText>

            <Dropdown
              menu={{
                items: Object.keys(languages).map((key) => ({
                  key: key,
                  label: languages[key],
                })),
                onClick: (key) => {
                  i18n.changeLanguage(key.key);
                  saveOptions({ lang: key.key });
                },
              }}
              placement="top"
            >
              <Button type="dashed" icon={<GlobalOutlined />} size="small" />
            </Dropdown>
          </FooterContainer>
        </Container>
      </ConfigProvider>
    </ThemeProvider>
  );
}
