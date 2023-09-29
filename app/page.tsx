"use client";

import { Web3Button } from "@web3modal/react";
import { ConnectKitButton } from "connectkit";
import { Navbar, Page } from "konsta/react";
import { useAccount } from "wagmi";

import { NETWORK } from "@/lib/constants";
import { Login as LoginV1 } from "@/ui/v1/login";
import { Login as LoginV2 } from "@/ui/v2/login";
import { WalletTest } from "@/ui/wallet-test";

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <Page>
      <Navbar title="Login" />
      <div className="m-4 flex justify-center">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {/* <Web3Button /> */}
        <ConnectKitButton />
      </div>
      {isConnected ? (
        NETWORK === "mainnet" ? (
          <LoginV1 />
        ) : (
          // <WalletTest />
          <LoginV2 />
        )
      ) : undefined}
    </Page>
  );
}
