import type { Metadata } from "next";
import SteamMopLandingPage from "@/components/page/SteamMopLandingPage";

export const metadata: Metadata = {
  title: "Черная паровая швабра UNOUN",
  description:
    "Отдельная страница черной паровой швабры UNOUN. Пока повторяет основную карточку и готова к замене фото и контента.",
};

const BLACK_STEAM_MOP_HERO_IMAGES = [
  "/images/black-steam-mop/6.jpg",
  "/images/black-steam-mop/5.jpg",
  "/images/black-steam-mop/13.jpg",
  "/images/black-steam-mop/7.jpg",
];

const BLACK_STEAM_MOP_NAV_TABS = [
  { label: "Описание", href: "#description" },
  { label: "Способы применения", href: "#use-cases" },
  { label: "Аксессуары", href: "#nozzles" },
  { label: "Характеристики", href: "#features" },
  { label: "Инструкция", href: "#instruction" },
];

export default function BlackSteamMopPage() {
  return (
    <SteamMopLandingPage
      showSplash={false}
      showReviews={false}
      heroProps={{
        galleryImages: BLACK_STEAM_MOP_HERO_IMAGES,
        navTabs: BLACK_STEAM_MOP_NAV_TABS,
        title: "Черная паровая швабра UNOUN.",
      }}
    />
  );
}
