"use client";

import { Navbar, Page } from "konsta/react";

import { useLoginRedirect, useProfile } from "@/hooks";
import { Navigation } from "@/ui/layout/navigation";
import { OwnPublications } from "@/ui/own-publications";

export default function Me() {
  const { isLoggedIn } = useLoginRedirect();
  const { data: profile } = useProfile();

  return (
    <Page>
      {isLoggedIn && (
        <>
          <Navbar title="Me" />
          {profile && <OwnPublications profile={profile} />}
          <Navigation activeTab="me" />
        </>
      )}
    </Page>
  );
}
