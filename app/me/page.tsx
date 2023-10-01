"use client";

import { Navbar, Page } from "konsta/react";

import { NETWORK } from "@/lib/constants";
import { useDefaultProfile } from "@/lib/lens/v1";
import { Navigation } from "@/ui/layout/navigation";
import { OwnPublications as OwnPublicationsV1 } from "@/ui/v1/own-publications";

export default function Me() {
  const { data: profile } = useDefaultProfile();

  return (
    <Page>
      <Navbar title="Feed" />
      <Navigation activeTab="me" />
      {profile && NETWORK === "mainnet" && (
        <OwnPublicationsV1 profile={profile} />
      )}
    </Page>
  );
}
