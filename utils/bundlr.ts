import { Readable } from "node:stream";

import { WebBundlr } from "@bundlr-network/client";
import { signTypedData } from "@wagmi/core";

// import { defaultChain } from "@/lib/wagmi-wc-client";

export const upload = async (
  address: `0x${string}`,
  data: string | Buffer | Readable,
  fileType?: string
) => {
  const client = {};

  if (client) {
    const bundlr = new WebBundlr(
      "https://node2.bundlr.network",
      "matic",
      client
    );

    //@ts-expect-error injected
    client._signTypedData = async (domain, types, message) => {
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
    client.getSigner = () => client;
    //@ts-expect-error injected
    client.getAddress = async () => address;

    alert("getting ready");
    await bundlr.ready();
    alert("is ready");
    const metadata = fileType
      ? {
          tags: [{ name: "Content-Type", value: fileType }],
        }
      : {};
    const response = await bundlr.upload(data, metadata);

    return response;
  }
};
