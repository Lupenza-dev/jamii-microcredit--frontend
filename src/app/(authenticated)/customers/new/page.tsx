import Link from "next/link";

import { CustomerForm } from "@/features/customers/components/customer-form";

export default function NewCustomerPage() {
  return (
    <section aria-labelledby="new-customer-title" className="mx-auto max-w-4xl">
      <p className="text-xs font-bold tracking-[0.22em] text-[#08766d]">
        CUSTOMER ONBOARDING
      </p>
      <h1
        id="new-customer-title"
        className="mt-3 font-serif text-4xl tracking-tight text-[#14231e]"
      >
        Add customer
      </h1>
      <p className="mt-3 text-sm text-[#5c7065]">
        Start a new customer onboarding record.
      </p>
      <div className="mt-8">
        <CustomerForm />
      </div>
      <Link
        className="mt-8 inline-block text-sm font-semibold text-[#08766d] underline-offset-4 hover:underline"
        href="/customers"
      >
        Back to customers
      </Link>
    </section>
  );
}
