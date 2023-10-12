"use client";

import { Navbar, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useProfile } from "@/hooks";
import { Navigation } from "@/ui/layout/navigation";
import { OwnPublications } from "@/ui/own-publications";

export default function Me() {
  const router = useRouter();
  const { isConnected, isConnecting } = useAccount();
  const { data: profile } = useProfile();

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      router.push("/");
    }
  }, [router, isConnecting, isConnected]);

  return (
    <Page>
      {isConnected && (
        <>
          <Navbar title="Me" />
          {profile && <OwnPublications profile={profile} />}
          <Navigation activeTab="me" />
        </>
      )}
    </Page>
  );
}
