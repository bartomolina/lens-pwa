import { Readable } from "node:stream";

import { SmartAccountSigner } from "@alchemy/aa-core";
import { WebIrys } from "@irys/sdk";

import { IRYS_NETWORK } from "@/lib/constants";

export const upload = async (
  address: `0x${string}`,
  signer: SmartAccountSigner,
  data: string | Buffer | Readable,
  fileType?: string
) => {
  const client = {};

  // @ts-expect-error injected
  client._signTypedData = async (domain, types, message) => {
    message["Transaction hash"] =
      "0x" + Buffer.from(message["Transaction hash"]).toString("hex");
    const result = await signer.signTypedData({
      domain,
      message,
      types,
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

  await irys.ready();

  const metadata = fileType
    ? {
        tags: [{ name: "Content-Type", value: fileType }],
      }
    : {};
  return await irys.upload(data, metadata);
};
