"use client";

// eslint-disable-next-line import/named
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "konsta/react";
import { ToastContainer } from "react-toastify";
import { WagmiConfig } from "wagmi";
import { Web3Modal } from "@web3modal/react";

import { config } from "@/lib/wagmi-wc-clients";
import { ConnectKitProvider } from "connectkit";

const queryClient = new QueryClient();

export function Client({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={config}>
          <ConnectKitProvider>
            <App theme="ios">{children}</App>
            {/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
          </ConnectKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}
