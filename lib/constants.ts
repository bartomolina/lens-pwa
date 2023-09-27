export const APP_NAME = "Lens";
export const APP_DEFAULT_TITLE = "Lens";
export const APP_DESCRIPTION = "This is a Lens PWA built for mobile access";

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK ?? "testnet";

export const LENS_API =
  NETWORK === "mainnet"
    ? "https://api.lens.dev/"
    : "https://api-v2-mumbai.lens.dev/";
