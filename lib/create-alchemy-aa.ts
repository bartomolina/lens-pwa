import {
  getDefaultLightAccountFactory,
  LightSmartContractAccount,
} from "@alchemy/aa-accounts";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { SmartAccountSigner, WalletClientSigner } from "@alchemy/aa-core";
import { ConnectedWallet } from "@privy-io/react-auth";
import { createWalletClient, custom } from "viem";
import { polygonMumbai } from "viem/chains";

import { env } from "@/env.mjs";

export type AlchemyAAResult = {
  signer: SmartAccountSigner | undefined;
  provider: AlchemyProvider | undefined;
};

export const createAlchemyAA = async (
  wallet: ConnectedWallet
): Promise<AlchemyAAResult | undefined> => {
  const eip1193provider = await wallet.getEthereumProvider();

  const privyClient = createWalletClient({
    account: wallet.address as `0x${string}`,
    chain: polygonMumbai,
    transport: custom(eip1193provider),
  });

  if (process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
    const privySigner: SmartAccountSigner = new WalletClientSigner(
      privyClient,
      "json-rpc"
    );

    const provider = new AlchemyProvider({
      apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      chain: polygonMumbai,
      entryPointAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    }).connect(
      (rpcClient) =>
        new LightSmartContractAccount({
          entryPointAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
          chain: rpcClient.chain,
          owner: privySigner,
          factoryAddress: getDefaultLightAccountFactory(polygonMumbai),
          rpcClient,
        })
    );

    return { signer: privySigner, provider };
  }

  return { signer: undefined, provider: undefined };
};
