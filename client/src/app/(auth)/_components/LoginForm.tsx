"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordInput from "./PasswordInput";
import { loginUser } from "../../lib/api";
import ReCAPTCHA from "react-google-recaptcha";

console.log(
  "Site key:",
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
);
export default function LoginForm() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

const [formData, setFormData] = useState({
  email: "",
  password: "",
  captchaToken: "",
});

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);

      console.log(response);

      if (response.data?.passwordExpired) {
        router.push("/change-password");
        return;
      }

   if (response.data?.mfaRequired) {
  localStorage.setItem("mfaEmail", response.data.email);
  router.push("/mfa");
  return;
}

     localStorage.setItem("token", response.data.token);
localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

if (response.data.user.role === "admin") {
  router.push("/admin/dashboard");
} else {
  router.push("/dashboard");
}
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-neutral-100 bg-white p-10 shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-[0.2em] text-neutral-900">
          LUMINA
        </h1>

        <p className="mt-3 text-sm font-light text-neutral-500">
          Welcome back! Sign in to your account.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
          />
        </div>

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="text-right">
        <Link
  href="/forget-password"
  className="text-xs font-medium text-yellow-600 hover:text-yellow-700 hover:underline"
>
  Forgot Password?
</Link>
        </div>
        <ReCAPTCHA
  ref={recaptchaRef}
  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
  onChange={(token) =>
    setFormData((prev) => ({
      ...prev,
      captchaToken: token ?? "",
    }))
  }
/>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-neutral-950 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm font-light text-neutral-600">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="ml-1 font-semibold text-yellow-600 hover:text-yellow-700 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}