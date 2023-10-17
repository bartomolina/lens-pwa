import { Bug } from "@phosphor-icons/react";
import { Console, Hook, Unhook } from "console-feed";
import { Message as MessageComponent } from "console-feed/lib/definitions/Component";
import { Message as MessageConsole } from "console-feed/lib/definitions/Console";
import { Link, Navbar, Page, Popup } from "konsta/react";
import React, { useEffect, useState } from "react";

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
  const [logs, setLogs] = useState<MessageConsole[]>([]);

  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => {
      Unhook(hookedConsole);
    };
  }, []);

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
