import { Bell } from "@phosphor-icons/react";
import { Notification as KonstaNotification } from "konsta/react";
import { useContext } from "react";

import { NotificationContext } from "@/ui/common";

export function Notification() {
  const notification = useContext(NotificationContext);
  return (
    <KonstaNotification
      opened={notification.open}
      icon={<Bell size={28} className="text-primary" />}
      title={notification.message}
      titleRightText="now"
    />
  );
}
