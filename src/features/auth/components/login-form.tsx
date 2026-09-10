"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/features/auth/auth.hooks";
import { loginSchema, type LoginFormValues } from "@/features/auth/auth.schema";
import { ApiError } from "@/lib/api/errors";

export function LoginForm() {
  const router = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const loginMutation = useLoginMutation();

  async function handleValidSubmit(values: LoginFormValues): Promise<void> {
    try {
      await loginMutation.mutateAsync(values);
      router.replace("/dashboard");
    } catch (error) {
      if (error instanceof ApiError) {
        for (const [field, messages] of Object.entries(error.fieldErrors)) {
          if (field === "email" || field === "password") {
            setError(field, { message: messages[0], type: "server" });
          }
        }

        if (Object.keys(error.fieldErrors).length === 0) {
          setError("root", { message: error.message, type: "server" });
        }

        return;
      }

      setError("root", {
        message:
          "We could not sign you in. Check your connection and try again.",
        type: "server",
      });
    }
  }

  return (
    <form
      className="space-y-6"
      noValidate
      onSubmit={handleSubmit(handleValidSubmit)}
    >
      {errors.root ? (
        <div
          className="rounded-lg border border-[#d78a7d] bg-[#fff5f2] px-3 py-2.5 text-sm leading-5 text-[#8f3328]"
          role="alert"
        >
          {errors.root.message}
        </div>
      ) : null}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#1d332c]" htmlFor="email">
          Work email
        </label>
        <input
          {...register("email")}
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          className="h-12 w-full rounded-lg border border-[#b8c7bd] bg-white px-3 text-base text-[#14231e] outline-none transition placeholder:text-[#6d7f74] focus:border-[#08766d] focus:ring-4 focus:ring-[#08766d]/15 aria-invalid:border-[#c24b3a] aria-invalid:ring-[#c24b3a]/15"
          id="email"
          placeholder="name@jamii.co.tz"
          type="email"
        />
        {errors.email ? (
          <p className="text-sm text-[#a63f32]" id="email-error" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-semibold text-[#1d332c]"
          htmlFor="password"
        >
          Password
        </label>
        <input
          {...register("password")}
          aria-describedby={errors.password ? "password-error" : undefined}
          aria-invalid={Boolean(errors.password)}
          autoComplete="current-password"
          className="h-12 w-full rounded-lg border border-[#b8c7bd] bg-white px-3 text-base text-[#14231e] outline-none transition placeholder:text-[#6d7f74] focus:border-[#08766d] focus:ring-4 focus:ring-[#08766d]/15 aria-invalid:border-[#c24b3a] aria-invalid:ring-[#c24b3a]/15"
          id="password"
          placeholder="Enter your password"
          type="password"
        />
        {errors.password ? (
          <p
            className="text-sm text-[#a63f32]"
            id="password-error"
            role="alert"
          >
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <Button
        className="h-12 w-full bg-[#08766d] text-base hover:bg-[#065d57]"
        disabled={loginMutation.isPending}
        type="submit"
      >
        {loginMutation.isPending ? "Signing in…" : "Sign in to Jamii"}
      </Button>
    </form>
  );
}
