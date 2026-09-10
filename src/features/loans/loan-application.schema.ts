import { z } from "zod";

const attachmentFile = z.custom<File>(
  (value) => value instanceof File,
  "Choose an attachment file.",
);

export const loanApplicationSchema = z
  .object({
    customerId: z.number().int().positive("Select a customer."),
    amount: z
      .string()
      .regex(
        /^\d+(\.\d{1,2})?$/,
        "Enter a positive amount with up to 2 decimals.",
      )
      .refine(
        (value) => Number(value) > 0,
        "Enter an amount greater than zero.",
      ),
    loanTypeId: z.number().int().positive("Select a loan type."),
    loanPlanId: z.number().int().positive("Select a loan plan."),
    guarantors: z
      .array(
        z.object({
          fullName: z.string().min(1, "Enter the guarantor's name."),
          phoneNumber: z.string().min(1, "Enter a phone number."),
          relationship: z.string().min(1, "Enter the relationship."),
          address: z.string().min(1, "Enter an address."),
        }),
      )
      .min(1, "Add at least one guarantor."),
    attachments: z.array(
      z.object({
        name: z.string().min(1, "Name this attachment."),
        file: attachmentFile
          .refine(
            (file) =>
              [
                "application/pdf",
                "image/jpeg",
                "image/png",
                "image/webp",
              ].includes(file.type),
            "Use a PDF, JPEG, PNG, or WebP file.",
          )
          .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            "Files must be 5 MiB or smaller.",
          ),
      }),
    ),
  })
  .superRefine(({ attachments }, context) => {
    const names = new Set<string>();
    attachments.forEach((attachment, index) => {
      const name = attachment.name.trim().toLowerCase();
      if (name && names.has(name)) {
        context.addIssue({
          code: "custom",
          message: "Attachment names must be unique.",
          path: ["attachments", index, "name"],
        });
      }
      names.add(name);
    });
  });

export type LoanApplicationFormValues = z.infer<typeof loanApplicationSchema>;
