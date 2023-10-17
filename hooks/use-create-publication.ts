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
      console.log("test:createpublication");
      if (!file && content.length === 0) {
        return;
      }
      console.log("test:creatingpublication");

      if (user?.wallet?.address && signer) {
        console.log("test:creatingpublication1");
        let metadata;
        if (file) {
          console.log("test:creatingpublication2");
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/uploadFile", {
            method: "POST",
            body: formData,
          });

          const resData = await res.json();

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

        const formData = new FormData();
        formData.set("message", JSON.stringify(metadata));

        alert("test:uploading json");
        const res = await fetch("/api/uploadJSON", {
          method: "POST",
          body: formData,
        });
        alert("test:uploaded json");

        const resData = await res.json();

        alert("test:posting");
        const postResult = await lensClient.publication.postOnMomoka({
          contentURI: `ipfs://${resData.IpfsHash}`,
        });
        alert("test:posted");

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
