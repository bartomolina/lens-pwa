"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "konsta/react";
import { WagmiConfig } from "wagmi";

import { wagmiConfig } from "@/lib/wagmi-wc-client";
import { Notification, NotificationProvider } from "@/ui/common";

const queryClient = new QueryClient();

export function Client({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
