import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f6f8f3] p-4 text-[#14231e] sm:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-2xl border border-[#d6dfd8] bg-white shadow-[0_24px_70px_-42px_rgba(20,35,30,0.55)] lg:grid-cols-[0.88fr_1.12fr] sm:min-h-[calc(100vh-4rem)]">
        <section className="relative hidden overflow-hidden bg-[#143d37] p-10 text-[#f4f7f1] lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-y-0 right-14 w-px" />
          <div className="relative">
            <p className="text-xs font-bold tracking-[0.28em] text-[#d8bd68]">
              JAMII
            </p>
            <p className="mt-2 text-sm text-[#c5d9cf]">
              Microcredit loan management
            </p>
          </div>

          <div className="relative max-w-sm">
            <p className="text-xs font-bold tracking-[0.2em] text-[#d8bd68]">
              STAFF PORTAL
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.04] tracking-tight">
              Clear records.
              <br />
              Stronger communities.
            </h1>
            <p className="mt-6 max-w-xs text-sm leading-6 text-[#c5d9cf]">
              Manage the work behind every responsible loan decision.
            </p>
          </div>
          <div></div>
        </section>

        <section className="flex items-center px-6 py-12 sm:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <p className="text-xs font-bold tracking-[0.28em] text-[#08766d]">
                JAMII
              </p>
              <p className="mt-2 text-sm text-[#5c7065]">
                Microcredit loan management
              </p>
            </div>
            <h2 className="mt-3 font-serif text-4xl tracking-tight text-[#14231e]">
              Welcome back
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#5c7065]">
              Use your account to continue to the operations workspace.
            </p>

            <div className="mt-9 border-t border-[#d6dfd8] pt-8">
              <LoginForm />
            </div>

            {/* <p className="mt-7 text-center text-xs leading-5 text-[#5c7065]">
              Need access? Contact your branch administrator.
            </p> */}
          </div>
        </section>
      </div>
    </main>
  );
}
