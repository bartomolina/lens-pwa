import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useAddToHomescreeniOSPrompt(): [
  boolean,
  Dispatch<SetStateAction<boolean>>
] {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator.standalone;

    if (isIos() && !isInStandaloneMode()) {
      setShowPrompt(true);
    }
  }, []);

  return [showPrompt, setShowPrompt];
}
