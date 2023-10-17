import { usePrivy } from "@privy-io/react-auth";
import { useMutation } from "@tanstack/react-query";

import { lensClient } from "@/lib/lens-client";

interface LoginOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateProfile = ({ onSuccess, onError }: LoginOptions = {}) => {
  const { user } = usePrivy();

  return useMutation({
    mutationFn: async (handle: string) => {
      console.log("hook:createProfile:start:", handle);

      if (user?.wallet?.address) {
        const createProfileResult = await lensClient.profile.create({
          handle,
          to: user?.wallet?.address,
        });

        if (
          "reason" in createProfileResult &&
          typeof createProfileResult.reason === "string"
        ) {
          throw new Error(createProfileResult.reason);
        }

        if (
          "txId" in createProfileResult &&
          typeof createProfileResult.txId === "string"
        ) {
          await lensClient.transaction.waitUntilComplete({
            forTxId: createProfileResult.txId,
          });
        }

        console.log("hook:createProfile:result:", createProfileResult);
      }
    },
    onSuccess,
    onError,
  });
};
