import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useProfile } from "@/hooks";

export function useLoginRedirect() {
  const router = useRouter();
  const { authenticated } = usePrivy();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: profile, isLoading } = useProfile();

  useEffect(() => {
    console.log(
      "hook:loginRedirect:authenticated:",
      authenticated,
      ":profile:",
      profile
    );
    if (!authenticated || !profile) {
      router.push("/");
    } else {
      setIsLoggedIn(true);
    }
  }, [router, authenticated, isLoading, profile]);

  return { isLoggedIn };
}
