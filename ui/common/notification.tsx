import { Notification as KonstaNotification } from "konsta/react";
import { useContext } from "react";

import { NotificationContext } from "@/ui/common";

export function Notification() {
  const notification = useContext(NotificationContext);
  return (
    <KonstaNotification
      opened={notification.open}
      text={notification.message}
    />
  );
}
