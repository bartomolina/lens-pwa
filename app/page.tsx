"use client";

import { Navbar, Page } from "konsta/react";
import { useAccount } from "wagmi";

import { NETWORK } from "@/lib/constants";
import { Login as LoginV1 } from "@/ui/v1/login";
import { Login as LoginV2 } from "@/ui/v2/login";

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <Page>
      <Navbar title="Login" />
      <div className="m-4 flex justify-center">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <w3m-button />
      </div>
      {isConnected ? (
        NETWORK === "mainnet" ? (
          <LoginV1 />
        ) : (
          <LoginV2 />
        )
      ) : undefined}
    </Page>
  );
}
