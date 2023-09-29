import { Readable } from "node:stream";

import { WebBundlr } from "@bundlr-network/client";
import { getWalletClient, signMessage, signTypedData } from "@wagmi/core";

import { defaultChain } from "../lib/wagmi-wc-clients";
import { ARWEAVE_GATEWAY } from "@/lib/constants";

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
      alert("signing message wagmi 3");
      console.log("message:", message);

      // signMessage
      // const txHash = (message["Transaction hash"] =
      //   "0x" + Buffer.from(message["Transaction hash"]).toString("hex"));
      // // console.log(await signMessage({ message: txHash }));
      // return await signMessage({ message: txHash });

      // signTyedData
      message["Transaction hash"] =
        "0x" + Buffer.from(message["Transaction hash"]).toString("hex");
      return await signTypedData({
        domain,
        message,
        types,
        account: bundlr.address! as `0x${string}`,
        primaryType: "Bundlr",
      });
    };
    //@ts-expect-error injected
    walletClient.getSigner = () => walletClient;
    //@ts-expect-error injected
    walletClient.getAddress = async () =>
      walletClient.getAddresses().then((a) => a[0]);

    await bundlr.ready();
    const metadata = fileType
      ? {
          tags: [{ name: "Content-Type", value: fileType }],
        }
      : {};
    alert("upload: uploading");
    const response = await bundlr.upload(data, metadata);
    alert("upload: uploaded");

    return `${ARWEAVE_GATEWAY}${response.id}`;
  }
};
