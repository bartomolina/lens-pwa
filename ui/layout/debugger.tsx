import { useDebugger } from "@/hooks";
import { Bug } from "@phosphor-icons/react";
import { Console } from "console-feed";
import { Message as MessageComponent } from "console-feed/lib/definitions/Component";
import { Link, Navbar, Page, Popup } from "konsta/react";
import React from "react";

interface DebuggerIconProps {
  setPopupOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DebuggerIcon({ setPopupOpened }: DebuggerIconProps) {
  return <Bug size={28} onClick={() => setPopupOpened(true)} />;
}

interface DebuggerLogsProps {
  popupOpened: boolean;
  setPopupOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DebuggerLogs({
  popupOpened,
  setPopupOpened,
}: DebuggerLogsProps) {
  const logs = useDebugger();

  return (
    <Popup opened={popupOpened} onBackdropClick={() => setPopupOpened(false)}>
      <Page>
        <Navbar
          title="Debugger"
          right={
            <Link navbar onClick={() => setPopupOpened(false)}>
              Close
            </Link>
          }
        />
        <Console logs={logs as MessageComponent[]} />
      </Page>
    </Popup>
  );
}
