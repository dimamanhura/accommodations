'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/actions/get-unread-message-count";
const GlobalContext = createContext({
  unreadCount: 0,
  setUnreadCount: (value: number) => {},
});

export function GlobalProvider({ children }) {
  const session = useSession();
  const [unreadCount, setUnreadCount] = useState(0);


  useEffect(() => {
    if (session?.data?.user?.id) {
      getUnreadMessageCount().then(setUnreadCount)
    }
  }, [session?.data?.user?.id]);

  return (
    <GlobalContext.Provider value={{
      unreadCount,
      setUnreadCount,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
};
