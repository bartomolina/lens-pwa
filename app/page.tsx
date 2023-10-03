"use client";

import { disconnect } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { BlockTitle, List, ListButton, Navbar, Page } from "konsta/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { NETWORK } from "@/lib/constants";
import { clearAuthenticationToken } from "@/lib/state";

import { Home as HomeV1 } from "./v1";
import { Home as HomeV2 } from "./v2";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  return (
    <Page>
      <Navbar title="Login" />
      <BlockTitle>Wallet</BlockTitle>
      <List strongIos insetIos>
        <ListButton onClick={() => open()}>
          {isConnected ? "Account" : "Connect"}
        </ListButton>
        {isConnected && (
          <ListButton
            onClick={() => {
              clearAuthenticationToken();
              disconnect();
            }}
          >
            Disconnect
          </ListButton>
        )}
      </List>
      {isConnected && (NETWORK === "mainnet" ? <HomeV1 /> : <HomeV2 />)}
    </Page>
  );
}
