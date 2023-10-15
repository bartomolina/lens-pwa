import { useWallets } from "@privy-io/react-auth";
import { createContext, useEffect, useState } from "react";

import { AlchemyAAResult, createAlchemyAA } from "@/lib/create-alchemy-aa";

export const AlchemyAAContext = createContext<AlchemyAAResult>({
  signer: undefined,
  provider: undefined,
});

export function AlchemyAAProvider({ children }: { children: React.ReactNode }) {
  const { wallets } = useWallets();
  const [alchemyAA, setAlchemyAA] = useState({
    signer: undefined,
    provider: undefined,
  });

  useEffect(() => {
    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType === "privy"
    );
    if (embeddedWallet) {
      createAlchemyAA(embeddedWallet).then((result) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setAlchemyAA(result);
      });
    }
  }, [wallets]);

  return (
    <AlchemyAAContext.Provider value={alchemyAA}>
      {children}
    </AlchemyAAContext.Provider>
  );
}
