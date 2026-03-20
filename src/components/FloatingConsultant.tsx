"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { reachMetrikaGoal } from "@/lib/analytics";

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
  const consultantUrl = process.env.NEXT_PUBLIC_CONSULTANT_URL?.trim();

  if (pathname.startsWith("/account")) {
    return null;
  }

  const handleClick = () => {
    reachMetrikaGoal("consultant_click", {
      path: pathname,
    });
  };

  const content = (
    <motion.span
      variants={pulseVariants}
      animate="animate"
      aria-hidden="true"
      className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E5FF00] text-zinc-900 shadow-lg transition-[filter] duration-150 hover:brightness-95 active:scale-90"
    >
      <MessageCircle size={24} strokeWidth={1.75} />
    </motion.span>
  );

  return (
    <div className="fixed bottom-28 right-4 z-50 md:bottom-6 md:right-6 lg:right-8">
      {consultantUrl ? (
        <a
          href={consultantUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Открыть чат с консультантом"
          onClick={handleClick}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          aria-label="Открыть чат с консультантом"
          onClick={handleClick}
        >
          {content}
        </button>
      )}
    </div>
  );
}
