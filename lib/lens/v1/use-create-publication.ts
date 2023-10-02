import { useMutation } from "@tanstack/react-query";

import { PublicationMetadataV2Input } from "@/graphql/v1/generated/graphql";
import { ARWEAVE_GATEWAY } from "@/lib/constants";
import { upload } from "@/utils/bundlr";

import { createPublication } from "./create-publication";
import { useDefaultProfile } from "./use-default-profile";

interface CreatePublicationOptions {
  onSuccess?: () => void;
}

export const useCreatePublication = ({
  onSuccess,
}: CreatePublicationOptions) => {
  const { data: defaultProfile } = useDefaultProfile();
  return useMutation({
    mutationFn: async (metadata: PublicationMetadataV2Input) => {
      if (defaultProfile) {
        const content = await upload(JSON.stringify(metadata));
        const contentURI = content ? `${ARWEAVE_GATEWAY}${content.id}` : "";

        // create publication
        const createPublicationresponse = await createPublication({
          from: defaultProfile.id,
          contentURI,
        });

        console.log("use create publication:", createPublicationresponse);
      }
    },
    onSuccess,
  });
};
