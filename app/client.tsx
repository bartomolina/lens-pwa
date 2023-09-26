"use client";

// eslint-disable-next-line import/named
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Web3Modal } from "@web3modal/react";
import { ToastContainer } from "react-toastify";
import { polygonMumbai } from "viem/chains";
import { WagmiConfig } from "wagmi";

import { ethereumClient, projectId, wagmiConfig } from "@/lib/wagmi-wc-clients";

const queryClient = new QueryClient();

export function Client({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      </QueryClientProvider>
      <ToastContainer />
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode="light"
        defaultChain={polygonMumbai}
      />
    </>
  );
}
