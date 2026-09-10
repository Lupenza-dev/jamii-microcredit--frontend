import Link from "next/link";

export default function GrantedLoansPage() {
  return (
    <section
      aria-labelledby="granted-loans-title"
      className="mx-auto max-w-4xl"
    >
      <p className="text-xs font-bold tracking-[0.22em] text-[#08766d]">
        CREDIT WORKSPACE
      </p>
      <h1
        id="granted-loans-title"
        className="mt-3 font-serif text-4xl tracking-tight text-[#14231e]"
      >
        Granted Loans
      </h1>
      <div className="mt-8 rounded-xl border border-[#d6dfd8] bg-white p-6 shadow-[0_12px_30px_-25px_rgba(20,35,30,0.45)]">
        <p className="text-sm leading-6 text-[#5c7065]">
          Active-loan operations will be added in the next lending scope. No
          loan balances or transactions are shown here yet.
        </p>
        <Link
          className="mt-6 inline-block text-sm font-semibold text-[#08766d] underline-offset-4 hover:underline"
          href="/loans"
        >
          Back to Loans
        </Link>
      </div>
    </section>
  );
}
