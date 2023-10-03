import { useMutation } from "@tanstack/react-query";
import { signMessage } from "@wagmi/core";
import { useAccount } from "wagmi";

import {
  getAuthenticationToken,
  setAuthenticationToken,
  setRefreshToken,
} from "@/lib/state";

import { authenticate, generateChallenge } from "./auth";

interface LoginOptions {
  onSuccess?: () => void;
}

export const useLogin = ({ onSuccess }: LoginOptions) => {
  const { address } = useAccount();

  return useMutation({
    mutationFn: async () => {
      if (getAuthenticationToken()) {
        console.log("login: already logged in");
        return;
      }

      console.log("login:", address);

      const challengeResponse = await generateChallenge({ address });

      const signature = await signMessage({
        message: challengeResponse.text,
      });

      const authenticatedResult = await authenticate({ address, signature });
      setAuthenticationToken(authenticatedResult?.accessToken);
      setRefreshToken(authenticatedResult?.refreshToken);

      console.log("use login: logged in");
    },
    onSuccess,
  });
};
