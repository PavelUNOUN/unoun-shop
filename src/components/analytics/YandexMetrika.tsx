import Script from "next/script";
import { getSiteUrl } from "@/lib/site";

function getMetrikaId() {
  const value = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim();

  return value ? Number(value) : null;
}

export default function YandexMetrika() {
  const metrikaId = getMetrikaId();

  if (!metrikaId || Number.isNaN(metrikaId)) {
    return null;
  }

  const siteUrl = getSiteUrl();

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) { return; }
            }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${metrikaId}, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            ecommerce: "dataLayer"
          });
        `}
      </Script>
      <noscript>
        <div>
          {/* Yandex Metrika requires a plain tracking pixel inside noscript. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${metrikaId}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
      <Script id="yandex-metrika-site-url" strategy="afterInteractive">
        {`window.__UNOUN_SITE_URL__ = ${JSON.stringify(siteUrl)};`}
      </Script>
    </>
  );
}
