import {
  development,
  IStorageProvider,
  LensClient,
} from "@lens-protocol/client";

import { JWT_TOKEN } from "@/lib/constants";

class LocalStorageProvider implements IStorageProvider {
  getItem(key: string) {
    return window.localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}

export const logout = () => {
  localStorage.removeItem(JWT_TOKEN);
};

export const lensClient = new LensClient({
  environment: development,
  storage: new LocalStorageProvider(),
});
