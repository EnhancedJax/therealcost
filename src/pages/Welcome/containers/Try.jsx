import { Skeleton, Space } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { animateTooltip } from "../animations";
import {
  BrowserViewContainer,
  ExtensionImg,
  ExtensionTip,
  LargePrice,
  PulseCircle,
  TryContainer,
  Underline,
} from "../styles";
import SkeletonBrowser from "./SkeletonBrowser";

export default function Try() {
  const [showNewPrice, setShowNewPrice] = useState(false);

  return (
    <TryContainer>
      <div
        style={{
          width: "640px",
          height: "480px",
        }}
      >
        <SkeletonBrowser>
          <BrowserViewContainer>
            <img src="phone.png" width="252px" height="313px" />
            <div style={{ width: "100%" }}>
              <Space>
                <Skeleton.Avatar />
                <Skeleton.Input />
              </Space>
              <LargePrice className="highlighted-money">
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
                      $999
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
                    >
                      XXX Hours
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
                    top: "32px",
                    right: "0px",
                    transform: "translateX(100%)",
                  }}
                >
                  <img src="left.svg" width="112" height="11" />
                  Hover me!
                </ExtensionTip>
              </LargePrice>
              <Skeleton />
            </div>
          </BrowserViewContainer>
          <ExtensionImg src="icon-34.png" width="34px" height="34px" />
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
            Configure your settings here!
          </ExtensionTip>
        </SkeletonBrowser>
      </div>
    </TryContainer>
  );
}
