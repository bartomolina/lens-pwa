import {
  Actions,
  ActionsButton,
  ActionsGroup,
  ActionsLabel,
} from "konsta/react";
import { useEffect, useState } from "react";

import { useAddToHomescreenPrompt } from "@/hooks";

export function AddToHomeScreen() {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prompt) {
      alert("test:isvisible");
      setVisible(true);
    }
  }, [prompt]);

  return visible ? (
    <Actions opened={true} onBackdropClick={() => setVisible(false)}>
      <ActionsGroup>
        <ActionsLabel>Install the app</ActionsLabel>
        <ActionsButton onClick={promptToInstall}>
          Add to home screen
        </ActionsButton>
      </ActionsGroup>
      <ActionsGroup>
        <ActionsButton onClick={() => setVisible(false)}>Cancel</ActionsButton>
      </ActionsGroup>
    </Actions>
  ) : (
    <></>
  );
}
