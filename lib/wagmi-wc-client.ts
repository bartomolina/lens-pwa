import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { polygonMumbai } from "wagmi/chains";

import { APP_DESCRIPTION, APP_NAME, APP_URL } from "@/lib/constants";

const defaultChain = polygonMumbai;
// https://github.com/orgs/WalletConnect/discussions/3725
const chains = [defaultChain, defaultChain];
export const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

const metadata = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  url: APP_URL,
  icons: [`${APP_URL}icon-512x512.png`],
};
export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "light",
  defaultChain: defaultChain,
  featuredWalletIds: [
    "138f51c8d00ac7b9ac9d8dc75344d096a7dfe370a568aa167eabc0a21830ed98",
  ],
});
