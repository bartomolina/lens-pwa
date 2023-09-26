"use client";

import { Web3Button } from "@web3modal/react";
import { Navbar, Page } from "konsta/react";
import { useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";

import { useLogin, useLogout } from "@/lib/lens";

export default function Home() {
  const { isConnected } = useAccount();
  const { isFetched } = useWalletClient();
  const { mutate: login } = useLogin();
  const { mutate: logout } = useLogout();

  useEffect(() => {
    if (isConnected && isFetched) {
      login();
    }
  }, [isConnected, isFetched, login]);

  return (
    <Page>
      <Navbar title="Login" />
      <div className="mt-40 text-center">
        {isConnected ? (
          <button onClick={() => logout()}>Logout</button>
        ) : (
          <Web3Button />
        )}
      </div>
    </Page>
  );
}
