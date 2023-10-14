import { Export } from "@phosphor-icons/react";
import { Dialog, DialogButton } from "konsta/react";

import { useAddToHomescreeniOSPrompt } from "@/hooks";

export function AddToHomeScreeniOS() {
  const [showPrompt, setShowPrompt] = useAddToHomescreeniOSPrompt();

  return (
    <Dialog
      opened={showPrompt}
      onBackdropClick={() => setShowPrompt(false)}
      title="Install app"
      content={
        <div className="flex">
          <Export className="m-auto flex" weight="bold" size={35} />
          <span className="flex items-center">
            Click on the Share button and then &quot;Add to Home Screen&quot;
          </span>
        </div>
      }
      buttons={
        <DialogButton onClick={() => setShowPrompt(false)}>Ok</DialogButton>
      }
    />
  );
}
