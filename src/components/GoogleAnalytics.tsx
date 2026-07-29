import Script from "next/script";

const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

type GoogleAnalyticsProps = {
  measurementId?: string;
};

/** Googleから発行されたGA4測定IDがある本番環境だけで計測タグを読み込む。 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const normalizedMeasurementId = measurementId?.trim().toUpperCase();

  if (
    !normalizedMeasurementId ||
    !GA_MEASUREMENT_ID_PATTERN.test(normalizedMeasurementId)
  ) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${normalizedMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${normalizedMeasurementId}');
        `}
      </Script>
    </>
  );
}
