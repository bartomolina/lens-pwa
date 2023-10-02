"use client";

import { Navbar, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { NETWORK } from "@/lib/constants";
import { useDefaultProfile } from "@/lib/lens/v1";
import { isAuthenticated } from "@/lib/lens/v1/auth";
import { Login as LoginV1 } from "@/ui/v1/login";
import { Login as LoginV2 } from "@/ui/v2/login";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { data: defaultProfile, isFetching } = useDefaultProfile();
  const { isConnected } = useAccount();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (NETWORK === "mainnet" && defaultProfile && isAuthenticated()) {
      router.push("/feed");
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
          <div className="m-4 flex justify-center">
            <w3m-button />
          </div>
          {isConnected && (NETWORK === "mainnet" ? <LoginV1 /> : <LoginV2 />)}
        </>
      )}
    </Page>
  );
}
