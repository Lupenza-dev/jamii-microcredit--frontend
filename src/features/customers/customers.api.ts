import { apiClient } from "@/lib/api/client";

import type { CustomerFormValues } from "./customer.schema";

export type CustomerSummary = {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  full_name: string;
  phone_number: string;
  email: string | null;
  region: { id: number; name: string };
  district: { id: number; name: string };
  created_at: string;
};

type PaginatedResponse<T> = {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

type ApiResponse<T> = { data: T };

export async function getCustomers(
  page = 1,
  search = "",
): Promise<PaginatedResponse<CustomerSummary>> {
  const response = await apiClient.get<PaginatedResponse<CustomerSummary>>(
    "/customers",
    {
      params: { page, search: search || undefined },
    },
  );

  return response.data;
}

export async function createCustomer(
  values: CustomerFormValues,
): Promise<CustomerSummary> {
  const formData = new FormData();
  const fields = {
    first_name: values.firstName,
    middle_name: values.middleName,
    last_name: values.lastName,
    date_of_birth: values.dateOfBirth,
    gender: values.gender,
    marital_status: values.maritalStatus,
    phone_number: values.phoneNumber,
    email: values.email,
    id_type: values.idType,
    id_number: values.idNumber,
    region_id: values.regionId,
    district_id: values.districtId,
    physical_location: values.physicalLocation,
  };
  for (const [name, value] of Object.entries(fields))
    formData.append(name, String(value));
  if (values.image) formData.append("image", values.image);

  const response = await apiClient.post<ApiResponse<CustomerSummary>>(
    "/customers",
    formData,
  );
  return response.data.data;
}
