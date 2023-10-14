import { useEffect, useState } from "react";

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function useAddToHomescreenAndroidPrompt(): [
  IBeforeInstallPromptEvent | undefined,
  () => void
] {
  const [prompt, setPromptEvent] = useState<
    IBeforeInstallPromptEvent | undefined
  >();

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

  return [prompt, promptToInstall];
}
