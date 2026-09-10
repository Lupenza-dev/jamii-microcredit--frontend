const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export function getApiBaseUrl(): string {
  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL must be configured.");
  }

  try {
    return new URL(apiBaseUrl).toString().replace(/\/$/, "");
  } catch {
    throw new Error("NEXT_PUBLIC_API_BASE_URL must be a valid absolute URL.");
  }
}
