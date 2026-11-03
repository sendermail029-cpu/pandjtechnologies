"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

// true until the app has mounted once: the first page load is server-rendered fully visible (no blank page while
// JS loads, and crawlers see the content); later navigations re-mount this template and ease the new page in
let firstLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const animateIn = !firstLoad;
  useEffect(() => {
    firstLoad = false;
  }, []);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
