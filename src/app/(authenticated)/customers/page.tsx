import { CustomerRegister } from "@/features/customers/components/customer-register";

export default function CustomersPage() {
  return (
    <section aria-labelledby="customers-title" className="mx-auto max-w-7xl">
      <p className="text-md font-bold tracking-[0.22em] text-[#08766d]">
        CUSTOMER REGISTER
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-[#5c7065]">
          List Of Registered Customer
        </p>
        <Link
          className={buttonVariants({
            className: "bg-[#08766d] text-white hover:bg-[#065c56]",
            size: "lg",
          })}
          href="/customers/new"
        >
          Add customer
        </Link>
      </div>
      <div className="mt-9 overflow-hidden rounded-xl border border-[#d6dfd8] bg-white shadow-[0_12px_30px_-25px_rgba(20,35,30,0.45)]">
        <CustomerRegister />
      </div>
    </section>
  );
}
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
