import { useMutation } from "@tanstack/react-query";
import { signTypedData } from "@wagmi/core";

import { lensClient } from "@/lib/lens-client";

interface LoginOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateProfileManager = ({
  onSuccess,
  onError,
}: LoginOptions = {}) => {
  return useMutation({
    mutationFn: async (enabled: boolean) => {
      console.log("use update profile manager");

      const updateProfileManagerResult =
        await lensClient.profile.createChangeProfileManagersTypedData({
          approveLensManager: enabled,
        });

      if (
        "reason" in updateProfileManagerResult &&
        typeof updateProfileManagerResult.reason === "string"
      ) {
        throw new Error(updateProfileManagerResult.reason);
      }

      const { id, typedData } = updateProfileManagerResult.unwrap();
      const signature = await signTypedData({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        domain: typedData.domain,
        types: typedData.types,
        message: typedData.value,
        primaryType: "ChangeDelegatedExecutorsConfig",
      });

      const broadcastOnchainResult =
        await lensClient.transaction.broadcastOnchain({
          id,
          signature,
        });

      const onchainRelayResult = broadcastOnchainResult.unwrap();

      if (
        "reason" in onchainRelayResult &&
        typeof onchainRelayResult.reason === "string"
      ) {
        throw new Error(onchainRelayResult.reason);
      }

      if (
        "txHash" in onchainRelayResult &&
        typeof onchainRelayResult.txHash === "string"
      ) {
        await lensClient.transaction.waitUntilComplete({
          forTxHash: onchainRelayResult.txHash,
        });
      }

      console.log("use update profile manager:", onchainRelayResult);
    },
    onSuccess,
    onError,
  });
};
