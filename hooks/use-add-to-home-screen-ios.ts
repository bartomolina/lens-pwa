import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { isiOS } from "@/utils/ios";

export function useAddToHomescreeniOSPrompt(): [
  boolean,
  Dispatch<SetStateAction<boolean>>
] {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator.standalone;

    if (isiOS() && !isInStandaloneMode()) {
      setShowPrompt(true);
    }
  }, []);

  return [showPrompt, setShowPrompt];
}
