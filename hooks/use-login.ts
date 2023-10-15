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
      if (currentProfile) {
        console.log("use login: already logged in");
        return;
      }

      if (user?.wallet?.address) {
        const { id, text } = await lensClient.authentication.generateChallenge({
          for: profileId,
          signedBy: user?.wallet?.address,
        });

        const signature = await signMessage(text);

        await lensClient.authentication.authenticate({ id, signature });

        console.log("use login: logged in", profileId);
      }
    },
    onSuccess,
    onError,
  });
};
