import { Readable } from "node:stream";

import { WebBundlr } from "@bundlr-network/client";
import { signTypedData } from "@wagmi/core";

// import { defaultChain } from "@/lib/wagmi-wc-client";

export const upload = async (
  address: `0x${string}`,
  data: string | Buffer | Readable,
  fileType?: string
) => {
  // const walletClient = await getWalletClient({
  //   chainId: defaultChain.id,
  // });
  const walletClient = {};

  if (walletClient) {
    const bundlr = new WebBundlr(
      "https://node2.bundlr.network",
      "matic",
      walletClient
    );

    //@ts-expect-error injected
    walletClient._signTypedData = async (domain, types, message) => {
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
      // walletClient.getAddresses().then((a) => a[0]);
      address;

    await bundlr.ready();
    const metadata = fileType
      ? {
          tags: [{ name: "Content-Type", value: fileType }],
        }
      : {};
    const response = await bundlr.upload(data, metadata);

    return response;
  }
};
