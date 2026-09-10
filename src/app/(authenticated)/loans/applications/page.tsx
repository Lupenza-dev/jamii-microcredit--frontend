import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { LoanApplicationRegister } from "@/features/loans/components/loan-application-register";

export default function LoanApplicationsPage() {
  return (
    <section aria-labelledby="applications-title" className="mx-auto max-w-7xl">
      <p className="text-xs font-bold tracking-[0.22em] text-[#08766d]">
        CREDIT INTAKE
      </p>
      <h1
        id="applications-title"
        className="mt-3 font-serif text-4xl tracking-tight text-[#14231e]"
      >
        Loan applications
      </h1>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-[#5c7065]">
          Draft and submitted requests waiting for the lending workflow.
        </p>
        <Link
          className={buttonVariants({
            className: "bg-[#08766d] text-white hover:bg-[#065c56]",
            size: "lg",
          })}
          href="/loans/applications/new"
        >
          Add loan
        </Link>
      </div>
      <div className="mt-9 overflow-hidden rounded-xl border border-[#d6dfd8] bg-white shadow-[0_12px_30px_-25px_rgba(20,35,30,0.45)]">
        <LoanApplicationRegister />
      </div>
    </section>
  );
}
