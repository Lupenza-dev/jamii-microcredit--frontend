"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useCustomersQuery } from "../customers.hooks";

export function CustomerRegister() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const customers = useCustomersQuery(page, search);

  if (customers.isPending) {
    return <p className="p-6 text-sm text-[#5c7065]">Loading customers…</p>;
  }

  if (customers.isError) {
    return (
      <div className="p-6">
        <p className="text-sm text-[#9b3e35]">
          Customer records could not be loaded.
        </p>
        <Button
          className="mt-4"
          onClick={() => customers.refetch()}
          type="button"
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <label className="m-5 flex max-w-md items-center gap-3 rounded-lg border border-[#d6dfd8] bg-[#f5f8f5] px-3 py-2 text-[#5c7065]">
        <Search className="size-4" />
        <span className="sr-only">Search customers</span>
        <input
          className="w-full bg-transparent text-sm outline-none"
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search name or phone"
          value={search}
        />
      </label>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-y border-[#d6dfd8] bg-[#f5f8f5] text-xs font-bold tracking-[0.12em] text-[#5c7065]">
            <tr>
              <th className="px-5 py-4">CUSTOMER</th>
              <th className="px-5 py-4">PHONE</th>
              <th className="px-5 py-4">LOCATION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4ebe5] text-[#263b32]">
            {customers.data.data.map((customer) => (
              <tr key={customer.id}>
                <td className="px-5 py-4 font-semibold">
                  {customer.full_name}
                </td>
                <td className="px-5 py-4">{customer.phone_number}</td>
                <td className="px-5 py-4">
                  {customer.district.name}, {customer.region.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.data.data.length === 0 && (
          <p className="p-6 text-sm text-[#5c7065]">
            No customers have been registered yet.
          </p>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-[#d6dfd8] px-5 py-4 text-sm text-[#5c7065]">
        <span>{customers.data.meta.total} customers</span>
        <div className="flex gap-2">
          <Button
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
            size="sm"
            type="button"
            variant="outline"
          >
            Previous
          </Button>
          <Button
            disabled={page === customers.data.meta.last_page}
            onClick={() => setPage((current) => current + 1)}
            size="sm"
            type="button"
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
