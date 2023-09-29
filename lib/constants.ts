export const NETWORK = process.env.NEXT_PUBLIC_NETWORK ?? "testnet";

export const APP_NAME = NETWORK === "mainnet" ? "Lens V1" : "Lens";
export const APP_DEFAULT_TITLE = NETWORK === "mainnet" ? "Lens V1" : "Lens";
export const APP_DESCRIPTION = "This is a Lens PWA built for mobile access";
export const APP_URL = "https://lens.pwas.io/";

export const LENS_API =
  NETWORK === "mainnet"
    ? "https://api.lens.dev/"
    : "https://api-v2-mumbai.lens.dev/";
export const LENS_MEDIA_SNAPSHOT_URL =
  "https://ik.imagekit.io/lens/media-snapshot";
export const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
export const ARWEAVE_GATEWAY = "https://arweave.net/";
