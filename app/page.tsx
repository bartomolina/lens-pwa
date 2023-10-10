"use client";

import { disconnect } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { BlockTitle, List, ListButton, Navbar, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useProfile } from "@/hooks";
import { Login } from "@/ui/login";

export default function Home() {
  const { data: profileId, isLoading, isFetching } = useProfile();
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const router = useRouter();

  useEffect(() => {
    if (profileId && !isFetching) {
      router.push("/explore");
    }
  }, [router, profileId, isFetching]);

  return (
    !isLoading && (
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
                disconnect();
              }}
            >
              Disconnect
            </ListButton>
          )}
        </List>
        {isConnected && <Login />}
      </Page>
    )
  );
}
