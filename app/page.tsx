"use client";

import { Web3Button } from "@web3modal/react";
import { Navbar, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";

import { useLogin } from "@/lib/lens";

export default function Home() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { isFetched } = useWalletClient();
  const { mutate: login } = useLogin({
    onSuccess: () => router.push("/feed"),
  });

  useEffect(() => {
    if (isConnected && isFetched) {
      login();
    }
  }, [isConnected, isFetched, login]);

  return (
    <Page>
      <Navbar title="Login" />
      <div className="mt-40 text-center">
        <Web3Button />
      </div>
    </Page>
  );
}
