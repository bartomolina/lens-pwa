import { createContext, useState } from "react";

type NotificationContextType = {
  show: (message: string) => void;
  open: boolean;
  message: string;
};

export const NotificationContext = createContext<NotificationContextType>({
  show: () => {},
  open: false,
  message: "",
});

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState("");
  const [open, isOpen] = useState(false);

  return (
    <NotificationContext.Provider
      value={{
        show: (message: string) => {
          setMessage(message);
          isOpen(true);
          setTimeout(() => {
            isOpen(false);
          }, 5000);
        },
        open,
        message,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
