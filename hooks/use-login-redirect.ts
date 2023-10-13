import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { useProfile } from "@/hooks";

export function useLoginRedirect() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: profile, refetch, isLoading } = useProfile();
  const { isConnected, isConnecting } = useAccount();

  useEffect(() => {
    if (!isConnecting && !isLoading) {
      if (!isConnected || !profile) {
        router.push("/");
      } else {
        setIsLoggedIn(true);
      }
    }
  }, [router, isConnecting, isLoading, isConnected, profile]);

  return { isLoggedIn, refetch };
}
