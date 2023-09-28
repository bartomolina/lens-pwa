import { useMutation } from "@tanstack/react-query";

import { PublicationMetadataV2Input } from "@/graphql/v1/generated/graphql";
import { upload } from "@/lib/bundlr";

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
        const contentURI = await upload(JSON.stringify(metadata));

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
