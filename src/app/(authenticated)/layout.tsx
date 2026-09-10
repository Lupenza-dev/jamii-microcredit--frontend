import { AuthenticatedShell } from "@/components/layout/authenticated-shell";
import { RequireAuth } from "@/features/auth/components/require-auth";

export default function AuthenticatedLayout({ children }: LayoutProps<"/">) {
  return (
    <RequireAuth>
      <AuthenticatedShell>{children}</AuthenticatedShell>
    </RequireAuth>
  );
}
