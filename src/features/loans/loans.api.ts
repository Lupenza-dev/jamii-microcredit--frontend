import { apiClient } from "@/lib/api/client";

import type { LoanApplicationFormValues } from "./loan-application.schema";

export type CustomerOption = {
  id: number;
  full_name: string;
  phone_number: string;
};
export type LoanReference = { id: number; name: string };
export type LoanApplicationSummary = {
  id: number;
  amount: string;
  status: "draft" | "submitted";
  customer: { id: number; full_name: string };
  created_at: string;
};
type ApiResponse<T> = { data: T };
type PaginatedResponse<T> = {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export async function getLoanApplications(
  page = 1,
): Promise<PaginatedResponse<LoanApplicationSummary>> {
  const response = await apiClient.get<
    PaginatedResponse<LoanApplicationSummary>
  >("/loan-applications", { params: { page } });
  return response.data;
}

export async function getCustomerOptions(
  search: string,
): Promise<CustomerOption[]> {
  const response = await apiClient.get<ApiResponse<CustomerOption[]>>(
    "/customers/options",
    { params: { search } },
  );
  return response.data.data;
}

export async function getLoanTypes(): Promise<LoanReference[]> {
  const response =
    await apiClient.get<ApiResponse<LoanReference[]>>("/loan-types");
  return response.data.data;
}

export async function getLoanPlans(
  loanTypeId: number,
): Promise<LoanReference[]> {
  const response = await apiClient.get<ApiResponse<LoanReference[]>>(
    `/loan-types/${loanTypeId}/plans`,
  );
  return response.data.data;
}

export async function createLoanApplication(
  values: LoanApplicationFormValues,
): Promise<LoanApplicationSummary> {
  const formData = new FormData();
  formData.append("customer_id", String(values.customerId));
  formData.append("amount", values.amount);
  formData.append("loan_type_id", String(values.loanTypeId));
  formData.append("loan_plan_id", String(values.loanPlanId));
  values.guarantors.forEach((guarantor, index) => {
    formData.append(`guarantors[${index}][full_name]`, guarantor.fullName);
    formData.append(
      `guarantors[${index}][phone_number]`,
      guarantor.phoneNumber,
    );
    formData.append(
      `guarantors[${index}][relationship]`,
      guarantor.relationship,
    );
    formData.append(`guarantors[${index}][address]`, guarantor.address);
  });
  values.attachments.forEach((attachment, index) => {
    formData.append(`attachments[${index}][name]`, attachment.name);
    formData.append(`attachments[${index}][file]`, attachment.file);
  });
  const response = await apiClient.post<ApiResponse<LoanApplicationSummary>>(
    "/loan-applications",
    formData,
  );
  return response.data.data;
}
