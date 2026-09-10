import {
  LayoutDashboard,
  Settings2,
  UsersRound,
  WalletCards,
} from "lucide-react";

export const navigationItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/customers", icon: UsersRound, label: "Customers" },
  { href: "/loans", icon: WalletCards, label: "Loans" },
  { href: "/settings", icon: Settings2, label: "System Settings" },
] as const;
