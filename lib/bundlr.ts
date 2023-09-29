import { Readable } from "node:stream";

import { WebBundlr } from "@bundlr-network/client";
import { getWalletClient, type WalletClient } from "@wagmi/core";
import { providers } from "ethers";

import { defaultChain } from "./wagmi-wc-clients";

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

export const upload = async (
  data: string | Buffer | Readable,
  fileType?: string
) => {
  const client = await getWalletClient({
    chainId: defaultChain.id,
  });
  alert(`upload chain id: ${client?.chain.id}`);
  console.log("upload client:", client);

  console.log("upload: uploading content");

  if (client) {
    const signer = walletClientToSigner(client);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    client.getSigner = () => signer;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    client.getAddress = async () => client.getAddresses().then((a) => a[0]);

    const bundlr = new WebBundlr(
      "https://node2.bundlr.network",
      "matic",
      client
    );
    await bundlr.ready();
    const metadata = fileType
      ? {
          tags: [{ name: "Content-Type", value: fileType }],
        }
      : {};
    const response = await bundlr.upload(data, metadata);

    return `https://arweave.net/${response.id}`;
  }
};
