import { Readable } from "node:stream";

import { WebIrys } from "@irys/sdk";
import { ConnectedWallet } from "@privy-io/react-auth";
import { polygonMumbai } from "viem/chains";

import { ARWEAVE_GATEWAY, IRYS_NETWORK } from "@/lib/constants";

export const getEthersProvider = async (wallet: ConnectedWallet) => {
  await wallet.switchChain(polygonMumbai.id);
  return await wallet.getEthersProvider();
};

export const upload = async (
  wallet: ConnectedWallet,
  data: string | Buffer | Readable,
  fileType?: string
) => {
  console.log("irys:uploading document");
  const provider = await getEthersProvider(wallet);

  const irys = new WebIrys({
    url: IRYS_NETWORK,
    token: "matic",
    wallet: { name: "ethersv5", provider },
  });

  await irys.ready();

  const metadata = fileType
    ? {
        tags: [{ name: "Content-Type", value: fileType }],
      }
    : {};

  const result = await irys.upload(data, metadata);
  console.log("irys:document uploaded:", result);
  return `${ARWEAVE_GATEWAY}${result.id}`;
};
