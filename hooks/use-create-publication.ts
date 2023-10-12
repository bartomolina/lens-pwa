import { ImageMetadata, TextOnlyMetadata } from "@lens-protocol/metadata";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { ARWEAVE_GATEWAY } from "@/lib/constants";
import { lensClient } from "@/lib/lens-client";
import { upload } from "@/utils/irys";

interface CreatePublicationOptions {
  onSuccess?: () => void;
}

export const useCreatePublication = ({
  onSuccess,
}: CreatePublicationOptions) => {
  const { address } = useAccount();

  return useMutation({
    mutationFn: async (metadata: TextOnlyMetadata | ImageMetadata) => {
      if (address) {
        const content = await upload(address, JSON.stringify(metadata));
        const contentURI = content ? `${ARWEAVE_GATEWAY}${content.id}` : "";

        const postResult = await lensClient.publication.postOnMomoka({
          contentURI,
        });

        console.log(postResult);

        if ("reason" in postResult && typeof postResult.reason === "string") {
          throw new Error(postResult.reason);
        }

        if ("txId" in postResult && typeof postResult.txId === "string") {
          await lensClient.transaction.waitUntilComplete({
            forTxId: postResult.txId,
          });
        }

        console.log("use create publication:", postResult);
      }
    },
    onSuccess,
  });
};
