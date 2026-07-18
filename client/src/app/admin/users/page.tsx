"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "../../lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers();
        setUsers(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const filteredUsers = users.filter(
  (user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Users Management
        </h1>
        <p className="text-gray-600 mt-1">
          Manage registered users.
        </p>
      </div>

{/* Search Bar */}
      <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="🔍 Search by name or email"
  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
/>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left">Avatar</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Joined</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
             filteredUsers.map((user) => {
                const initials = user.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase();

                return (
                  <tr
                    key={user._id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    {/* Avatar */}
                    <td className="p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                        {initials}
                      </div>
                    </td>

                    {/* Name */}
                    <td className="p-4 font-medium text-gray-900">
                      {user.name}
                    </td>

                    {/* Email */}
                    <td className="p-4 text-gray-600">
                      {user.email}
                    </td>

                    {/* Phone */}
                    <td className="p-4 text-gray-600">
                      {user.phoneNumber}
                    </td>

                    {/* Role */}
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="p-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100">
                          👁 View
                        </button>

                        <button className="rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100">
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}