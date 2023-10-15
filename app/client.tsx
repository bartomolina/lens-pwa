"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "konsta/react";
import { useEffect, useState } from "react";
import { polygonMumbai } from "viem/chains";

import { APP_URL } from "@/lib/constants";
import { Notification, NotificationProvider } from "@/ui/common";

import { AlchemyAAProvider } from "./alchemy-aa";

const queryClient = new QueryClient();

export function Client({ children }: { children: React.ReactNode }) {
  const [mounted, isMounted] = useState(false);

  useEffect(() => {
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
  }, []);

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
    isMounted(true);
  }, [isMounted]);

  return mounted ? (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
        config={{
          loginMethods: ["sms"],
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
            noPromptOnSignature: true,
          },
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
            logo: `${APP_URL}icons/icon-192x192.png`,
          },
          defaultChain: polygonMumbai,
        }}
      >
        <NotificationProvider>
          <App theme="ios">
            <AlchemyAAProvider>
              <Notification />
              {children}
            </AlchemyAAProvider>
          </App>
        </NotificationProvider>
      </PrivyProvider>
    </QueryClientProvider>
  ) : (
    <></>
  );
}
