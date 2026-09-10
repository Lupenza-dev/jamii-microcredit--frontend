export type ApiFieldErrors = Record<string, string[]>;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number | null,
    public readonly code: string | null,
    public readonly fieldErrors: ApiFieldErrors = {},
  ) {
    super(message);
    this.name = "ApiError";
  }
}
