"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "konsta/react";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { polygonMumbai } from "viem/chains";

import { APP_URL } from "@/lib/constants";
import { Notification, NotificationProvider } from "@/ui/common";
import { isiOS } from "@/utils/ios";

import { AlchemyAAProvider } from "@/app/alchemy-aa";

const queryClient = new QueryClient();

export function Client({ children }: { children: React.ReactNode }) {
  const [mounted, isMounted] = useState(false);
  const [theme, setTheme] = useState<"material" | "ios">("material");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    OneSignalDeferred.push(function (OneSignal) {
      OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNAL_APPID,
        safari_web_id:
          "web.onesignal.auto.5a2165c8-9d94-4308-bfd9-99a8484077b6",
      });
      OneSignal.Slidedown.promptPush();
    });
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.OneSignalDeferred = undefined;
    };
  }, []);

  useEffect(() => {
    if (isiOS()) {
      document.addEventListener(
        "touchmove",
        function (event) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (event.scale !== 1) {
            event.preventDefault();
          }
        },
        { passive: false }
      );
    }
  }, []);

  useEffect(() => {
    isMounted(true);
    if (isiOS()) {
      setTheme("ios");
    }
  }, [isMounted]);

  return mounted ? (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
        config={{
          loginMethods: ["wallet", "email"],
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
            noPromptOnSignature: true,
          },
          appearance: {
            theme: "light",
            logo: `${APP_URL}icons/icon-192x192.png`,
          },
          defaultChain: polygonMumbai,
        }}
      >
        <NotificationProvider>
          <App theme={theme}>
            <AlchemyAAProvider>
              <ThemeProvider attribute="class" enableSystem={false}>
                <Notification />
                {children}
              </ThemeProvider>
            </AlchemyAAProvider>
          </App>
        </NotificationProvider>
      </PrivyProvider>
    </QueryClientProvider>
  ) : (
    <></>
  );
}
