"use client";

import { useSession } from "@lens-protocol/react-web";
import { usePrivy, useWallets } from "@privy-io/react-auth";
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
  const { login, logout, authenticated, ready } = usePrivy();
  const { wallets } = useWallets();
  const { data: session, loading } = useSession();

  const primaryWallet = wallets && wallets[0] ? wallets[0] : undefined;

  useEffect(() => {
    if (
      ready &&
      authenticated &&
      primaryWallet &&
      !loading &&
      session?.authenticated
    ) {
      primaryWallet ? router.push("/explore") : logout();
    }
  }, [router, ready, authenticated, primaryWallet, loading, session, logout]);

  return (
    <Page>
      {(ready && (!authenticated || !primaryWallet)) ||
        (!loading && !session?.authenticated && (
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
            {authenticated && primaryWallet && (
              <Login address={primaryWallet.address} />
            )}
          </>
        ))}
    </Page>
  );
}
