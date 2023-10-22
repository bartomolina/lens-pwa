import { createContext, useCallback, useEffect, useState } from "react";

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

const initialState = {
  message: "",
  open: false,
  notificationType: NotificationType.SUCCESS,
};

export const NotificationContext = createContext<NotificationContextType>({
  ...initialState,
  show: () => {},
});

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState(initialState.message);
  const [open, setOpen] = useState(initialState.open);
  const [notificationType, setNotificationType] = useState(
    initialState.notificationType
  );

  const show = useCallback(
    (_message: string, _notificationType?: NotificationType) => {
      _notificationType && setNotificationType(_notificationType);
      setMessage(_message);
      setOpen(true);
    },
    []
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (open) {
      timeoutId = setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [open]);

  return (
    <NotificationContext.Provider
      value={{
        show,
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
