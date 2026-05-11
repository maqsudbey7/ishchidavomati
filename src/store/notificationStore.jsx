import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const NotificationContext =
  createContext();

export function NotificationProvider({
  children,
}) {
  const [notifications, setNotifications] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "notifications"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  const addNotification = (msg, type) => {
    const newNotif = {
      id: Date.now(),
      message: msg,
      type, // success | warning | error
      date: new Date().toLocaleString(),
    };

    setNotifications((prev) => [
      newNotif,
      ...prev,
    ]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        setNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}