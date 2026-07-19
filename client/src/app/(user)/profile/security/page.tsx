"use client";

import { useEffect, useMemo, useState } from "react";
import zxcvbn from "zxcvbn";
import { Eye, EyeOff } from "lucide-react";

export default function SecurityPage() {
  useEffect(() => {
  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5050/api/v1/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMfaEnabled(data.data.mfaEnabled);
      }
    } catch (error) {
      console.error(error);
    }
  };

  loadProfile();
}, []);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");  
const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [currentPasswordError, setCurrentPasswordError] = useState("");
const [newPasswordError, setNewPasswordError] = useState("");
const [confirmPasswordError, setConfirmPasswordError] = useState("");
const [successMessage, setSuccessMessage] = useState("");
const [mfaCode, setMfaCode] = useState("");
const [showMfaModal, setShowMfaModal] = useState(false);
const [qrCode, setQrCode] = useState("");
const [mfaEnabled, setMfaEnabled] = useState(false);
const passwordStrength = useMemo(() => {
  return newPassword ? zxcvbn(newPassword) : null;
}, [newPassword]);
const handleChangePassword = async () => {
  // Clear previous errors
  setCurrentPasswordError("");
  setNewPasswordError("");
  setConfirmPasswordError("");
  setSuccessMessage("");

  // Current password required
  if (!currentPassword.trim()) {
    setCurrentPasswordError("Please enter your current password.");
    return;
  }

  // New password required
  if (!newPassword.trim()) {
    setNewPasswordError("Please enter a new password.");
    return;
  }

  // Confirm password required
  if (!confirmPassword.trim()) {
    setConfirmPasswordError("Please confirm your new password.");
    return;
  }

  // New password cannot be the same
  if (currentPassword === newPassword) {
    setNewPasswordError(
      "Your new password must be different from your current password."
    );
    return;
  }

  // Passwords must match
  if (newPassword !== confirmPassword) {
    setConfirmPasswordError("Passwords do not match.");
    return;
  }

  // Password strength
  if (!passwordStrength || passwordStrength.score < 3) {
    setNewPasswordError(
      "Please choose a stronger password."
    );
    return;
  }

 try {
const token = localStorage.getItem("token");

const response = await fetch(
  "http://localhost:5050/api/v1/auth/change-password",
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
      confirmPassword,
    }),
  }
);




const data = await response.json();

if (!response.ok) {
  throw new Error(data.message);
}

setSuccessMessage("Password changed successfully. Please log in again.");

setCurrentPassword("");
setNewPassword("");
setConfirmPassword("");

setTimeout(() => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";
}, 2000);

} catch (error: any) {
  if (error instanceof Error) {
    const message = error.message;

    if (message.includes("Current password")) {
      setCurrentPasswordError(message);
    } else if (message.includes("same")) {
      setNewPasswordError(message);
    } else if (message.includes("reuse")) {
      setNewPasswordError(message);
    } else {
      setConfirmPasswordError(message);
    }
  }
}
};

const handleGenerateMfa = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5050/api/v1/mfa/generate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setQrCode(data.data.qrCode);
    setShowMfaModal(true);
  } catch (error: any) {
    alert(error.message);
  }
};
const handleVerifyMfa = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5050/api/v1/mfa/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token: mfaCode,
        }),
      }
    );

  const data = await response.json();

console.log("Verify Response:", data);

if (!response.ok) {
  throw new Error(data.message);
}

alert("MFA enabled successfully!");

setMfaEnabled(true);

console.log("MFA state is now TRUE");

setShowMfaModal(false);
  } catch (error: any) {
    alert(error.message);
  }
};
    return (
    <div className="w-full min-h-screen px-6 py-8 sm:px-10 sm:py-10">
      
      {/* Header Panel */}
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-gray-100 pb-8 sm:flex-row sm:items-center w-full">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Security Settings</h1>
          <p className="mt-2 text-base text-gray-500">
            Manage your password, multi-factor authentication, and account security.
          </p>
        </div>
      </div>

      {/* Main Settings Panel */}
      <div className="w-full rounded-3xl border border-gray-100 bg-white p-2 shadow-sm divide-y divide-gray-100">
        
        {/* Row 1: Change Password Option */}
        <div className="flex flex-col justify-between gap-6 p-8 sm:flex-row sm:items-center w-full hover:bg-gray-50/40 transition duration-150 rounded-t-2xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl border border-orange-100 shadow-sm text-orange-600">
              🔑
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-gray-800">Change Password</h2>
              <p className="text-sm text-gray-500 max-w-2xl">
                Update your account password regularly to keep your credentials protected against unauthorized access.
              </p>
            </div>
          </div>

          <div className="flex items-center self-end sm:self-auto shrink-0">
         <button
  onClick={() => setShowChangePasswordModal(true)}
  className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition shadow-sm"
>
  Change Password
</button>
          </div>
        </div>

        {/* Row 2: Multi-Factor Authentication Option */}
        <div className="flex flex-col justify-between gap-6 p-8 sm:flex-row sm:items-center w-full hover:bg-gray-50/40 transition duration-150 rounded-b-2xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl border border-blue-100 shadow-sm text-blue-600">
              🛡️
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-bold text-gray-800">Multi-Factor Authentication (MFA)</h2>
                <span
  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide ring-1 ring-inset ${
    mfaEnabled
      ? "bg-green-50 text-green-700 ring-green-600/10"
      : "bg-red-50 text-red-700 ring-red-600/10"
  }`}
>
  {mfaEnabled ? "Enabled" : "Disabled"}
</span>
              </div>
           <p className="max-w-2xl text-sm text-gray-500">
  Add an extra layer of protection by requiring a security verification
  code alongside your traditional password.
</p>
            </div>
          </div>

          <div className="flex items-center self-end sm:self-auto shrink-0">
<button
onClick={handleGenerateMfa}
  className="rounded-xl bg-white border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition"
>
  Configure MFA
</button>
          </div>
        </div>
      </div>

      {showChangePasswordModal && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
       <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">

        <div className="border-b border-gray-100 pb-4">
  <h2 className="text-2xl font-bold text-gray-900">
    Change Password
  </h2>

  <p className="mt-2 text-sm text-gray-500">
    Enter your current password and choose a strong new password.
  </p>
</div>

<div className="mt-6 space-y-5">
{/* Current Password */}
<div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    Current Password
  </label>

  <div className="relative">
<input
  type={showCurrentPassword ? "text" : "password"}
  value={currentPassword}
  onChange={(e) => {
    setCurrentPassword(e.target.value);
    if (currentPasswordError) {
      setCurrentPasswordError("");
    }
  }}
  placeholder="Enter your current password"
  className={`w-full rounded-xl px-4 py-3 pr-12 text-gray-800 bg-white outline-none transition
    ${
      currentPasswordError
        ? "border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        : "border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
    }`}
 />
    <button
      type="button"
      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
    >
      {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>

  {currentPasswordError && (
    <p className="mt-2 text-sm font-medium text-red-600">
      {currentPasswordError}
    </p>
  )}
</div>

 {/* New Password */}
<div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    New Password
  </label>
    



  <div className="relative">
    <input
      type={showNewPassword ? "text" : "password"}
      value={newPassword}
    onChange={(e) => {
  setNewPassword(e.target.value);
  if (newPasswordError) {
    setNewPasswordError("");
  }
}}  
      placeholder="Enter your new password"
      className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-gray-800 bg-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 selection:bg-orange-500 selection:text-white"
    />

    <button
      type="button"
      onClick={() => setShowNewPassword(!showNewPassword)}
     className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
    >
      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
  
</div>
{passwordStrength && (
  <div className="mt-3">
    <div className="h-2 w-full rounded-full bg-gray-200">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${
          passwordStrength.score === 0
            ? "w-1/5 bg-red-500"
            : passwordStrength.score === 1
            ? "w-2/5 bg-orange-500"
            : passwordStrength.score === 2
            ? "w-3/5 bg-yellow-500"
            : passwordStrength.score === 3
            ? "w-4/5 bg-blue-500"
            : "w-full bg-green-500"
        }`}
      />
    </div>

    <p className="mt-2 text-sm text-gray-600">
      Strength:{" "}
      <span className="font-semibold">
        {["Very Weak", "Weak", "Fair", "Strong", "Very Strong"][
          passwordStrength.score
        ]}
      </span>
    </p>
  </div>
)}

{newPasswordError && (
  <p className="mt-2 text-sm text-red-600">
    {newPasswordError}
  </p>
)}

{/* Confirm Password */}
<div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    Confirm New Password
  </label>

  <div className="relative">
    <input
      type={showConfirmPassword ? "text" : "password"}
      value={confirmPassword}
    onChange={(e) => {
  setConfirmPassword(e.target.value);
  if (confirmPasswordError) {
    setConfirmPasswordError("");
  }
}}
      placeholder="Confirm your new password"
      className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-gray-800 bg-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 selection:bg-orange-500 selection:text-white"
    />

    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
    >
      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
</div>

</div>

<div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">

  <button
    onClick={() => setShowChangePasswordModal(false)}
    className="rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50"
  >
    Cancel
  </button>
<button
  onClick={handleChangePassword}
  className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
>
  Update Password
</button>

</div>

          </div>
        </div>
      )}
      
{showMfaModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

      <h2 className="text-2xl font-bold text-gray-900">
        Configure Multi-Factor Authentication
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Scan the QR code with Google Authenticator or Microsoft Authenticator,
        then enter the 6-digit code below.
      </p>

      {qrCode ? (
        <img
          src={qrCode}
          alt="MFA QR Code"
          className="mx-auto mt-6 h-56 w-56"
        />
      ) : (
        <div className="mt-6 text-center text-gray-500">
          Loading QR Code...
        </div>
      )}

      <input
        type="text"
        value={mfaCode}
        onChange={(e) => setMfaCode(e.target.value)}
        placeholder="Enter 6-digit code"
        className="mt-6 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 bg-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      />

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setShowMfaModal(false)}
          className="rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>

    <button
  onClick={handleVerifyMfa}
  className="rounded-xl bg-orange-500 px-5 py-2.5 text-white hover:bg-orange-600"
>
  Enable MFA
</button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}