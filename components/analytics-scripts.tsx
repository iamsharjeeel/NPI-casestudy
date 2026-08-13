"use client";

import Script from "next/script";
import { useEffect } from "react";
import { captureAttribution, track } from "@/lib/analytics";
import { ANALYTICS_IDS } from "@/lib/site";

export function AnalyticsScripts() {
  const { ga4, googleAds, metaPixel, gtm } = ANALYTICS_IDS;
  const gtagId = ga4 || googleAds;

  useEffect(() => {
    captureAttribution();
    track("case_view");
  }, []);

  return (
    <>
      {gtm ? (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':Date.now(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
        </Script>
      ) : null}
      {gtagId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());
${ga4 ? `gtag('config','${ga4}',{anonymize_ip:true,allow_enhanced_conversions:true});` : ""}
${googleAds ? `gtag('config','${googleAds}');` : ""}`}
          </Script>
        </>
      ) : null}
      {metaPixel ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixel}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
