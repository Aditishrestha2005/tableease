"use client";

import Link from "next/link";
import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl border border-neutral-100">
      {/* Logo Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-[0.2em] text-neutral-900">
          LUMINA
        </h1>

        <p className="mt-3 text-sm text-neutral-500 font-light">
          Create your Lumina account.
        </p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Phone Number
          </label>

          <input
            type="text"
            placeholder="Enter your phone number"
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
          />
        </div>

        <PasswordInput
  label="Password"
  placeholder="Create a password"
  name="password"
/>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-neutral-950 py-3 text-sm font-semibold text-white tracking-wide transition hover:bg-yellow-600 active:bg-yellow-700 shadow-sm"
        >
          Register
        </button>
      </form>

      {/* Login Redirect Link */}
      <p className="mt-8 text-center text-sm text-neutral-600 font-light">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-yellow-600 hover:text-yellow-700 hover:underline ml-1"
        >
          Login
        </Link>
      </p>
    </div>
  );
}