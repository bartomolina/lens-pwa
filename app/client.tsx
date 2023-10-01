"use client";

import { ApolloProvider } from "@apollo/client";
// eslint-disable-next-line import/named
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Web3Modal } from "@web3modal/react";
import { App } from "konsta/react";
import { ToastContainer } from "react-toastify";
import { WagmiConfig } from "wagmi";

import { apolloClient } from "@/lib/apollo-client";
import { ethereumClient, projectId, wagmiConfig } from "@/lib/wagmi-wc-clients";

const queryClient = new QueryClient();

export function Client({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apolloClient}>
          <WagmiConfig config={wagmiConfig}>
            <App theme="ios">{children}</App>
            <Web3Modal
              projectId={projectId}
              ethereumClient={ethereumClient}
              themeMode="light"
            />
          </WagmiConfig>
        </ApolloProvider>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}
