"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/features/auth/auth.hooks";
import { useAuthStore } from "@/features/auth/auth.store";
import { ApiError } from "@/lib/api/errors";

export function UserProfile() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogoutMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!user) {
    return null;
  }

  async function handleLogout(): Promise<void> {
    setErrorMessage(null);

    try {
      await logoutMutation.mutateAsync();
      router.replace("/login");
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : "We could not sign you out. Please try again.",
      );
    }
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-semibold text-[#1d332c]">{user.name}</p>
        <p className="text-xs text-[#5c7065]">
          {user.staff_code ?? user.email}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-full bg-[#dcece4] text-sm font-bold text-[#08766d]"
      >
        {user.name.slice(0, 1).toUpperCase()}
      </span>
      <Button
        aria-label="Sign out"
        className="text-[#365248] hover:bg-[#edf4ef] hover:text-[#143d37]"
        disabled={logoutMutation.isPending}
        onClick={handleLogout}
        size="icon"
        type="button"
        variant="ghost"
      >
        <LogOut aria-hidden="true" />
      </Button>
      {errorMessage ? (
        <span className="sr-only" role="alert">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}
