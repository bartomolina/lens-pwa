"use client";

import { usePrivy } from "@privy-io/react-auth";
import { BlockTitle, List, ListButton, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useProfile } from "@/hooks";
import {
  AddToHomeScreenAndroid,
  AddToHomeScreeniOS,
  NavbarWithDebug,
} from "@/ui/layout";
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
          <NavbarWithDebug title="Login" />
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
