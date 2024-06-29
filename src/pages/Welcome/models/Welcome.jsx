import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../utils/i18n";

const AppContext = createContext();

function useAppContext() {
  return useContext(AppContext);
}

function AppProvider({ children }) {
  const { t, i18n } = useTranslation();
  const version = chrome.runtime.getManifest().version;
  const [data, setData] = useState({
    currency: "",
    hourlyWage: "",
    hoursPerDay: "",
    daysPerWeek: "",
  });
  const [rates, setRates] = useState({});
  const [settings, setSettings] = useState({});
  const [page, setPage] = useState(0);

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

  const value = {
    t,
    i18n,
    version,
    data,
    setData,
    rates,
    settings,
    setSettings,
    page,
    setPage,
    handlePageChange,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, useAppContext };
