"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./ScrollIndicator.module.css";

export function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pointer-events-none"
    >
      <div className={styles["scroll-indicator"]}>
        <span className={styles.wheel}></span>
      </div>
    </motion.div>
  );
}
