import { Skeleton, Space } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { highlightClass } from "../../../constants";
import injectHoverComponent from "../../../utils/injectHoverComponent";
import { animateTooltip } from "../animations";
import {
  BrowserViewContainer,
  ExtensionImg,
  ExtensionTip,
  LargePrice,
  PulseCircle,
  TipText,
  TryContainer,
  Underline,
} from "../styles";
import SkeletonBrowser from "./SkeletonBrowser";

export default function Try({ t, rates, data, settings, handlePageChange }) {
  const [showNewPrice, setShowNewPrice] = useState(false);

  const originalPrice = (999 * rates[data.currency]).toFixed(0);
  const data_currency = data.currency;
  const data_calculated = (originalPrice / data.hourlyWage).toFixed(2);

  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      injectHoverComponent(settings, "null", true);
    }
  }, [settings]);

  return (
    <TryContainer
      initial={{ paddingRight: 0 }}
      animate={{ paddingRight: 250 }}
      transition={{ delay: 4 }}
    >
      <div
        style={{
          width: "640px",
          height: "480px",
        }}
      >
        <SkeletonBrowser>
          <BrowserViewContainer>
            <div
              style={{
                width: "252px",
                height: "313px",
                padding: "20px",
              }}
            >
              <img
                src="phone.png"
                style={{ objectFit: "contain" }}
                width="100%"
                height="100%"
              />
            </div>
            <div style={{ width: "100%" }}>
              <Space>
                <Skeleton.Avatar />
                <Skeleton.Input />
              </Space>
              <LargePrice>
                <AnimatePresence mode="wait">
                  {!showNewPrice ? (
                    <motion.p
                      key="price"
                      animate={{
                        x: 0,
                        scale: 1,
                        opacity: 1,
                        transformOrigin: "bottom right",
                      }}
                      exit={{ x: 5, scale: 0, opacity: 0 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      {data.currency} {originalPrice}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="hours"
                      initial={{
                        x: -20,
                        scale: 0,
                        opacity: 0,
                        transformOrigin: "bottom left",
                      }}
                      animate={{ x: 0, scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className={highlightClass}
                      data-currency={data_currency}
                      data-site-currency=""
                      data-calculated={data_calculated}
                      data-amount={originalPrice}
                      onHoverEnd={() => {
                        setTimeout(handlePageChange, 8000);
                      }}
                    >
                      {data_calculated} {t("cHours")}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Underline
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.4, delay: 3 }}
                />
                <ExtensionTip
                  variants={animateTooltip}
                  initial="hidden"
                  animate="visible"
                  style={{
                    top: "-32px",
                    right: "0px",
                    transform: "translateX(100%)",
                  }}
                >
                  <img src="left.svg" width="112" height="11" />
                  <TipText>
                    {t("welcome.try.description")}
                    <br />
                    <br />
                    <b>{t("welcome.try.hover")}</b>
                  </TipText>
                </ExtensionTip>
              </LargePrice>
              <Skeleton />
            </div>
          </BrowserViewContainer>
          <ExtensionImg src="icon-128.png" width="32px" height="32px" />
          <PulseCircle
            animate={{
              opacity: [0, 1, 0],
              scale: [50, 1, 40],
              display: "none",
            }}
            transition={{ duration: 2, delay: 1 }}
            onAnimationComplete={() => setShowNewPrice(true)}
          />
          <ExtensionTip
            variants={animateTooltip}
            initial="hidden"
            animate="visible"
            style={{
              top: "16px",
              right: "48px",
              transform: "translate(100%, -100%)",
            }}
          >
            <img src="bottomLeft.svg" width="94" height="34" />
            <TipText>{t("welcome.try.configure")}</TipText>
          </ExtensionTip>
        </SkeletonBrowser>
      </div>
    </TryContainer>
  );
}
