"use client";

import { useEffect, useState } from "react";

import { getProfileId } from "@/lib/state";
import { OwnPublications } from "@/ui/v2/own-publications";

export function V2() {
  const [profileId, setProfileId] = useState<string | null>();

  useEffect(() => {
    setProfileId(getProfileId());
  }, []);

  return <>{profileId && <OwnPublications profile={profileId} />}</>;
}
