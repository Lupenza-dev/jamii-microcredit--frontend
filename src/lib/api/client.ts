import axios, { AxiosError, type AxiosRequestConfig } from "axios";

import { getAccessToken } from "@/lib/auth/access-token";
import { useAuthStore } from "@/features/auth/auth.store";
import { getApiBaseUrl } from "@/lib/api/config";
import { ApiError, type ApiFieldErrors } from "@/lib/api/errors";

const correlationHeader = "X-Correlation-ID";
const unauthenticatedEvent = "jamii:unauthenticated";

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  if (!config.headers.has(correlationHeader)) {
    config.headers.set(correlationHeader, createCorrelationId());
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      handleUnauthenticatedResponse(error.config);
    }

    return Promise.reject(toApiError(error));
  },
);

function createCorrelationId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `client-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function handleUnauthenticatedResponse(config?: AxiosRequestConfig): void {
  useAuthStore.getState().clearSession();

  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(unauthenticatedEvent));

  const requestUrl = config?.url ?? "";
  const isLoginRequest = requestUrl.includes("/auth/login");

  if (!isLoginRequest && window.location.pathname !== "/login") {
    // This interceptor runs outside React, so no Next.js router is available.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = "/login";
  }
}

function toApiError(error: AxiosError): ApiError {
  const responseBody = error.response?.data;
  const payload = isRecord(responseBody) ? responseBody : {};
  const fieldErrors = isFieldErrors(payload.errors) ? payload.errors : {};

  return new ApiError(
    typeof payload.message === "string" ? payload.message : "Request failed.",
    error.response?.status ?? null,
    typeof payload.code === "string" ? payload.code : null,
    fieldErrors,
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFieldErrors(value: unknown): value is ApiFieldErrors {
  return (
    isRecord(value) &&
    Object.values(value).every(
      (messages) =>
        Array.isArray(messages) &&
        messages.every((message) => typeof message === "string"),
    )
  );
}
