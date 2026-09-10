"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { navigationItems } from "./navigation-items";

type SidebarNavigationProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
};

export function SidebarNavigation({
  collapsed = false,
  onNavigate,
}: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation">
      <ul className="space-y-1">
        {navigationItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <li key={href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8bd68]",
                  isActive
                    ? "bg-[#d8bd68] text-[#143d37]"
                    : "text-[#d9e7df] hover:bg-white/10 hover:text-white",
                  collapsed && "justify-center px-2",
                )}
                href={href}
                onClick={onNavigate}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                <span className={cn(collapsed && "sr-only")}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
