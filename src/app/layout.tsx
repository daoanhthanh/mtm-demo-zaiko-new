import type { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { AppContext } from "./app-context";

// import "@refinedev/antd/dist/reset.css";
import "../globals.css";

export const metadata: Metadata = {
  title: "eeeCloud",
  description: "eeeCloud Demo",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <Suspense>
          <AntdRegistry>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <AppContext themeMode={theme?.value}>{children}</AppContext>
            </NextIntlClientProvider>
          </AntdRegistry>
        </Suspense>
      </body>
    </html>
  );
}
