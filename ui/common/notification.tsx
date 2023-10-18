import { CheckCircle } from "@phosphor-icons/react";
import { Notification as KonstaNotification } from "konsta/react";
import { useContext } from "react";

import { NotificationContext } from "@/ui/common";

export function Notification() {
  const notification = useContext(NotificationContext);
  return (
    <KonstaNotification opened={notification.open}>
      <div className="flex gap-2">
        <div>
          <CheckCircle size={28} weight="fill" className="text-primary" />
        </div>
        <span className="flex items-center">{notification.message}</span>
      </div>
    </KonstaNotification>
  );
}
