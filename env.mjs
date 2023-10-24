import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PINATA_JWT: z.string(),
  },
  client: {
    NEXT_PUBLIC_PRIVY_APP_ID: z.string().min(1),
    NEXT_PUBLIC_ONESIGNAL_APPID: z.string(),
  },
  runtimeEnv: {
    PINATA_JWT: process.env.PINATA_JWT,
    NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
    NEXT_PUBLIC_ONESIGNAL_APPID: process.env.NEXT_PUBLIC_ONESIGNAL_APPID,
  },
});
