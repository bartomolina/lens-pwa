import { image, MediaImageMimeType, textOnly } from "@lens-protocol/metadata";
import { usePrivy } from "@privy-io/react-auth";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

import { AlchemyAAContext } from "@/app/alchemy-aa";
import { lensClient } from "@/lib/lens-client";

interface CreatePublicationOptions {
  onSuccess?: () => void;
}

export const useCreatePublication = ({
  onSuccess,
}: CreatePublicationOptions) => {
  const { user } = usePrivy();
  const { signer } = useContext(AlchemyAAContext);

  return useMutation({
    mutationFn: async ({ content, file }: { content: string; file?: File }) => {
      console.log("hook:createPublication:start:", content);
      if (!file && content.length === 0) {
        return;
      }

      if (user?.wallet?.address && signer) {
        let metadata;
        if (file) {
          console.log("hook:createPublication:uploading image:", file.name);
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/uploadFile", {
            method: "POST",
            body: formData,
          });

          const resData = await res.json();
          console.log(
            "hook:createPublication:uploading image:result:",
            resData
          );

          metadata = image({
            image: {
              item: `ipfs://${resData.IpfsHash}`,
              type: file.type as MediaImageMimeType,
            },
            content: content.length > 0 ? content : undefined,
          });
        } else {
          metadata = textOnly({
            content,
          });
        }

        // TODO: replace IPFS json upload with Irys once it's AA compatible

        // const metadataFile = await upload(address, JSON.stringify(metadata));

        // if (!metadataFile.id) return;

        // const contentURI = `${ARWEAVE_GATEWAY}${metadataFile.id}`;
        // const postResult = await lensClient.publication.postOnMomoka({
        //   contentURI,
        // });

        console.log("hook:createPublication:uploading metadata:", metadata);
        const formData = new FormData();
        formData.set("message", JSON.stringify(metadata));

        const res = await fetch("/api/uploadJSON", {
          method: "POST",
          body: formData,
        });

        const resData = await res.json();
        console.log(
          "hook:createPublication:uploading metadata:result:",
          resData
        );

        console.log("hook:createPublication:posting to lens:start");
        let postResult;
        try {
          postResult = await lensClient.publication.postOnMomoka({
            contentURI: `ipfs://${resData.IpfsHash}`,
          });
          console.log(
            "hook:createPublication:posting to lens:result:",
            postResult
          );
        } catch (error) {
          console.log("hook:createPublication:posting to lens:error:", error);
          throw error;
        }

        if ("reason" in postResult && typeof postResult.reason === "string") {
          throw new Error(postResult.reason);
        }

        if ("txId" in postResult && typeof postResult.txId === "string") {
          await lensClient.transaction.waitUntilComplete({
            forTxId: postResult.txId,
          });
        }

        console.log("hook:createPublication:result:", postResult);
      }
    },
    onSuccess,
  });
};
