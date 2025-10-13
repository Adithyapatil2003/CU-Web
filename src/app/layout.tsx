import { type Metadata } from "next";
import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import Script from "next/script";
import { AnalyticsProvider } from "@/contexts/analyticsContext";
import Navbar from "./_components/layouts/NavBar";
import { ThemeProvider } from "@/contexts/themeContext";
import { AuthProvider } from "@/contexts/authContext";

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
          <AnalyticsProvider>
            <ThemeProvider>
              <AuthProvider>
                <Navbar />
                {children}
              </AuthProvider>
            </ThemeProvider>
          </AnalyticsProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
