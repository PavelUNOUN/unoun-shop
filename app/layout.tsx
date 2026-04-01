import type { Metadata } from "next";
import { Caveat, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBottomCTA from "@/components/StickyBottomCTA";
import FloatingConsultant from "@/components/FloatingConsultant";
import CookieConsentManager from "@/components/legal/CookieConsentManager";
import { getMetadataBase, SITE_NAME } from "@/lib/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Рукописный шрифт для мягких акцентов в hero и splash
const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: `${SITE_NAME} | Премиальная паровая швабра`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "UNOUN — паровая швабра, аксессуары, онлайн-оплата, личный кабинет и сервисная информация.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} | Премиальная паровая швабра`,
    description:
      "UNOUN — паровая швабра, аксессуары, онлайн-оплата, личный кабинет и сервисная информация.",
    url: "/",
    siteName: SITE_NAME,
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${manrope.variable} ${caveat.variable} font-body antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsentManager />
        <StickyBottomCTA />
        <FloatingConsultant />
      </body>
    </html>
  );
}
