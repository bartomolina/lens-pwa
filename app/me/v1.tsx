"use client";

import { useDefaultProfile } from "@/lib/lens/v1";
import { OwnPublications } from "@/ui/v1/own-publications";

export function V1() {
  const { data: profile } = useDefaultProfile();

  if (!profile) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  return <OwnPublications profile={profile} />;
}
