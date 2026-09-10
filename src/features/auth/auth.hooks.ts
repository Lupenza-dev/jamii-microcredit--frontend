"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCurrentUser,
  login,
  logout,
  type LoginCredentials,
} from "./auth.api";
import { authKeys } from "./auth.keys";
import { useAuthStore } from "./auth.store";

export function useCurrentUserQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getCurrentUser,
    enabled: Boolean(accessToken),
    retry: false,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (session) => {
      useAuthStore.getState().setSession({
        accessToken: session.token,
        user: session.user,
      });
      queryClient.setQueryData(authKeys.me(), session.user);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      useAuthStore.getState().clearSession();
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });
}
