import { createContext, useState } from "react";

export enum NotificationType {
  SUCCESS = "SUCCESS",
  ALERT = "ALERT",
  ERROR = "ERROR",
}

type NotificationContextType = {
  show: (_message: string, _notificationType?: NotificationType) => void;
  open: boolean;
  message: string;
  notificationType?: NotificationType;
};

export const NotificationContext = createContext<NotificationContextType>({
  show: () => {},
  open: false,
  message: "",
  notificationType: NotificationType.SUCCESS,
});

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState("");
  const [open, isOpen] = useState(false);
  const [notificationType, setNotificationType] = useState(
    NotificationType.SUCCESS
  );

  return (
    <NotificationContext.Provider
      value={{
        show: (_message: string, _notificationType?: NotificationType) => {
          _notificationType && setNotificationType(_notificationType);
          setMessage(message);
          isOpen(true);
          setTimeout(() => {
            isOpen(false);
          }, 5000);
        },
        open,
        message,
        notificationType,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
