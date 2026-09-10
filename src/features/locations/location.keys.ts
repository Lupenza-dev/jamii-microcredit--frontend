export const locationKeys = {
  all: ["locations"] as const,
  regions: () => [...locationKeys.all, "regions"] as const,
  districts: (regionId: number | null | undefined) =>
    [...locationKeys.all, "districts", regionId] as const,
};
