"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useAuthStore } from "@/features/auth/auth.store";

type RequireAuthProps = {
  children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [router, status]);

  if (status !== "authenticated" || !user) {
    return (
      <div
        aria-busy="true"
        className="grid min-h-screen place-items-center bg-[#f6f8f3] text-sm text-[#5c7065]"
        role="status"
      >
        Checking your staff session…
      </div>
    );
  }

  return children;
}
