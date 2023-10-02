"use client";

import { disconnect } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { BlockTitle, List, ListButton, Navbar, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { NETWORK } from "@/lib/constants";
import { useDefaultProfile } from "@/lib/lens/v1";
import { isAuthenticated } from "@/lib/lens/v1/auth";
import { clearAuthenticationToken } from "@/lib/state";
import { Login as LoginV1 } from "@/ui/v1/login";
import { Login as LoginV2 } from "@/ui/v2/login";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { data: defaultProfile, isFetching } = useDefaultProfile();
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (NETWORK === "mainnet" && defaultProfile && isAuthenticated()) {
      // router.push("/feed");
    }
  }, [defaultProfile, router]);

  if (!mounted || isFetching) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  return (
    <Page>
      {!isAuthenticated() && (
        <>
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
          {/* {isConnected && (NETWORK === "mainnet" ? <LoginV1 /> : <LoginV2 />)} */}
        </>
      )}
    </Page>
  );
}
