"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "konsta/react";
import { useEffect, useState } from "react";
import { WagmiConfig } from "wagmi";

import { wagmiConfig } from "@/lib/wagmi-wc-client";
import { Notification, NotificationProvider } from "@/ui/common";

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
    isMounted(true);
  }, [isMounted]);

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
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });
      OneSignal.Slidedown.promptPush()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((result: any) => {
          alert(`test:ok:${result}`);
          console.log("test:ok:console:", result);
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          alert(`test:error:${error}`);
          console.log("test:error:console:", error);
        });
    });
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.OneSignalDeferred = undefined;
    };
  }, []);

  return mounted ? (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <NotificationProvider>
          <App theme="ios">
            <Notification />
            {children}
          </App>
        </NotificationProvider>
      </WagmiConfig>
    </QueryClientProvider>
  ) : (
    <></>
  );
}
