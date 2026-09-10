"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createCustomer, getCustomers } from "./customers.api";
import type { CustomerFormValues } from "./customer.schema";

export function useCustomersQuery(page = 1, search = "") {
  return useQuery({
    queryKey: ["customers", page, search],
    queryFn: () => getCustomers(page, search),
  });
}

export function useCreateCustomerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: CustomerFormValues) => createCustomer(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
  });
}
