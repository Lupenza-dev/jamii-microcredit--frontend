import {
  CircleDollarSign,
  FilePenLine,
  HandCoins,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type DashboardSummaryCard = {
  icon: LucideIcon;
  label: string;
  value: string;
};

// Replace these values with a dashboard API response when available.
export const dashboardSummaryCards: DashboardSummaryCard[] = [
  { icon: UsersRound, label: "Total Customers", value: "1,248" },
  { icon: FilePenLine, label: "Loan Applications", value: "34" },
  { icon: HandCoins, label: "Granted Loans", value: "682" },
  { icon: CircleDollarSign, label: "Repayments", value: "TZS 8.4M" },
];

// Deliberately empty until the activity endpoint is implemented.
export const recentActivityRows: [] = [];
