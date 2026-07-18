"use client";

import { useState } from "react";
import { resetPassword } from "../../lib/api";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({
  token,
}: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await resetPassword(
        token,
        newPassword
      );

      setMessage(response.message);
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
    <div className="mx-auto mt-10 max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Reset Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            New Password
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="w-full rounded-md border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="w-full rounded-md border px-4 py-3"
          />
        </div>

        {message && (
          <p className="text-green-600">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-black py-3 text-white hover:bg-yellow-600"
        >
          {loading
            ? "Updating..."
            : "Reset Password"}
        </button>
      </form>
    </div>
  );
}