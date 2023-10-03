import { useMutation } from "@tanstack/react-query";
import { signMessage } from "@wagmi/core";
import { useAccount } from "wagmi";

import {
  getAuthenticationToken,
  getProfileId,
  setAuthenticationToken,
  setProfileId,
  setRefreshToken,
} from "@/lib/state";

import { authenticate, generateChallenge } from "./auth";

interface LoginOptions {
  onSuccess?: () => void;
}

export const useLogin = ({ onSuccess }: LoginOptions) => {
  const { address: signedBy } = useAccount();

  return useMutation({
    mutationFn: async (profileId: string) => {
      if (getAuthenticationToken() && getProfileId()) {
        console.log("login: already logged in");
        return;
      }

      console.log("login:", profileId);

      const challengeResponse = await generateChallenge({
        for: profileId,
        signedBy,
      });

      const signature = await signMessage({
        message: challengeResponse.text,
      });

      const authenticatedResult = await authenticate({
        id: challengeResponse.id,
        signature,
      });

      setAuthenticationToken(authenticatedResult?.accessToken);
      setRefreshToken(authenticatedResult?.refreshToken);
      setProfileId(profileId);

      console.log("use login: logged in");
    },
    onSuccess,
  });
};
