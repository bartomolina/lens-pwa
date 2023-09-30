"use client";

import { Navbar, Page } from "konsta/react";

import { NETWORK } from "@/lib/constants";
import { Navigation } from "@/ui/layout/navigation";
import { OwnPublications as OwnPublicationsV1 } from "@/ui/v1/own-publications";

export default function Me() {
  return (
    <Page>
      <Navbar title="Feed" />
      <Navigation activeTab="feed" />
      {NETWORK === "mainnet" ? <OwnPublicationsV1 /> : undefined}
    </Page>
  );
}
