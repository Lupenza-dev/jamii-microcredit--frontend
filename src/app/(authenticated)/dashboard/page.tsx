import { RecentActivityTable } from "@/features/dashboard/components/recent-activity-table";
import { dashboardSummaryCards } from "@/features/dashboard/dashboard.mock";

export default function DashboardPage() {
  return (
    <section aria-labelledby="dashboard-title" className="mx-auto max-w-7xl">
      <p className="text-md font-bold tracking-[0.22em] text-[#08766d]">
        Dashboard
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardSummaryCards.map(({ icon: Icon, label, value }) => (
          <article
            className="relative overflow-hidden rounded-xl border border-[#d6dfd8] bg-white p-5 shadow-[0_12px_30px_-25px_rgba(20,35,30,0.45)]"
            key={label}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-[#d8bd68]" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-[#08766d]">
                  DUMMY DATA
                </p>
                <h2 className="mt-3 text-sm font-semibold text-[#365248]">
                  {label}
                </h2>
              </div>
              <Icon aria-hidden="true" className="size-5 text-[#08766d]" />
            </div>
            <p className="mt-7 font-serif text-4xl tracking-tight text-[#14231e]">
              {value}
            </p>
          </article>
        ))}
      </div>

      <RecentActivityTable />
    </section>
  );
}
