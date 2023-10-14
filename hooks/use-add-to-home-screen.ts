import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function useAddToHomescreenPrompt(): [
  IBeforeInstallPromptEvent | undefined,
  () => void,
  boolean,
  Dispatch<SetStateAction<boolean>>
] {
  const [prompt, setPromptEvent] = useState<
    IBeforeInstallPromptEvent | undefined
  >();
  const [showiOSPrompt, setShowiOSPrompt] = useState(false);

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt();
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    );
  };

  useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault();
      setPromptEvent(e);
    };

    window.addEventListener(
      "beforeinstallprompt",
      ready as EventListenerOrEventListenerObject
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        ready as EventListenerOrEventListenerObject
      );
    };
  }, []);

  useEffect(() => {
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator.standalone;

    if (isIos() && !isInStandaloneMode()) {
      setShowiOSPrompt(true);
    }
  }, []);

  return [prompt, promptToInstall, showiOSPrompt, setShowiOSPrompt];
}
