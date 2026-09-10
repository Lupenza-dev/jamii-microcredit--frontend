import { describe, expect, it } from "vitest";

import { ApiError } from "@/lib/api/errors";

describe("ApiError", () => {
  it("preserves normalized API error details", () => {
    const error = new ApiError(
      "Invalid customer data.",
      422,
      "VALIDATION_ERROR",
      {
        first_name: ["The first name field is required."],
      },
    );

    expect(error).toMatchObject({
      code: "VALIDATION_ERROR",
      fieldErrors: {
        first_name: ["The first name field is required."],
      },
      message: "Invalid customer data.",
      name: "ApiError",
      status: 422,
    });
  });
});
