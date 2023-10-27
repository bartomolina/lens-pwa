"use client";

import { useSession } from "@lens-protocol/react-web";
import { usePrivy } from "@privy-io/react-auth";
import { BlockTitle, List, ListButton, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { env } from "@/env.mjs";
import {
  AddToHomeScreenAndroid,
  AddToHomeScreeniOS,
  NavbarWithDebug,
} from "@/ui/layout";
import { Login } from "@/ui/login";

export default function Home() {
  const router = useRouter();
  const { login, logout, authenticated, ready, user } = usePrivy();
  const { data: session, loading } = useSession();

  useEffect(() => {
    if (ready && authenticated && !loading && session?.authenticated) {
      router.push("/explore");
    }
  }, [router, ready, authenticated, loading, session]);

  return (
    <Page>
      {((ready && !authenticated) || (!loading && !session?.authenticated)) && (
        <>
          <NavbarWithDebug title="Login" />
          {env.NEXT_PUBLIC_ONESIGNAL_APPID &&
            env.NEXT_PUBLIC_ONESIGNAL_APPID.length > 0 && (
              <>
                <AddToHomeScreenAndroid />
                <AddToHomeScreeniOS />
              </>
            )}
          <BlockTitle>Account</BlockTitle>
          <List strong inset>
            <ListButton onClick={() => (authenticated ? logout() : login())}>
              {authenticated ? "Disconnect" : "Connect"}
            </ListButton>
          </List>
          {authenticated && user?.wallet && (
            <Login address={user?.wallet?.address} />
          )}
        </>
      )}
    </Page>
  );
}
