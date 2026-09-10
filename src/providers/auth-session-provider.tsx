"use client";

import { useEffect, type ReactNode } from "react";

import { useCurrentUserQuery } from "@/features/auth/auth.hooks";
import { useAuthStore } from "@/features/auth/auth.store";

type AuthSessionProviderProps = {
  children: ReactNode;
};

export function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const setUser = useAuthStore((state) => state.setUser);
  const currentUserQuery = useCurrentUserQuery();

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    if (currentUserQuery.data) {
      setUser(currentUserQuery.data);
    }
  }, [currentUserQuery.data, setUser]);

  return children;
}
