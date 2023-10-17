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
      if (!file && content.length === 0) {
        return;
      }

      if (user?.wallet?.address && signer) {
        let metadata;
        if (file) {
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/uploadFile", {
            method: "POST",
            body: formData,
          });

          const resData = await res.json();

          alert(`test:uploading${content}end`);
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

        const res = await fetch("/api/uploadJSON", {
          method: "POST",
          body: formData,
        });

        const resData = await res.json();

        alert(`test:posting`);
        const postResult = await lensClient.publication.postOnMomoka({
          contentURI: `ipfs://${resData.IpfsHash}`,
        });
        alert(`test:done`);

        if ("reason" in postResult && typeof postResult.reason === "string") {
          alert(`test:error${postResult.reason}`);
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
