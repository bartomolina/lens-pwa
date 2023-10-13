"use client";

import { disconnect } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { BlockTitle, List, ListButton, Navbar, Page } from "konsta/react";
import { useAccount } from "wagmi";

import { useProfile } from "@/hooks";
import { JWT_TOKEN } from "@/lib/constants";
import { Login } from "@/ui/login";

export default function Home() {
  const {
    data: profile,
    isInitialLoading,
    // isFetching,
    // fetchStatus,
    // isFetched,
    // isLoading,
  } = useProfile();
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  // const router = useRouter();

  // useEffect(() => {
  //   if (profile && isConnected && isInitialLoading) {
  //     router.push("/explore");
  //   }
  // }, [router, profile, isConnected, isInitialLoading]);

  return (
    <Page>
      {/* <div>isLoading: {isLoading.toString()}</div>
      <div>isFetching: {isFetching.toString()}</div>
      <div>fetchStatus: {fetchStatus.toString()}</div>
      <div>isFetched: {isFetched.toString()}</div>
      <div>isInitialLoading: {isInitialLoading.toString()}</div>
      <div>isConnected: {isConnected.toString()}</div> */}
      <div>JTW: {localStorage.getItem(JWT_TOKEN)}</div>
      <div>profile: {profile?.id}</div>
      <div>isInitialLoading: {isInitialLoading.toString()}</div>
      <div>isConnected: {isConnected.toString()}</div>
      {false && !isInitialLoading && (!profile || !isConnected) && (
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
      )}
    </Page>
  );
}
