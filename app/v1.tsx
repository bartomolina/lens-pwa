"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { isAuthenticated } from "@/lib/lens/v2/auth";
import { Login } from "@/ui/v1/login";

export function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/feed");
    }
  }, [router]);

  return <Login />;
}
