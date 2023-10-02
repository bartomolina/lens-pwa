import { Readable } from "node:stream";

import { WebBundlr } from "@bundlr-network/client";
import { getWalletClient, signTypedData } from "@wagmi/core";

import { defaultChain } from "@/lib/wagmi-wc-client";

export const upload = async (
  data: string | Buffer | Readable,
  fileType?: string
) => {
  const walletClient = await getWalletClient({
    chainId: defaultChain.id,
  });

  if (walletClient) {
    alert("walletClient");
    const bundlr = new WebBundlr(
      "https://node2.bundlr.network",
      "matic",
      walletClient
    );

    //@ts-expect-error injected
    walletClient._signTypedData = async (domain, types, message) => {
      alert("signing");
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

    alert("getting ready");
    await bundlr.ready();
    alert("ready");
    const metadata = fileType
      ? {
          tags: [{ name: "Content-Type", value: fileType }],
        }
      : {};
    const response = await bundlr.upload(data, metadata);

    return response;
  }
};
