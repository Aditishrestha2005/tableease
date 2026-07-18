"use client";

import { useState } from "react";
import Link from "next/link";
import { requestPasswordReset } from "../../lib/api";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const response = await requestPasswordReset(email);
      setMessage(
        response.message ||
          "If the email is registered, a reset link has been sent."
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    // Standard centralized card layout container matching Login/Register forms inside the panel wrapper
    <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl border border-neutral-100">
      {/* Heading Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Forgot Password
        </h1>

        <p className="mt-3 text-sm text-neutral-500 font-light">
          Enter your email address and we'll send you a password reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
          />
        </div>

        {/* Feedback Messages */}
        {message && (
          <p className="text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2">
            {message}
          </p>
        )}

        {error && (
          <p className="text-sm font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-neutral-950 py-3 text-sm font-semibold text-white tracking-wide transition hover:bg-yellow-600 active:bg-yellow-700 disabled:opacity-50 shadow-sm"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {/* Back to Login Redirect Link */}
      <div className="mt-8 text-center">
        <Link
          href="/login"
          className="text-sm font-semibold text-yellow-600 hover:text-yellow-700 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}