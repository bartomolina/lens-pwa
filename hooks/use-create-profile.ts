import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { lensClient } from "@/lib/lens-client";

interface LoginOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateProfile = ({ onSuccess, onError }: LoginOptions = {}) => {
  const { address: to } = useAccount();

  return useMutation({
    mutationFn: async (handle: string) => {
      console.log("use create profile with handle:", handle);

      if (to) {
        const createProfileResult = await lensClient.profile.create({
          handle,
          to,
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

        console.log("use create profile with handle:", createProfileResult);
      }
    },
    onSuccess,
    onError,
  });
};
