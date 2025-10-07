import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import Script from "next/script";
import { AnalyticsProvider } from "@/contexts/analyticsContext";

export const metadata: Metadata = {
  title: "mainHomePage",
  description: "Main Home Page",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>
        <TRPCReactProvider>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
