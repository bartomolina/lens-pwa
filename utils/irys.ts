import { Readable } from "node:stream";

import { WebIrys } from "@irys/sdk";
import { signTypedData } from "@wagmi/core";
import { IRYS_NETWORK } from "@/lib/constants";

export const upload = async (
  address: `0x${string}`,
  data: string | Buffer | Readable,
  fileType?: string
) => {
  const client = {};

  // @ts-expect-error injected
  client._signTypedData = async (domain, types, message) => {
    console.log("test:domain", domain);
    console.log("test:types", types);
    console.log("test:message", message);
    message["Transaction hash"] =
      "0x" + Buffer.from(message["Transaction hash"]).toString("hex");
    const result = await signTypedData({
      domain,
      message,
      types,
      account: irys.address! as `0x${string}`,
      primaryType: "Bundlr",
    });

    return result;
  };
  // @ts-expect-error injected
  client.getAddress = async () => address;
  // @ts-expect-error injected
  client.getSigner = () => client;

  const irys = new WebIrys({
    url: IRYS_NETWORK,
    token: "matic",
    wallet: { name: "ethersv5", provider: client },
  });

  console.log("test:irys1");
  await irys.ready();
  console.log("test:irys2");

  const metadata = fileType
    ? {
        tags: [{ name: "Content-Type", value: fileType }],
      }
    : {};
  return await irys.upload(data, metadata);
};
