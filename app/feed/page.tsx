"use client";

import { Navbar, Page } from "konsta/react";

import { NETWORK } from "@/lib/constants";
import { Navigation } from "@/ui/layout/navigation";
import { Feed as FeedV1 } from "@/ui/v1/feed";
import { Feed as FeedV2 } from "@/ui/v2/feed";

export default function Feed() {
  return (
    <Page>
      <Navbar title="Feed" />
      <Navigation activeTab="feed" />
      {NETWORK === "mainnet" ? <FeedV1 /> : <FeedV2 />}
    </Page>
  );
}
