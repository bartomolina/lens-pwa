import { lensClient } from "@/lib/lens-client";
import { CreateProfileWithHandleErrorResultFragment } from "@lens-protocol/client";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

function isCreateProfileWithHandleErrorResultFragment(
  variable: any
): variable is CreateProfileWithHandleErrorResultFragment {
  return "reason" in variable;
}

interface LoginOptions {
  onSuccess?: () => void;
}

export const useCreateProfile = ({ onSuccess }: LoginOptions = {}) => {
  const { address: to }: { address: string | undefined } = useAccount();

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
          throw Error(createProfileResult.reason);
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
  });
};
