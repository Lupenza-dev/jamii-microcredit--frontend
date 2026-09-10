"use client";

import { useQuery } from "@tanstack/react-query";

import { getDistricts, getRegions } from "./location.api";
import { locationKeys } from "./location.keys";

export function useRegionsQuery() {
  return useQuery({
    queryKey: locationKeys.regions(),
    queryFn: getRegions,
  });
}

export function useDistrictsQuery(regionId: number | null | undefined) {
  return useQuery({
    queryKey: locationKeys.districts(regionId),
    queryFn: () => getDistricts(regionId as number),
    enabled: Number.isInteger(regionId) && (regionId as number) > 0,
  });
}
