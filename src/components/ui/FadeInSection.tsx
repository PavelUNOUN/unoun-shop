"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type FadeInSectionProps = {
  children: React.ReactNode;
  delay?: number;
};

export default function FadeInSection({ children, delay = 0 }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  // once: true — анимация срабатывает только при первом появлении в viewport
  // amount: 0.15 — достаточно чтобы 15% элемента вошло в экран
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
