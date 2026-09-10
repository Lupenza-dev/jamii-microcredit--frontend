import { apiClient } from "@/lib/api/client";

export type LocationOption = {
  id: number;
  name: string;
};

type ApiResponse<T> = {
  data: T;
};

export async function getRegions(): Promise<LocationOption[]> {
  const response =
    await apiClient.get<ApiResponse<LocationOption[]>>("/regions");

  return response.data.data;
}

export async function getDistricts(
  regionId: number,
): Promise<LocationOption[]> {
  const response = await apiClient.get<ApiResponse<LocationOption[]>>(
    `/regions/${regionId}/districts`,
  );

  return response.data.data;
}
