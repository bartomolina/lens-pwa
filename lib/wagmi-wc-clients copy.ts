import { EthereumProvider } from "@walletconnect/ethereum-provider";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { NETWORK } from "./constants";

export const defaultChain = NETWORK === "mainnet" ? polygon : polygonMumbai;
const chains = [defaultChain];
export const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

let wcProvider: any;
WalletConnectConnector.prototype.getProvider = async function () {
  if (!wcProvider) {
    wcProvider = await EthereumProvider.init({
      projectId,
      chains: [defaultChain.id],
      showQrModal: true,
      methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData_v4"],
    });
  }

  return wcProvider;
};

export const ethereumClient = new EthereumClient(wagmiConfig, chains);
