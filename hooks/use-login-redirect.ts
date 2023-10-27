import { useSession } from "@lens-protocol/react-web";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useLoginRedirect() {
  const router = useRouter();
  const { authenticated, ready, logout } = usePrivy();
  const { wallets } = useWallets();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session, loading } = useSession();

  useEffect(() => {
    if (
      (ready && (!authenticated || wallets.length === 0)) ||
      (!loading && !session?.authenticated)
    ) {
      console.log("hook:loginRedirect:redirecting:session:", session);
      if (authenticated) {
        logout();
      }
      router.push("/");
    } else {
      setIsLoggedIn(true);
    }
  }, [router, ready, authenticated, wallets, loading, session, logout]);

  return { isLoggedIn };
}
