import { useMutation } from "@tanstack/react-query";
import { signMessage } from "@wagmi/core";
import { useAccount } from "wagmi";

import { useProfile } from "@/hooks";
import { lensClient } from "@/lib/lens-client";

interface LoginOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useLogin = ({ onSuccess, onError }: LoginOptions) => {
  const { data: currentProfile } = useProfile();
  const { address: signedBy }: { address: string | undefined } = useAccount();

  return useMutation({
    mutationFn: async (profileId: string) => {
      if (currentProfile) {
        console.log("use login: already logged in");
        return;
      }

      if (signedBy) {
        const { id, text } = await lensClient.authentication.generateChallenge({
          for: profileId,
          signedBy,
        });

        const signature = await signMessage({
          message: text,
        });

        await lensClient.authentication.authenticate({ id, signature });

        console.log("use login: logged in", profileId);
      }
    },
    onSuccess,
    onError,
  });
};
