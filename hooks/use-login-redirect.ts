import { useSession } from "@lens-protocol/react-web";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useLoginRedirect() {
  const router = useRouter();
  const { authenticated, ready } = usePrivy();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session, loading } = useSession();

  useEffect(() => {
    if (
      (ready && !authenticated) ||
      (!loading && (!session || !session.authenticated))
    ) {
      console.log("hook:loginRedirect:redirecting:session:", session);
      router.push("/");
    } else {
      setIsLoggedIn(true);
    }
  }, [router, ready, authenticated, loading, session]);

  return { isLoggedIn };
}
