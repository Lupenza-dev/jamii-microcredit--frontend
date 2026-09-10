import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  FilePenLine,
  ReceiptText,
} from "lucide-react";

const loanWorkstreams = [
  {
    href: "/loans/applications",
    icon: FilePenLine,
    label: "Loan Applications",
    description: "Review draft and submitted lending requests.",
  },
  {
    href: "/loans/granted",
    icon: CircleDollarSign,
    label: "Granted Loans",
    description: "Track active loans and their current position.",
  },
  {
    href: "/loans/repayments",
    icon: ReceiptText,
    label: "Loan Repayments",
    description: "Record and review repayment activity.",
  },
] as const;

export default function LoansPage() {
  return (
    <section aria-labelledby="loans-title" className="mx-auto max-w-7xl">
      <p className="text-xs font-bold tracking-[0.22em] text-[#08766d]">
        CREDIT WORKSPACE
      </p>
      <h1
        id="loans-title"
        className="mt-3 font-serif text-4xl tracking-tight text-[#14231e]"
      >
        Loans
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[#5c7065]">
        Move from application to repayment with a clear operational view of the
        loan portfolio.
      </p>
      <div className="mt-9 grid gap-4 lg:grid-cols-3">
        {loanWorkstreams.map(({ description, href, icon: Icon, label }) => (
          <Link
            className="group rounded-xl border border-[#d6dfd8] bg-white p-6 shadow-[0_12px_30px_-25px_rgba(20,35,30,0.45)] transition hover:-translate-y-0.5 hover:border-[#08766d]"
            href={href}
            key={href}
          >
            <Icon className="size-6 text-[#08766d]" />
            <h2 className="mt-8 font-serif text-2xl text-[#14231e]">{label}</h2>
            <p className="mt-2 text-sm leading-6 text-[#5c7065]">
              {description}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#08766d]">
              Open workspace{" "}
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
