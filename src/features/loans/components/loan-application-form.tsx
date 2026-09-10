"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm, useWatch, type Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api/errors";
import {
  loanApplicationSchema,
  type LoanApplicationFormValues,
} from "../loan-application.schema";
import {
  useCreateLoanApplicationMutation,
  useCustomerOptionsQuery,
  useLoanPlansQuery,
  useLoanTypesQuery,
} from "../loans.hooks";

const blankGuarantor = {
  fullName: "",
  phoneNumber: "",
  relationship: "",
  address: "",
};

export function LoanApplicationForm() {
  const router = useRouter();
  const [customerSearch, setCustomerSearch] = useState("");
  const form = useForm<LoanApplicationFormValues>({
    defaultValues: {
      customerId: 0,
      amount: "",
      loanTypeId: 0,
      loanPlanId: 0,
      guarantors: [blankGuarantor],
      attachments: [],
    },
    resolver: zodResolver(loanApplicationSchema),
    mode: "onBlur",
  });
  const guarantors = useFieldArray({
    control: form.control,
    name: "guarantors",
  });
  const attachments = useFieldArray({
    control: form.control,
    name: "attachments",
  });
  const loanTypeId = useWatch({ control: form.control, name: "loanTypeId" });
  const customerOptions = useCustomerOptionsQuery(customerSearch);
  const loanTypes = useLoanTypesQuery();
  const loanPlans = useLoanPlansQuery(loanTypeId);
  const createApplication = useCreateLoanApplicationMutation();

  async function submit(values: LoanApplicationFormValues): Promise<void> {
    try {
      await createApplication.mutateAsync(values);
      router.replace("/loans/applications");
    } catch (error) {
      if (error instanceof ApiError) {
        for (const [field, messages] of Object.entries(error.fieldErrors)) {
          const formField = backendFieldPath(field);
          if (formField)
            form.setError(formField, { message: messages[0], type: "server" });
        }
        form.setError("root", { message: error.message, type: "server" });
        return;
      }
      form.setError("root", {
        message:
          "The application could not be saved. Check your connection and try again.",
        type: "server",
      });
    }
  }

  return (
    <form className="space-y-8" noValidate onSubmit={form.handleSubmit(submit)}>
      {form.formState.errors.root && (
        <p
          className="rounded-lg border border-[#d78a7d] bg-[#fff5f2] px-4 py-3 text-sm text-[#8f3328]"
          role="alert"
        >
          {form.formState.errors.root.message}
        </p>
      )}
      <Section
        title="Applicant & product"
        description="Find the customer record, then select the controlled loan product."
      >
        <Field
          error={form.formState.errors.customerId?.message}
          label="Customer"
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 rounded-lg border border-[#b8c7bd] px-3">
              <Search className="size-4 text-[#5c7065]" />
              <input
                className="h-11 w-full outline-none"
                onChange={(event) => setCustomerSearch(event.target.value)}
                placeholder="Search name or phone"
                value={customerSearch}
              />
            </label>
            <select {...form.register("customerId", { valueAsNumber: true })}>
              <option value="0">Select a customer</option>
              {customerOptions.data?.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.full_name} · {customer.phone_number}
                </option>
              ))}
            </select>
            {customerSearch.length > 0 && customerSearch.length < 2 && (
              <p className="text-xs text-[#5c7065]">
                Type at least 2 characters to search.
              </p>
            )}
          </div>
        </Field>
        <Field
          error={form.formState.errors.amount?.message}
          label="Requested amount (TZS)"
        >
          <input
            {...form.register("amount")}
            inputMode="decimal"
            placeholder="e.g. 250000"
          />
        </Field>
        <Field
          error={form.formState.errors.loanTypeId?.message}
          label="Loan type"
        >
          <select
            {...form.register("loanTypeId", { valueAsNumber: true })}
            disabled={loanTypes.isPending}
            onChange={(event) => {
              form.setValue("loanTypeId", Number(event.target.value), {
                shouldValidate: true,
              });
              form.setValue("loanPlanId", 0, { shouldValidate: true });
            }}
          >
            <option value="0">
              {loanTypes.isPending ? "Loading types…" : "Select loan type"}
            </option>
            {loanTypes.data?.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </Field>
        <Field
          error={form.formState.errors.loanPlanId?.message}
          label="Loan plan"
        >
          <select
            {...form.register("loanPlanId", { valueAsNumber: true })}
            disabled={!loanTypeId || loanPlans.isPending}
          >
            <option value="0">
              {!loanTypeId
                ? "Select loan type first"
                : loanPlans.isPending
                  ? "Loading plans…"
                  : "Select loan plan"}
            </option>
            {loanPlans.data?.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
        </Field>
      </Section>
      <Section
        title="Guarantors"
        description="At least one person must support this application."
      >
        {guarantors.fields.map((field, index) => (
          <div
            className="grid gap-4 border-t border-[#e4ebe5] pt-5 md:grid-cols-2"
            key={field.id}
          >
            <p className="md:col-span-2 text-xs font-bold tracking-[0.16em] text-[#08766d]">
              GUARANTOR {index + 1}
            </p>
            <Field
              error={
                form.formState.errors.guarantors?.[index]?.fullName?.message
              }
              label="Full name"
            >
              <input {...form.register(`guarantors.${index}.fullName`)} />
            </Field>
            <Field
              error={
                form.formState.errors.guarantors?.[index]?.phoneNumber?.message
              }
              label="Phone number"
            >
              <input
                {...form.register(`guarantors.${index}.phoneNumber`)}
                type="tel"
              />
            </Field>
            <Field
              error={
                form.formState.errors.guarantors?.[index]?.relationship?.message
              }
              label="Relationship"
            >
              <input {...form.register(`guarantors.${index}.relationship`)} />
            </Field>
            <Field
              error={
                form.formState.errors.guarantors?.[index]?.address?.message
              }
              label="Address"
            >
              <input {...form.register(`guarantors.${index}.address`)} />
            </Field>
            {guarantors.fields.length > 1 && (
              <Button
                className="justify-self-start text-[#a63f32]"
                onClick={() => guarantors.remove(index)}
                type="button"
                variant="ghost"
              >
                <Minus /> Remove guarantor
              </Button>
            )}
          </div>
        ))}
        <Button
          className="mt-5 text-[#08766d]"
          onClick={() => guarantors.append(blankGuarantor)}
          type="button"
          variant="outline"
        >
          <Plus /> Add guarantor
        </Button>
      </Section>
      <Section
        title="Evidence ledger"
        description="Attach named supporting documents. Files stay in private loan storage."
      >
        {attachments.fields.map((field, index) => (
          <div
            className="grid gap-4 border-t border-[#e4ebe5] pt-5 md:grid-cols-[1fr_1fr_auto]"
            key={field.id}
          >
            <Field
              error={form.formState.errors.attachments?.[index]?.name?.message}
              label="Attachment name"
            >
              <input
                {...form.register(`attachments.${index}.name`)}
                placeholder="e.g. National ID"
              />
            </Field>
            <Field
              error={form.formState.errors.attachments?.[index]?.file?.message}
              label="Attachment file"
            >
              <input
                accept="application/pdf,image/jpeg,image/png,image/webp"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file)
                    form.setValue(`attachments.${index}.file`, file, {
                      shouldValidate: true,
                    });
                }}
                type="file"
              />
            </Field>
            <Button
              className="self-end text-[#a63f32]"
              onClick={() => attachments.remove(index)}
              type="button"
              variant="ghost"
            >
              <Minus /> Remove
            </Button>
          </div>
        ))}
        <p className="mt-4 text-xs text-[#5c7065]">
          PDF, JPEG, PNG, or WebP · maximum 5 MiB · use a distinct name for each
          file.
        </p>
        <Button
          className="mt-5 text-[#08766d]"
          onClick={() =>
            attachments.append({ name: "", file: undefined as unknown as File })
          }
          type="button"
          variant="outline"
        >
          <Plus /> Add attachment
        </Button>
      </Section>
      <div className="flex justify-end border-t border-[#e4ebe5] pt-6">
        <Button
          className="bg-[#08766d] text-white hover:bg-[#065c56]"
          disabled={createApplication.isPending}
          type="submit"
        >
          {createApplication.isPending
            ? "Saving application…"
            : "Save application"}
        </Button>
      </div>
    </form>
  );
}

function backendFieldPath(
  field: string,
): Path<LoanApplicationFormValues> | null {
  const mapped: Record<string, Path<LoanApplicationFormValues>> = {
    amount: "amount",
    customer_id: "customerId",
    loan_type_id: "loanTypeId",
    loan_plan_id: "loanPlanId",
    guarantors: "guarantors",
    attachments: "attachments",
  };
  if (mapped[field]) return mapped[field];
  const nested = field
    .replace(/guarantors\.(\d+)\.full_name/, "guarantors.$1.fullName")
    .replace(/guarantors\.(\d+)\.phone_number/, "guarantors.$1.phoneNumber");
  return /^(guarantors\.\d+\.(fullName|phoneNumber|relationship|address)|attachments\.\d+\.(name|file))$/.test(
    nested,
  )
    ? (nested as Path<LoanApplicationFormValues>)
    : null;
}

function Section({
  children,
  description,
  title,
}: {
  children: React.ReactNode;
  description: string;
  title: string;
}) {
  return (
    <fieldset className="rounded-xl border border-[#d6dfd8] bg-white p-6 shadow-[0_12px_30px_-25px_rgba(20,35,30,0.45)]">
      <legend className="font-serif text-2xl text-[#14231e]">{title}</legend>
      <p className="mb-6 mt-2 text-sm text-[#5c7065]">{description}</p>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}
function Field({
  children,
  error,
  label,
}: {
  children: React.ReactNode;
  error?: string;
  label: string;
}) {
  return (
    <label className="space-y-2 text-sm font-semibold text-[#1d332c]">
      <span>{label}</span>
      {children}
      {error && (
        <span className="block text-sm font-normal text-[#a63f32]" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
