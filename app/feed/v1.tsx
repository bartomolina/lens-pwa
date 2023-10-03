"use client";

import { useDefaultProfile } from "@/lib/lens/v1";
import { Feed } from "@/ui/v1/feed";

export function V1() {
  const { data: profile } = useDefaultProfile();

  if (!profile) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  return <Feed profile={profile} />;
}
