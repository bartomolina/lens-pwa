"use client";

import { Page } from "konsta/react";

import { useLoginRedirect, useProfile } from "@/hooks";
import { NavbarWithDebug, Navigation } from "@/ui/layout";
import { OwnPublications } from "@/ui/own-publications";

export default function Me() {
  const { isLoggedIn } = useLoginRedirect();
  const { data: profile } = useProfile();

  return (
    <Page>
      {isLoggedIn && (
        <>
          <NavbarWithDebug title="Me" />
          {profile && <OwnPublications profile={profile} />}
          <Navigation activeTab="me" />
        </>
      )}
    </Page>
  );
}
