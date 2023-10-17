import { usePrivy } from "@privy-io/react-auth";
import { useMutation } from "@tanstack/react-query";

import { useProfile } from "@/hooks";
import { lensClient } from "@/lib/lens-client";

interface LoginOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useLogin = ({ onSuccess, onError }: LoginOptions) => {
  const { data: currentProfile } = useProfile();
  const { user, signMessage } = usePrivy();

  return useMutation({
    mutationFn: async (profileId: string) => {
      console.log("hook:login:start:", profileId);
      if (currentProfile) {
        return;
      }

      if (user?.wallet?.address) {
        const { id, text } = await lensClient.authentication.generateChallenge({
          for: profileId,
          signedBy: user?.wallet?.address,
        });

        const signature = await signMessage(text);

        await lensClient.authentication.authenticate({ id, signature });

        console.log("hook:login:result:authenticated");
      }
    },
    onSuccess,
    onError,
  });
};
