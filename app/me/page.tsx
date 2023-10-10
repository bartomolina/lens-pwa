"use client";

import { Navbar, Page } from "konsta/react";

import { useProfile } from "@/hooks";
import { Navigation } from "@/ui/layout/navigation";
import { OwnPublications } from "@/ui/own-publications";

export default function Me() {
  const { data: profileId } = useProfile();

  return (
    <Page>
      <Navbar title="Me" />
      {profileId && <OwnPublications profileId={profileId} />}
      <Navigation activeTab="me" />
    </Page>
  );
}
