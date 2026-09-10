"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { SidebarNavigation } from "./sidebar-navigation";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="lg:hidden">
      <Button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        className="text-[#365248] hover:bg-[#edf4ef] hover:text-[#143d37]"
        onClick={() => setIsOpen((open) => !open)}
        size="icon"
        type="button"
        variant="ghost"
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </Button>

      {isOpen ? (
        <div
          className="fixed inset-x-0 top-20 z-50 border-b border-[#6f9387] bg-[#143d37] p-5 shadow-xl"
          id="mobile-navigation"
        >
          <p className="mb-4 text-[0.7rem] font-bold tracking-[0.2em] text-[#d8bd68]">
            Management
          </p>
          <SidebarNavigation onNavigate={() => setIsOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
