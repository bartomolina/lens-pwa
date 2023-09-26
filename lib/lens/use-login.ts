import { useMutation } from "@tanstack/react-query";
import { useAccount, useWalletClient } from "wagmi";

import { getAuthenticationToken, setAuthenticationToken } from "@/lib/state";

import { authenticate, generateChallenge } from "./auth";

export const useLogin = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  return useMutation({
    mutationFn: async () => {
      if (getAuthenticationToken()) {
        console.log("login: already logged in");
        return;
      }

      console.log("login:", address);

      // generate challenge
      const challengeResponse = await generateChallenge({ address });

      // sign challenge and authenticate
      const signature = await walletClient?.signMessage({
        message: challengeResponse.text,
      });

      const authenticatedResult = await authenticate({ address, signature });
      setAuthenticationToken(authenticatedResult?.accessToken);

      console.log("login:", authenticatedResult);
    },
  });
};
