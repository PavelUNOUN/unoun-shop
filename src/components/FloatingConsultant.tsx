"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

// Анимация пульса: кнопка плавно масштабируется и возвращается обратно
const pulseVariants = {
  animate: {
    scale: [1, 1.08, 1],
    transition: {
      duration: 2.4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function FloatingConsultant() {
  const pathname = usePathname();

  if (pathname.startsWith("/account")) {
    return null;
  }

  return (
    // bottom-20 — чтобы не перекрываться со StickyBottomCTA (≈80px высота панели)
    <div className="fixed bottom-20 right-4 z-50">
      <motion.button
        variants={pulseVariants}
        animate="animate"
        aria-label="Открыть чат с консультантом"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#E5FF00] text-zinc-900 shadow-lg hover:brightness-95 active:scale-90 transition-[filter] duration-150"
      >
        <MessageCircle size={24} strokeWidth={1.75} />
      </motion.button>
    </div>
  );
}
