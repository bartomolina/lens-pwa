"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { isAuthenticated } from "@/lib/lens/v2/auth";
import { getProfileId } from "@/lib/state";
import { Login } from "@/ui/v2/login";

export function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated() && getProfileId()) {
      router.push("/feed");
    }
  }, [router]);

  return <Login />;
}
