import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PINATA_JWT: z.string(1),
  },
  client: {
    NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1),
    NEXT_PUBLIC_PRIVY_APP_ID: z.string(),
    NEXT_PUBLIC_ONESIGNAL_APPID: z.string().min(1),
  },
  runtimeEnv: {
    PINATA_JWT: process.env.PINATA_JWT,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
    NEXT_PUBLIC_ONESIGNAL_APPID: process.env.NEXT_PUBLIC_ONESIGNAL_APPID,
  },
});
