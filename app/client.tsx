"use client";

// eslint-disable-next-line import/named
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "konsta/react";
import { ToastContainer } from "react-toastify";
import { WagmiConfig } from "wagmi";

import { wagmiConfig } from "@/lib/wagmi-wc-clients";

const queryClient = new QueryClient();

export function Client({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <App theme="ios">{children}</App>
        </WagmiConfig>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}
