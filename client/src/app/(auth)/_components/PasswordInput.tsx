"use client";
import { useMemo, useState } from "react";
import zxcvbn from "zxcvbn";

interface PasswordInputProps {
  label: string;
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function PasswordInput({
  label,
  placeholder,
  name,
  value,
  onChange,
  required = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const strength = useMemo(() => {
  return value ? zxcvbn(value) : null;
}, [value]);

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-neutral-800">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 pr-16 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-500 hover:text-neutral-900"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {value && (
        <div className="mt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
            <div
              className={`h-full transition-all ${
                strength?.score === 0
                  ? "w-1/5 bg-red-500"
                  : strength?.score === 1
                  ? "w-2/5 bg-orange-500"
                  : strength?.score === 2
                  ? "w-3/5 bg-yellow-500"
                  : strength?.score === 3
                  ? "w-4/5 bg-lime-500"
                  : "w-full bg-green-600"
              }`}
            />
          </div>

          <p className="mt-2 text-xs text-neutral-600">
            Strength:{" "}
            <span className="font-semibold">
              {strength?.score === 0 && "Very Weak"}
              {strength?.score === 1 && "Weak"}
              {strength?.score === 2 && "Fair"}
              {strength?.score === 3 && "Good"}
              {strength?.score === 4 && "Strong"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}