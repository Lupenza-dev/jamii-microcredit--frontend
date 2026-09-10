type RecentActivityTableProps = {
  isLoading?: boolean;
};

export function RecentActivityTable({
  isLoading = false,
}: RecentActivityTableProps) {
  return (
    <section
      aria-labelledby="recent-activity-title"
      className="mt-8 overflow-hidden rounded-xl border border-[#d6dfd8] bg-white"
    >
      <div className="flex items-start justify-between gap-4 border-b border-[#d6dfd8] px-5 py-5">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-[#08766d]">
            DUMMY DATA
          </p>
          <h2
            className="mt-2 font-serif text-2xl tracking-tight text-[#14231e]"
            id="recent-activity-title"
          >
            Recent activity
          </h2>
        </div>
        <span className="rounded-full bg-[#edf4ef] px-3 py-1 text-xs font-medium text-[#5c7065]">
          Branch feed
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
          <thead className="bg-[#f6f8f3] text-xs font-bold tracking-[0.1em] text-[#5c7065]">
            <tr>
              <th className="px-5 py-3 font-bold">Activity</th>
              <th className="px-5 py-3 font-bold">Customer</th>
              <th className="px-5 py-3 font-bold">Status</th>
              <th className="px-5 py-3 font-bold">Recorded</th>
            </tr>
          </thead>
          <tbody aria-busy={isLoading}>
            {isLoading ? (
              Array.from({ length: 3 }, (_, index) => (
                <tr className="border-t border-[#edf1ed]" key={index}>
                  <td className="px-5 py-4" colSpan={4}>
                    <div className="h-4 w-full animate-pulse rounded bg-[#edf4ef]" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-5 py-10 text-center text-sm leading-6 text-[#5c7065]"
                  colSpan={4}
                >
                  No dummy activity records yet. Activity will appear here when
                  dashboard data is connected.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
