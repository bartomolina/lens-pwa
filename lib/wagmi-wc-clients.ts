import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { polygon, polygonMumbai } from "wagmi/chains";

import { NETWORK } from "./constants";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

const metadata = {
  name: "Progressive",
  description: "Progressive Web App",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const defaultChain = NETWORK === "mainnet" ? polygon : polygonMumbai;
const chains = [defaultChain];

export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  defaultChain,
  themeMode: "light",
});
