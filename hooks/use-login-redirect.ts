import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useProfile } from "@/hooks";

export function useLoginRedirect() {
  const router = useRouter();
  const { authenticated } = usePrivy();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: profile, refetch, isLoading } = useProfile();

  useEffect(() => {
    if (!authenticated || !profile) {
      router.push("/");
    } else {
      setIsLoggedIn(true);
    }
  }, [router, authenticated, isLoading, profile]);

  return { isLoggedIn, refetch };
}
