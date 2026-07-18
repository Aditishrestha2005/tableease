"use client";

import { useState } from "react";
import Link from "next/link";
import PasswordInput from "./PasswordInput";
import { useRouter } from "next/navigation";
import { registerUser } from "../../lib/api";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
    const router = useRouter();

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    };


 

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Phone number must contain exactly 10 digits.";
    }

    if (formData.password.length < 12) {
      newErrors.password =
        "Password must be at least 12 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-neutral-100 bg-white p-10 shadow-xl">
      {/* Logo Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-[0.2em] text-neutral-900">
          LUMINA
        </h1>

        <p className="mt-3 text-sm font-light text-neutral-500">
          Create your Lumina account.
        </p>
      </div>

      <form
        noValidate
        className="space-y-5"
   onSubmit={async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  try {
    const response = await registerUser({
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
    });

    console.log(response);

    alert("Registration successful!");
    router.push("/login");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Registration failed.");
    }
  }
}}
      >
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
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

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Phone Number
          </label>

          <input
            type="text"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                phoneNumber: e.target.value,
              }))
            }
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
          />

          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phoneNumber}
            </p>
          )}
        </div>

        {/* Password */}
        <PasswordInput
          label="Password"
          placeholder="Create a password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          required
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-600">
            {errors.password}
          </p>
        )}

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-neutral-950 py-3 text-sm font-semibold tracking-wide text-white shadow-sm transition hover:bg-yellow-600 active:bg-yellow-700"
        >
          Register
        </button>
      </form>

      {/* Login Redirect */}
      <p className="mt-8 text-center text-sm font-light text-neutral-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="ml-1 font-semibold text-yellow-600 hover:text-yellow-700 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}