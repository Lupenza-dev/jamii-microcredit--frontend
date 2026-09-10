"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  useDistrictsQuery,
  useRegionsQuery,
} from "@/features/locations/location.hooks";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api/errors";
import { customerSchema, type CustomerFormValues } from "../customer.schema";
import { useCreateCustomerMutation } from "../customers.hooks";

export function CustomerForm() {
  const router = useRouter();
  const form = useForm<CustomerFormValues>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      phoneNumber: "",
      email: "",
      idType: "",
      idNumber: "",
      regionId: 0,
      districtId: 0,
      physicalLocation: "",
      image: undefined,
    },
    resolver: zodResolver(customerSchema),
    mode: "onBlur",
  });
  const regionId = useWatch({ control: form.control, name: "regionId" });
  const regions = useRegionsQuery();
  const districts = useDistrictsQuery(regionId || null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const createCustomer = useCreateCustomerMutation();

  async function submit(values: CustomerFormValues): Promise<void> {
    try {
      await createCustomer.mutateAsync(values);
      router.replace("/customers");
    } catch (error) {
      if (error instanceof ApiError) {
        const fields: Record<string, keyof CustomerFormValues> = {
          first_name: "firstName",
          middle_name: "middleName",
          last_name: "lastName",
          date_of_birth: "dateOfBirth",
          marital_status: "maritalStatus",
          phone_number: "phoneNumber",
          id_type: "idType",
          id_number: "idNumber",
          region_id: "regionId",
          district_id: "districtId",
          physical_location: "physicalLocation",
          image: "image",
        };
        for (const [name, messages] of Object.entries(error.fieldErrors))
          if (fields[name])
            form.setError(fields[name], {
              message: messages[0],
              type: "server",
            });
        if (!Object.keys(error.fieldErrors).length)
          form.setError("root", { message: error.message, type: "server" });
        return;
      }
      form.setError("root", {
        message:
          "Customer could not be saved. Check your connection and try again.",
        type: "server",
      });
    }
  }

  return (
    <form
      className="rounded-xl border border-[#d6dfd8] bg-white p-6 shadow-[0_12px_30px_-25px_rgba(20,35,30,0.45)]"
      noValidate
      onSubmit={form.handleSubmit(submit)}
    >
      {form.formState.errors.root ? (
        <p
          className={`mb-6 rounded-lg border px-4 py-3 text-sm ${form.formState.errors.root.type === "success" ? "border-[#9bc9ab] bg-[#f1faf3] text-[#25643a]" : "border-[#d78a7d] bg-[#fff5f2] text-[#8f3328]"}`}
          role="status"
        >
          {form.formState.errors.root.message}
        </p>
      ) : null}
      <fieldset className="grid gap-5 md:grid-cols-2">
        <legend className="mb-1 font-serif text-2xl text-[#14231e]">
          Identity
        </legend>
        <p className="md:col-span-2 text-sm text-[#5c7065]">
          Use the customer&apos;s identity details as they appear on their
          supporting document.
        </p>
        <Field
          error={form.formState.errors.firstName?.message}
          label="First name"
        >
          <input {...form.register("firstName")} />
        </Field>
        <Field
          error={form.formState.errors.middleName?.message}
          label="Middle name"
        >
          <input {...form.register("middleName")} />
        </Field>
        <Field
          error={form.formState.errors.lastName?.message}
          label="Last name"
        >
          <input {...form.register("lastName")} />
        </Field>
        <Field
          error={form.formState.errors.dateOfBirth?.message}
          label="Date of birth"
        >
          <input {...form.register("dateOfBirth")} type="date" />
        </Field>
        <Field error={form.formState.errors.gender?.message} label="Gender">
          <select {...form.register("gender")}>
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field
          error={form.formState.errors.maritalStatus?.message}
          label="Marital status"
        >
          <select {...form.register("maritalStatus")}>
            <option value="">Select status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </Field>
      </fieldset>
      <fieldset className="mt-10 grid gap-5 border-t border-[#e4ebe5] pt-8 md:grid-cols-2">
        <legend className="font-serif text-2xl text-[#14231e]">
          Address & photo
        </legend>
        <p className="md:col-span-2 text-sm text-[#5c7065]">
          A profile image is optional and stays in private customer storage.
        </p>
        <Field
          error={form.formState.errors.physicalLocation?.message}
          label="Physical location"
        >
          <input
            {...form.register("physicalLocation")}
            placeholder="Street, ward, or nearby landmark"
          />
        </Field>
        <div className="space-y-2 text-sm font-semibold text-[#1d332c]">
          <label htmlFor="customer-image">
            Customer image{" "}
            <span className="font-normal text-[#5c7065]">(optional)</span>
          </label>
          <input
            accept="image/jpeg,image/png,image/webp"
            className="block w-full text-sm font-normal text-[#5c7065]"
            id="customer-image"
            onChange={(event) => {
              const file = event.target.files?.[0];
              form.setValue("image", file, { shouldValidate: true });
              setImagePreview(file ? URL.createObjectURL(file) : null);
            }}
            type="file"
          />
          {form.formState.errors.image ? (
            <p className="text-sm font-normal text-[#a63f32]" role="alert">
              {form.formState.errors.image.message}
            </p>
          ) : (
            <p className="text-xs font-normal text-[#5c7065]">
              JPEG, PNG, or WebP · maximum 5 MiB
            </p>
          )}
          {imagePreview ? (
            <Image
              alt="Selected customer profile preview"
              className="mt-3 size-20 rounded-lg border border-[#d6dfd8] object-cover"
              height={80}
              unoptimized
              width={80}
              src={imagePreview}
            />
          ) : null}
        </div>
      </fieldset>
      <div className="mt-10 flex justify-end border-t border-[#e4ebe5] pt-6">
        <Button
          className="bg-[#08766d] text-white hover:bg-[#065c56]"
          disabled={createCustomer.isPending}
          type="submit"
        >
          {createCustomer.isPending ? "Saving customer…" : "Save customer"}
        </Button>
      </div>
      <fieldset className="mt-10 grid gap-5 border-t border-[#e4ebe5] pt-8 md:grid-cols-2">
        <legend className="font-serif text-2xl text-[#14231e]">
          Contact & identification
        </legend>
        <p className="md:col-span-2 text-sm text-[#5c7065]">
          Record a reachable number and the identification presented by the
          customer.
        </p>
        <Field
          error={form.formState.errors.phoneNumber?.message}
          label="Phone number"
        >
          <input
            {...form.register("phoneNumber")}
            autoComplete="tel"
            inputMode="tel"
            placeholder="0712 345 678"
            type="tel"
          />
        </Field>
        <Field error={form.formState.errors.email?.message} label="Email">
          <input
            {...form.register("email")}
            autoComplete="email"
            placeholder="Optional"
            type="email"
          />
        </Field>
        <Field error={form.formState.errors.idType?.message} label="ID type">
          <select {...form.register("idType")}>
            <option value="">Select ID type</option>
            <option value="national_id">National ID</option>
            <option value="passport">Passport</option>
            <option value="voter_id">Voter ID</option>
            <option value="driving_licence">Driving licence</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field
          error={form.formState.errors.idNumber?.message}
          label="ID number"
        >
          <input {...form.register("idNumber")} autoComplete="off" />
        </Field>
      </fieldset>
      <fieldset className="mt-10 grid gap-5 border-t border-[#e4ebe5] pt-8 md:grid-cols-2">
        <legend className="font-serif text-2xl text-[#14231e]">Location</legend>
        <p className="md:col-span-2 text-sm text-[#5c7065]">
          Select the region first; districts are limited to that selection.
        </p>
        <Field error={form.formState.errors.regionId?.message} label="Region">
          <select
            {...form.register("regionId", { valueAsNumber: true })}
            disabled={regions.isPending}
            onChange={(event) => {
              form.setValue("regionId", Number(event.target.value), {
                shouldValidate: true,
              });
              form.setValue("districtId", 0, { shouldValidate: true });
            }}
          >
            <option value="0">
              {regions.isPending ? "Loading regions…" : "Select region"}
            </option>
            {regions.data?.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </Field>
        <Field
          error={form.formState.errors.districtId?.message}
          label="District"
        >
          <select
            {...form.register("districtId", { valueAsNumber: true })}
            disabled={!regionId || districts.isPending}
          >
            <option value="0">
              {!regionId
                ? "Select region first"
                : districts.isPending
                  ? "Loading districts…"
                  : "Select district"}
            </option>
            {districts.data?.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>
    </form>
  );
}

function Field({
  children,
  error,
  label,
}: {
  children: ReactNode;
  error?: string;
  label: string;
}) {
  const control = isValidElement<{ className?: string }>(children)
    ? cloneElement(children as ReactElement<{ className?: string }>, {
        className:
          "h-11 w-full rounded-lg border border-[#b8c7bd] bg-white px-3 font-normal text-[#14231e] outline-none focus:border-[#08766d] focus:ring-4 focus:ring-[#08766d]/15",
      })
    : children;
  return (
    <label className="space-y-2 text-sm font-semibold text-[#1d332c]">
      <span>{label}</span>
      {control}
      {error ? (
        <span className="block text-sm font-normal text-[#a63f32]" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
