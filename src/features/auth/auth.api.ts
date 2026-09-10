import { apiClient } from "@/lib/api/client";

import type { AuthenticatedUser } from "./auth.store";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  token_type: "Bearer";
  user: AuthenticatedUser;
};

type ApiResponse<T> = {
  data: T;
};

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    credentials,
  );

  return response.data.data;
}

export async function getCurrentUser(): Promise<AuthenticatedUser> {
  const response =
    await apiClient.get<ApiResponse<AuthenticatedUser>>("/auth/me");

  return response.data.data;
}

export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}
