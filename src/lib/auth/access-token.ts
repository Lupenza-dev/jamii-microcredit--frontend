let accessToken: string | null = null;
const accessTokenStorageKey = "jamii.access-token";

export function getAccessToken(): string | null {
  if (!accessToken && typeof window !== "undefined") {
    accessToken = window.sessionStorage.getItem(accessTokenStorageKey);
  }

  return accessToken;
}

export function setAccessToken(token: string): void {
  accessToken = token;

  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(accessTokenStorageKey, token);
  }
}

export function clearAccessToken(): void {
  accessToken = null;

  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(accessTokenStorageKey);
  }
}
