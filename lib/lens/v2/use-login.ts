import { useMutation } from "@tanstack/react-query";
import { useAccount, useWalletClient } from "wagmi";

import { getAuthenticationToken, setAuthenticationToken } from "@/lib/state";

import { authenticate, generateChallenge } from "./auth";

interface LoginOptions {
  onSuccess?: () => void;
}

export const useLogin = ({ onSuccess }: LoginOptions) => {
  const { address: signedBy } = useAccount();
  const { data: walletClient } = useWalletClient();

  return useMutation({
    mutationFn: async (profileId: string) => {
      if (getAuthenticationToken()) {
        console.log("login: already logged in");
        return;
      }

      console.log("login:", profileId);

      // generate challenge
      const challengeResponse = await generateChallenge({
        for: profileId,
        signedBy,
      });

      // sign challenge and authenticate
      const signature = await walletClient?.signMessage({
        message: challengeResponse.text,
      });

      const authenticatedResult = await authenticate({
        id: challengeResponse.id,
        signature,
      });
      setAuthenticationToken(authenticatedResult?.accessToken);

      console.log("use login: logged in");
    },
    onSuccess,
  });
};
