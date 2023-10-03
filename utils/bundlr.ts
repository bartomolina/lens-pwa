import { Readable } from "node:stream";

import { WebBundlr } from "@bundlr-network/client";
import { signTypedData } from "@wagmi/core";
import { BUNDLR_NETWORK } from "@/lib/constants";

export const upload = async (
  address: `0x${string}`,
  data: string | Buffer | Readable,
  fileType?: string
) => {
  const client = {};

  if (client) {
    const bundlr = new WebBundlr(BUNDLR_NETWORK, "matic", client);

    //@ts-expect-error injected
    client._signTypedData = async (domain, types, message) => {
      message["Transaction hash"] =
        "0x" + Buffer.from(message["Transaction hash"]).toString("hex");
      const result = await signTypedData({
        domain,
        message,
        types,
        account: bundlr.address! as `0x${string}`,
        primaryType: "Bundlr",
      });

      return result;
    };
    //@ts-expect-error injected
    client.getAddress = async () => address;
    //@ts-expect-error injected
    client.getSigner = () => client;

    await bundlr.ready();

    const metadata = fileType
      ? {
          tags: [{ name: "Content-Type", value: fileType }],
        }
      : {};
    return await bundlr.upload(data, metadata);
  }
};
