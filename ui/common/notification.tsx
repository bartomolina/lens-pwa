import { CheckCircle, WarningCircle,XCircle } from "@phosphor-icons/react";
import { Notification as KonstaNotification } from "konsta/react";
import { useContext } from "react";

import { NotificationContext, NotificationType } from "@/ui/common";

export function Notification() {
  const notification = useContext(NotificationContext);
  return (
    <KonstaNotification opened={notification.open}>
      <div className="flex gap-2">
        <div>
          {(() => {
            switch (notification.notificationType) {
              case NotificationType.SUCCESS:
                return (
                  <CheckCircle
                    size={28}
                    weight="fill"
                    className="text-green-800"
                  />
                );
              case NotificationType.ALERT:
                return (
                  <WarningCircle
                    size={28}
                    weight="fill"
                    className="text-yellow-800"
                  />
                );
              case NotificationType.ERROR:
                return (
                  <XCircle size={28} weight="fill" className="text-red-800" />
                );
            }
          })()}
        </div>
        <span className="flex items-center">{notification.message}</span>
      </div>
    </KonstaNotification>
  );
}
