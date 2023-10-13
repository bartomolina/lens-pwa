"use client";

import { disconnect } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { BlockTitle, List, ListButton, Navbar, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useProfile } from "@/hooks";
// import { AddToHomeScreen } from "@/ui/layout/add-to-home-screen";
import { Login } from "@/ui/login";

export default function Home() {
  const { data: profile, isLoading } = useProfile();
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const router = useRouter();

  useEffect(() => {
    if (profile && isConnected && !isLoading) {
      router.push("/explore");
    }
  }, [router, profile, isConnected]);

  return (
    <Page>
      {!isLoading && (!profile || !isConnected) ? (
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
                  disconnect();
                }}
              >
                Disconnect
              </ListButton>
            )}
          </List>
          {/* <AddToHomeScreen /> */}
          {isConnected && <Login />}
        </>
      ) : (
        <>
          <div>isLoading: {isLoading.toString()}</div>
          <div>profile: {profile?.id}</div>
          <div>isConnected: {isConnected.toString()}</div>
        </>
      )}
    </Page>
  );
}
