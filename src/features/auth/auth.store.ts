import { create } from "zustand";

import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/lib/auth/access-token";

export type AuthenticatedUser = {
  id: number;
  staff_code: string | null;
  name: string;
  email: string;
};

type AuthStatus = "unknown" | "authenticated" | "unauthenticated";

type AuthState = {
  accessToken: string | null;
  status: AuthStatus;
  user: AuthenticatedUser | null;
  setSession: (session: {
    accessToken: string;
    user: AuthenticatedUser;
  }) => void;
  setUser: (user: AuthenticatedUser) => void;
  restoreSession: () => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  status: "unknown",
  user: null,
  setSession: ({ accessToken, user }) => {
    setAccessToken(accessToken);
    set({ accessToken, status: "authenticated", user });
  },
  setUser: (user) => set({ status: "authenticated", user }),
  restoreSession: () => {
    const accessToken = getAccessToken();

    set(
      accessToken
        ? { accessToken, status: "authenticated", user: null }
        : { accessToken: null, status: "unauthenticated", user: null },
    );
  },
  clearSession: () => {
    clearAccessToken();
    set({ accessToken: null, status: "unauthenticated", user: null });
  },
}));
