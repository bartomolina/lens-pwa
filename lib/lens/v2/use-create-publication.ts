// eslint-disable-next-line import/named
import { TextOnlyMetadata } from "@lens-protocol/metadata";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { ARWEAVE_GATEWAY } from "@/lib/constants";
import { upload } from "@/utils/bundlr";

import { createPublication } from "./create-publication";

interface CreatePublicationOptions {
  onSuccess?: () => void;
}

export const useCreatePublication = ({
  onSuccess,
}: CreatePublicationOptions) => {
  const { address } = useAccount();

  return useMutation({
    mutationFn: async (metadata: TextOnlyMetadata) => {
      if (address) {
        const content = await upload(address, JSON.stringify(metadata));
        const contentURI = content ? `${ARWEAVE_GATEWAY}${content.id}` : "";

        // create publication
        const createPublicationresponse = await createPublication({
          contentURI,
        });

        console.log("use create publication:", createPublicationresponse);
      }
    },
    onSuccess,
  });
};
