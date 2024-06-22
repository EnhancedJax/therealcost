import { Divider, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { restoreOptions, saveOptions } from "../../utils/storage";
import Calculation from "./containers/Calculation";
import Foot from "./containers/Foot";
import General from "./containers/General";
import Head from "./containers/Head";
import Performance from "./containers/Performance";
import SiteSpecific from "./containers/SiteSpecific";
import { Container } from "./styles";

const Popup = () => {
  const [form] = Form.useForm();
  const [url, setUrl] = useState("");
  const { t } = useTranslation();
  const [rates, setRates] = useState({});

  useEffect(() => {
    restoreOptions().then((items) => {
      form.setFieldsValue(items);
      setRates(items.rates.data);
    });

    chrome.tabs.query({ active: true }, function (tabs) {
      var currentTab = tabs[0];
      setUrl(currentTab.url);
    });
  }, []);

  return (
    <Container>
      <Form
        form={form}
        requiredMark={"optional"}
        onFinish={(values) => {
          saveOptions(values);
          chrome.runtime.sendMessage({ message: "refresh" });
        }}
        layout="vertical"
        variant="filled"
      >
        <Head t={t} />
        <Divider
          plain
          orientation="left"
          orientationMargin={0}
          style={{ color: "gray" }}
        >
          {t("settings.label")}
        </Divider>
        <General t={t} rates={rates} />
        <Calculation t={t} />
        <SiteSpecific t={t} url={url} />
        <Performance t={t} />
        <Divider />
        <Foot t={t} />
      </Form>
    </Container>
  );
};

export default Popup;
