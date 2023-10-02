import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { polygon, polygonMumbai } from "wagmi/chains";

import { APP_DESCRIPTION, APP_NAME, APP_URL, NETWORK } from "./constants";

export const defaultChain = NETWORK === "mainnet" ? polygon : polygonMumbai;
const chains = [defaultChain, defaultChain];
export const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

const metadata = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  url: APP_URL,
  icons: [`${APP_URL}icon-512x512.png`],
};
export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains, themeMode: "light" });
