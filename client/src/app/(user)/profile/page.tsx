"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getProfile,
  updateProfile,
  exportProfile,
  importProfile,
  uploadProfileImage,
} from "@/app/lib/api";

interface Profile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  profileImage?: string;
  mfaEnabled: boolean;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
  name: "",
  phoneNumber: "",

});
const fileInputRef = useRef<HTMLInputElement>(null);
const importInputRef = useRef<HTMLInputElement>(null);
const router = useRouter();
const fetchProfile = async () => {
  try {
    const result = await getProfile();

    setProfile(result.data);
  } catch (error: any) {
    console.error(error);

    // Remove invalid token
    localStorage.removeItem("token");

    // Redirect to login
    router.replace("/login");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.replace("/login");
    return;
  }

  fetchProfile();
}, []);
const handleSave = async () => {
  try {
    await updateProfile(formData);

    await fetchProfile();

    setIsEditOpen(false);
  } catch (error) {
    console.error(error);
    alert("Failed to update profile.");
  }
};
const handleExport = async () => {
  try {
    const blob = await exportProfile();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "profile.json";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Failed to export profile.");
  }
};
const handleImport = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    const text = await file.text();

    const json = JSON.parse(text);

    await importProfile({
      name: json.name,
      phoneNumber: json.phoneNumber,
    });

    await fetchProfile();

    alert("Profile imported successfully.");
  } catch (error) {
    console.error(error);
    alert("Invalid profile file.");
    if (importInputRef.current) {
  importInputRef.current.value = "";
}
  }
};
const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    await uploadProfileImage(file);
    await fetchProfile();
  } catch (error) {
    console.error(error);
    alert("Failed to upload profile image.");
  }
};
  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center w-full">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full animate-ping rounded-full bg-orange-100 opacity-75"></div>
          <div className="h-6 w-6 rounded-full bg-orange-500"></div>
        </div>
      </div>
    );
  }

  const fallbackName = profile?.name || "User";
  const initials = fallbackName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "AS";

  return (
    <div className="w-full min-h-screen px-6 py-8 sm:px-10 sm:py-10">
      
      {/* Account Workspace Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-gray-100 pb-8 sm:flex-row sm:items-center w-full">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Account Workspace</h1>
          <p className="mt-2 text-base text-gray-500">
            View status, modify credentials, and control access permissions.
          </p>
        </div>
      </div>

      {/* Workspace Content Matrix */}
      <div className="space-y-10 w-full">
        
        {/* Section 1: Profile Information */}
        <div className="w-full space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="text-xl">👤</span>
            <h2 className="text-lg font-bold text-gray-800 tracking-wide">Profile Information</h2>
          </div>

          <div className="w-full rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            {/* Upper Identity Blocks */}
            <div className="p-8 border-b border-gray-100 flex flex-col items-center justify-between gap-6 sm:flex-row w-full">
              <div className="flex flex-col items-center gap-8 sm:flex-row">
                {/* Avatar */}
                <div className="relative group">
    <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50 to-orange-100 shadow-inner">
  {profile?.profileImage ? (
<img
  src={`http://localhost:5050/${profile.profileImage}`}
  alt="Profile"
  className="h-full w-full object-cover"
/>
  ) : (
    <span className="text-3xl font-bold text-orange-600">
      {initials}
    </span>
  )}
</div>
                 <button
  onClick={() => fileInputRef.current?.click()}
  className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-md transition hover:bg-gray-50 hover:text-gray-700"
>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    </svg>
                  </button>
                </div>

                {/* Info Labels */}
                <div className="text-center sm:text-left space-y-2">
                  <div className="flex flex-col items-center gap-3 sm:flex-row">
                    <h2 className="text-2xl font-bold text-gray-900">{fallbackName}</h2>
                    <span className="rounded-md bg-orange-100/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
                      {profile?.role || "User"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-medium">ID: {profile?.id || "-"}</p>
                </div>
              </div>
            </div>

            {/* Core Data Fields */}
            <div className="px-8 py-4 bg-white divide-y divide-gray-100 w-full">
              <div className="grid py-6 sm:grid-cols-4 gap-4 items-center w-full">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</span>
                <span className="text-lg font-semibold text-gray-800 sm:col-span-3 break-all">
                  {profile?.email || "aditishrestha2005@gmail.com"}
                </span>
              </div>

              <div className="grid py-6 sm:grid-cols-4 gap-4 items-center w-full">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</span>
                <span className="text-lg font-semibold text-gray-800 sm:col-span-3">
                  {profile?.phoneNumber || "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer for Profile Workspace */}
          <div className="flex items-center gap-3 pt-2">
           <button
  onClick={() => {
    setFormData({
      name: profile?.name || "",
      phoneNumber: profile?.phoneNumber || "",
    });

    setIsEditOpen(true);
  }}
              className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600 transition shadow-sm"
            >
              Modify Data
            </button>
            <button
              onClick={handleExport}
              className="rounded-xl bg-white border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition"
            >
              Export Profile
            </button>
            <button
  onClick={() => importInputRef.current?.click()}
  className="rounded-xl bg-white border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition"
>
  Import Profile
</button>
          </div>
        </div>

        {/* Section 2: Security Credentials */}
        <div className="w-full space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="text-xl">🔒</span>
            <h2 className="text-lg font-bold text-gray-800 tracking-wide">Security</h2>
          </div>

          <div className="w-full rounded-3xl border border-gray-100 bg-white p-2 shadow-sm">
         <div
  onClick={() => router.push("/profile/security")}
  className="flex flex-col justify-between gap-6 rounded-2xl p-6 sm:flex-row sm:items-center w-full cursor-pointer hover:bg-gray-50/60 transition group"
>
              <div className="space-y-1.5">
                {/* Changed label from Two-Factor Authentication (MFA) to Security */}
                <span className="block text-base font-bold text-gray-800">
                  Security
                </span>
                <p className="text-sm text-gray-500 max-w-2xl">
                  Manage your password, multi-factor authentication, and account protection.
                </p>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <span className={`inline-flex items-center rounded-full px-3.5 py-1 text-xs font-bold tracking-wide ring-1 ring-inset ${
                  profile?.mfaEnabled 
                    ? "bg-green-50 text-green-700 ring-green-600/20" 
                    : "bg-red-50 text-red-700 ring-red-600/20"
                }`}>
                  {profile?.mfaEnabled ? "Active" : "Inactive"}
                </span>
                
                {/* Arrow Navigation Indicator */}
                <span className="text-gray-300 group-hover:text-gray-500 text-xl font-medium font-mono transition pl-2">
                  &gt;
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

<input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  className="hidden"
/>  
<input
  ref={importInputRef}
  type="file"
  accept=".json,application/json"
  onChange={handleImport}
  className="hidden"
/>

      {/* Edit Profile Modal Container */}
      {isEditOpen && (
        
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Edit Profile Details</h2>
             <button
  onClick={() => setIsEditOpen(false)}
>
  ✕
</button>
            </div>

      <div className="p-8 space-y-6">
  {/* Full Name */}
  <div>
    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-400">
      Full Name
    </label>
  <input
  type="text"
  value={formData.name}
  onChange={(e) =>
    setFormData({ ...formData, name: e.target.value })
  }
  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-3.5 text-base text-gray-800 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 transition"
/>
  </div>

  {/* Email Address */}
  <div>
    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-400">
      Email Address
    </label>
    <input
      type="email"
      value={profile?.email || ""}
      readOnly
      className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-5 py-3.5 text-base text-gray-500"
    />
  </div>

{/* Phone Number */}
<div>
  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-400">
    Phone Number
  </label>


  <input
    type="text"
    value={formData.phoneNumber}
    onChange={(e) =>
      setFormData({
        ...formData,
        phoneNumber: e.target.value,
      })
    }
    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-3.5 text-base text-gray-800 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 transition"
  />
</div>
</div> 




<div className="bg-gray-50/50 px-8 py-5 flex justify-end gap-3 border-t border-gray-100">
  <button
    onClick={() => setIsEditOpen(false)}
    className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm"
  >
    Cancel
  </button>

  <button
    onClick={handleSave}
    className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition shadow-sm"
  >
    Save Changes
  </button>
</div>
          </div>
        </div>
      )
      }
    </div>
  );
}