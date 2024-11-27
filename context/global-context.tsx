'use client';

import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/actions/get-unread-message-count";

const GlobalContext = createContext<{
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}>({
  unreadCount: 0,
  setUnreadCount: () => {},
});

interface GlobalProviderProps {
  children: React.ReactNode;
};

export function GlobalProvider({ children }: GlobalProviderProps) {
  const session = useSession();
  const [unreadCount, setUnreadCount] = useState<number>(0);

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
