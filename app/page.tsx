"use client";

import { usePrivy } from "@privy-io/react-auth";
import { BlockTitle, List, ListButton, Navbar, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useProfile } from "@/hooks";
import { AddToHomeScreenAndroid } from "@/ui/layout/add-to-home-screen-android";
import { AddToHomeScreeniOS } from "@/ui/layout/add-to-home-screen-ios";
import { Login } from "@/ui/login";

export default function Home() {
  const router = useRouter();
  const { refetch } = useProfile();
  const { login, logout, authenticated } = usePrivy();
  const { data: profile, isLoading } = useProfile();

  useEffect(() => {
    if (!isLoading && profile && authenticated) {
      router.push("/explore");
    }
  }, [router, profile, authenticated, isLoading]);

  return (
    <Page>
      {!isLoading && !profile && (
        <>
          <Navbar title="Login" />
          <AddToHomeScreenAndroid />
          <AddToHomeScreeniOS />
          <BlockTitle>Account</BlockTitle>
          <List strongIos insetIos>
            <ListButton onClick={() => (authenticated ? logout() : login())}>
              {authenticated ? "Disconnect" : "Connect"}
            </ListButton>
          </List>
          {authenticated && <Login refetchProfile={refetch} />}
        </>
      )}
    </Page>
  );
}
