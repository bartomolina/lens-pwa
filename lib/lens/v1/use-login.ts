import { useMutation } from "@tanstack/react-query";
import { useAccount, useWalletClient } from "wagmi";

import { getAuthenticationToken, setAuthenticationToken } from "@/lib/state";

import { authenticate, generateChallenge } from "./auth";

interface LoginOptions {
  onSuccess?: () => void;
}

export const useLogin = ({ onSuccess }: LoginOptions) => {
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

      console.log("use login: logged in");
    },
    onSuccess,
  });
};
