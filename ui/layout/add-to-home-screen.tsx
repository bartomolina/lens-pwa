import { Export } from "@phosphor-icons/react";
import {
  Actions,
  ActionsButton,
  ActionsGroup,
  ActionsLabel,
  Dialog,
  DialogButton,
} from "konsta/react";
import { useEffect, useState } from "react";

import { useAddToHomescreenPrompt } from "@/hooks";

export function AddToHomeScreen() {
  const [prompt, promptToInstall, showiOSPrompt, setShowiOSPrompt] =
    useAddToHomescreenPrompt();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prompt) {
      setVisible(true);
    }
  }, [prompt]);

  return (
    <>
      {visible && (
        <Actions opened={true} onBackdropClick={() => setVisible(false)}>
          <ActionsGroup>
            <ActionsLabel>Install the app</ActionsLabel>
            <ActionsButton onClick={promptToInstall}>
              Add to home screen
            </ActionsButton>
          </ActionsGroup>
          <ActionsGroup>
            <ActionsButton onClick={() => setVisible(false)}>
              Cancel
            </ActionsButton>
          </ActionsGroup>
        </Actions>
      )}
      <Dialog
        opened={showiOSPrompt}
        onBackdropClick={() => setShowiOSPrompt(false)}
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
          <DialogButton onClick={() => setShowiOSPrompt(false)}>
            Ok
          </DialogButton>
        }
      />
    </>
  );
}
