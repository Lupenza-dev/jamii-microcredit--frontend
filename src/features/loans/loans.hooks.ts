"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createLoanApplication,
  getCustomerOptions,
  getLoanApplications,
  getLoanPlans,
  getLoanTypes,
} from "./loans.api";
import type { LoanApplicationFormValues } from "./loan-application.schema";

export function useLoanApplicationsQuery(page = 1) {
  return useQuery({
    queryKey: ["loan-applications", page],
    queryFn: () => getLoanApplications(page),
  });
}
export function useCustomerOptionsQuery(search: string) {
  return useQuery({
    queryKey: ["customer-options", search],
    queryFn: () => getCustomerOptions(search),
    enabled: search.trim().length >= 2,
  });
}
export function useLoanTypesQuery() {
  return useQuery({ queryKey: ["loan-types"], queryFn: getLoanTypes });
}
export function useLoanPlansQuery(loanTypeId: number) {
  return useQuery({
    queryKey: ["loan-plans", loanTypeId],
    queryFn: () => getLoanPlans(loanTypeId),
    enabled: loanTypeId > 0,
  });
}
export function useCreateLoanApplicationMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (values: LoanApplicationFormValues) =>
      createLoanApplication(values),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: ["loan-applications"] }),
  });
}
