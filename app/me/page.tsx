"use client";

import { SessionType, useSession } from "@lens-protocol/react-web";
import { Page } from "konsta/react";

import { useLoginRedirect } from "@/hooks";
import { NavbarWithDebug, Navigation } from "@/ui/layout";
import { OwnPublications } from "@/ui/own-publications";

export default function Me() {
  const { isLoggedIn } = useLoginRedirect();
  const { data: session } = useSession();

  return (
    <Page>
      {isLoggedIn && (
        <>
          <NavbarWithDebug title="Me" />
          {session?.type === SessionType.WithProfile && (
            <OwnPublications profile={session.profile} />
          )}
          <Navigation activeTab="me" />
        </>
      )}
    </Page>
  );
}
