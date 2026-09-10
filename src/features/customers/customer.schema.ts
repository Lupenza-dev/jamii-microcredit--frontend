import { z } from "zod";

export const customerSchema = z.object({
  firstName: z.string().trim().min(1, "Enter the customer's first name."),
  middleName: z.string().trim(),
  lastName: z.string().trim().min(1, "Enter the customer's last name."),
  dateOfBirth: z.string().min(1, "Enter the date of birth."),
  gender: z.string().min(1, "Select a gender."),
  maritalStatus: z.string().min(1, "Select a marital status."),
  phoneNumber: z.string().trim().min(1, "Enter a phone number."),
  email: z.string().trim(),
  idType: z.string().min(1, "Select an ID type."),
  idNumber: z.string().trim().min(1, "Enter an ID number."),
  regionId: z.number().int().positive("Select a region."),
  districtId: z.number().int().positive("Select a district."),
  physicalLocation: z.string().trim().min(1, "Enter the physical location."),
  image: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Use a JPEG, PNG, or WebP image.",
    )
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Image must be 5 MiB or smaller.",
    )
    .optional(),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
