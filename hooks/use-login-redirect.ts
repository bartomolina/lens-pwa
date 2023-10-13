import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { useProfile } from "@/hooks";

export function useLoginRedirect() {
  const router = useRouter();
  const { data: profile, isInitialLoading } = useProfile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isConnected, isConnecting } = useAccount();

  useEffect(() => {
    if (!isConnecting && !isInitialLoading) {
      if (!isConnected || !profile) {
        router.push("/");
      } else {
        setIsLoggedIn(true);
      }
    }
  }, [router, isConnecting, isInitialLoading, isConnected, profile]);

  return isLoggedIn;
}
