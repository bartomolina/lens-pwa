"use client";

import { ApolloProvider } from "@apollo/client";
// eslint-disable-next-line import/named
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "konsta/react";
import { ToastContainer } from "react-toastify";
import { WagmiConfig } from "wagmi";

import { apolloClient } from "@/lib/apollo-client";
import { wagmiConfig } from "@/lib/wagmi-wc-client";

const queryClient = new QueryClient();

export function Client({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apolloClient}>
          <WagmiConfig config={wagmiConfig}>
            <App theme="ios">{children}</App>
          </WagmiConfig>
        </ApolloProvider>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}
