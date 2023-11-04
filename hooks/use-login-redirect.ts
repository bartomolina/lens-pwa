import { useLogout, useSession } from "@lens-protocol/react-web";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { bindings as privyBindings } from "@/lib/lens-privy-bindings";

export function useLoginRedirect() {
  const router = useRouter();
  const { authenticated, ready, logout, user } = usePrivy();
  const { execute: lensLogout } = useLogout();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session, loading } = useSession();
  const { wallets } = useWallets();

  useEffect(() => {
    if (ready && !loading) {
      if (authenticated && session?.authenticated) {
        setIsLoggedIn(true);
      } else {
        console.log("hook:loginRedirect:redirecting:session:", session);
        router.push("/");
      }
    }
  }, [router, ready, authenticated, loading, session]);

  const ensureWallet = async () => {
    const connectedWallet = wallets.find(
      (wallet) => wallet.address === user?.wallet?.address
    );
    if (!connectedWallet || !privyBindings.set) {
      await logout();
      await lensLogout();
      router.push("/");
    } else {
      return connectedWallet;
    }
  };

  return { isLoggedIn, ensureWallet };
}
