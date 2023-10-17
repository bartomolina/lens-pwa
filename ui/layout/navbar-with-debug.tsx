import { Link, Navbar } from "konsta/react";
import { useState } from "react";

import { DebuggerIcon, DebuggerLogs } from "@/ui/layout";

interface NavbarWithDebugProps {
  title: string;
  closeAction?: () => void;
}

export function NavbarWithDebug({ title, closeAction }: NavbarWithDebugProps) {
  const [popupOpened, setPopupOpened] = useState(false);

  return (
    <>
      <Navbar
        title={title}
        right={
          <div className="flex gap-3">
            {closeAction && (
              <Link navbar onClick={closeAction}>
                Close
              </Link>
            )}
            <DebuggerIcon setPopupOpened={setPopupOpened}></DebuggerIcon>
          </div>
        }
      />
      <DebuggerLogs
        popupOpened={popupOpened}
        setPopupOpened={setPopupOpened}
      ></DebuggerLogs>
    </>
  );
}
