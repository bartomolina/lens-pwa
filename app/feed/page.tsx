"use client";

import { Navbar, Page } from "konsta/react";

import { NETWORK } from "@/lib/constants";
import { useDefaultProfile } from "@/lib/lens/v1";
import { Navigation } from "@/ui/layout/navigation";
import { Feed as FeedV1 } from "@/ui/v1/feed";
import { Feed as FeedV2 } from "@/ui/v2/feed";

export default function Feed() {
  const { data: profile } = useDefaultProfile();

  return (
    <Page>
      <Navbar title="Feed" />
      {profile &&
        (NETWORK === "mainnet" ? <FeedV1 profile={profile} /> : <FeedV2 />)}
      <Navigation activeTab="feed" />
    </Page>
  );
}
