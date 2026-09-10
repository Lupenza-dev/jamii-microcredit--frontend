"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { UserProfile } from "@/features/auth/components/user-profile";

type AuthenticatedShellProps = { children: ReactNode };

export function AuthenticatedShell({ children }: AuthenticatedShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div
      className={`min-h-screen bg-[#f6f8f3] text-[#14231e] lg:grid ${isSidebarCollapsed ? "lg:grid-cols-[4.5rem_1fr]" : "lg:grid-cols-[17.5rem_1fr]"}`}
    >
      <aside
        className={`relative hidden overflow-hidden bg-[#143d37] py-8 text-[#f4f7f1] lg:flex lg:flex-col ${isSidebarCollapsed ? "px-3" : "px-7"}`}
      >
        <div
          className={`absolute inset-y-0 w-px  ${isSidebarCollapsed ? "right-2" : "right-8"}`}
        />
        <div className="relative">
          <p
            className={`text-xs font-bold tracking-[0.28em] text-[#d8bd68] ${isSidebarCollapsed ? "text-center" : ""}`}
          >
            JAMII
          </p>
          <p
            className={`mt-2 text-sm text-[#c5d9cf] ${isSidebarCollapsed ? "sr-only" : ""}`}
          >
            Staff workspace
          </p>
        </div>

        <div className="relative mt-2 border-y border-[#6f9387] py-4">
          <p
            className={`px-3 text-[0.7rem] font-bold tracking-[0.2em] text-[#d8bd68] ${isSidebarCollapsed ? "sr-only" : ""}`}
          >
            Management
          </p>
          <div className="mt-3">
            <SidebarNavigation collapsed={isSidebarCollapsed} />
          </div>
        </div>

        <div className="relative mt-auto">
          <p
            className={`text-xs leading-5 text-[#c5d9cf] ${isSidebarCollapsed ? "sr-only" : ""}`}
          >
            Responsible lending, clearly managed.
          </p>
          <Button
            aria-label={
              isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            className="mt-4 w-full text-[#d9e7df] hover:bg-white/10 hover:text-white"
            onClick={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
            size="icon"
            type="button"
            variant="ghost"
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen aria-hidden="true" />
            ) : (
              <PanelLeftClose aria-hidden="true" />
            )}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="flex min-h-20 items-center justify-between border-b border-[#d6dfd8] bg-white px-5 sm:px-8">
          <div className="flex items-center gap-2">
            <MobileNavigation />
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-[#08766d] lg:hidden">
                JAMII
              </p>
              <p className="font-serif text-xl tracking-tight text-[#14231e]">
                Staff workspace
              </p>
            </div>
          </div>
          <UserProfile />
        </header>

        <main className="min-w-0 flex-1 px-5 py-7 sm:px-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
