import { useEffect, useState } from "react";
import { Hook, Unhook } from "console-feed";
import { Message as MessageConsole } from "console-feed/lib/definitions/Console";

export const useDebugger = () => {
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

  return logs;
};
