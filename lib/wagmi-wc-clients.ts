import { WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";
import { polygon, polygonMumbai } from "wagmi/chains";
import { NETWORK } from "./constants";
import { APP_DESCRIPTION, APP_NAME } from "./constants";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID || "";
const walletConnectProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

export const defaultChain = NETWORK === "mainnet" ? polygon : polygonMumbai;

export const config = createConfig(
  getDefaultConfig({
    alchemyId,
    walletConnectProjectId,
    chains: [defaultChain],
    appName: APP_NAME,
    appDescription: APP_DESCRIPTION,
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png",
  })
);
