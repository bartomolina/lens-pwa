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
    if (process.env.NEXT_PUBLIC_PUSHER_INSTANCEID) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const beamsClient = new PusherPushNotifications.Client({
        instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCEID,
      });

      beamsClient
        .start()
        .then(() => beamsClient.addDeviceInterest("hello"))
        .then(() => console.log("Successfully registered and subscribed!"))
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    isMounted(true);
  }, [isMounted]);

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
