import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "loginPage",
  description: "Login Page",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
