import Link from "next/link";
import { LoanApplicationForm } from "@/features/loans/components/loan-application-form";

export default function NewLoanApplicationPage() {
  return (
    <section
      aria-labelledby="new-application-title"
      className="mx-auto max-w-5xl"
    >
      <p className="text-xs font-bold tracking-[0.22em] text-[#08766d]">
        CREDIT INTAKE
      </p>
      <h1
        id="new-application-title"
        className="mt-3 font-serif text-4xl tracking-tight text-[#14231e]"
      >
        Add loan application
      </h1>
      <p className="mt-3 text-sm text-[#5c7065]">
        Record the request, supporting guarantors, and evidence before
        submission.
      </p>
      <div className="mt-8">
        <LoanApplicationForm />
      </div>
      <Link
        className="mt-8 inline-block text-sm font-semibold text-[#08766d] underline-offset-4 hover:underline"
        href="/loans/applications"
      >
        Back to applications
      </Link>
    </section>
  );
}
