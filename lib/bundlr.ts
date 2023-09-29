import { Readable } from "node:stream";

import { WebBundlr } from "@bundlr-network/client";
import { getWalletClient } from "@wagmi/core";

import { defaultChain } from "./wagmi-wc-clients";

export const upload = async (
  data: string | Buffer | Readable,
  fileType?: string
) => {
  const walletClient = await getWalletClient({
    chainId: defaultChain.id,
  });

  console.log("upload: uploading content");

  if (walletClient) {
    const bundlr = new WebBundlr(
      "https://node2.bundlr.network",
      "matic",
      walletClient
    );

    //@ts-expect-error injected
    walletClient._signTypedData = async (domain, types, message) => {
      alert("signing message");
      message["Transaction hash"] =
        "0x" + Buffer.from(message["Transaction hash"]).toString("hex");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      return await walletClient.signTypedData({
        domain,
        message,
        types,
        account: bundlr.address as `0x${string}`,
        primaryType: "Bundlr",
      });
    };
    //@ts-expect-error injected
    walletClient.getSigner = () => {
      alert("getting signer");
      return walletClient;
    };
    //@ts-expect-error injected
    walletClient.getAddress = async () => {
      alert("getting address");
      return walletClient.getAddresses().then((a) => a[0]);
    };

    await bundlr.ready();
    const metadata = fileType
      ? {
          tags: [{ name: "Content-Type", value: fileType }],
        }
      : {};
    alert("upload: uploading");
    const response = await bundlr.upload(data, metadata);
    alert("upload: uploaded");

    return `https://arweave.net/${response.id}`;
  }
};
