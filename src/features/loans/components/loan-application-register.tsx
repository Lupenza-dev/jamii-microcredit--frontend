"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLoanApplicationsQuery } from "../loans.hooks";
export function LoanApplicationRegister() {
  const [page, setPage] = useState(1);
  const applications = useLoanApplicationsQuery(page);
  if (applications.isPending)
    return <p className="p-6 text-sm text-[#5c7065]">Loading applications…</p>;
  if (applications.isError)
    return (
      <div className="p-6">
        <p className="text-sm text-[#9b3e35]">
          Applications could not be loaded.
        </p>
        <Button
          className="mt-4"
          onClick={() => applications.refetch()}
          type="button"
        >
          Try again
        </Button>
      </div>
    );
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-y border-[#d6dfd8] bg-[#f5f8f5] text-xs font-bold tracking-[0.12em] text-[#5c7065]">
            <tr>
              <th className="px-5 py-4">APPLICATION</th>
              <th className="px-5 py-4">CUSTOMER</th>
              <th className="px-5 py-4">AMOUNT</th>
              <th className="px-5 py-4">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4ebe5] text-[#263b32]">
            {applications.data.data.map((application) => (
              <tr key={application.id}>
                <td className="px-5 py-4 font-semibold">#{application.id}</td>
                <td className="px-5 py-4">{application.customer.full_name}</td>
                <td className="px-5 py-4">
                  TZS {Number(application.amount).toLocaleString()}
                </td>
                <td className="px-5 py-4 capitalize">{application.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {applications.data.data.length === 0 && (
          <p className="p-6 text-sm text-[#5c7065]">
            No loan applications have been recorded yet.
          </p>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-[#d6dfd8] px-5 py-4 text-sm text-[#5c7065]">
        <span>{applications.data.meta.total} applications</span>
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
            disabled={page === applications.data.meta.last_page}
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
