"use client";

import { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  getUserDetails,
} from "../../lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  profileImage?: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userReservations, setUserReservations] = useState<any[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers();
        console.log(result.data);
        setUsers(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
const [userToDelete, setUserToDelete] = useState<User | null>(null);

const handleDeleteUser = async () => {
  if (!userToDelete) return;

  try {
    await deleteUser(userToDelete._id);

    setUsers((prev) =>
      prev.filter((user) => user._id !== userToDelete._id)
    );

    setUserToDelete(null);
  } catch (error) {
    console.error(error);

    setUserToDelete(null);
  }
};
const handleViewUser = async (user: User) => {
  try {
    const result = await getUserDetails(user._id);
    console.log(result.data.reservations);

    setSelectedUser(result.data.user);
    setUserReservations(result.data.reservations);
  } catch (error) {
    console.error(error);
  }
};
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
                       <button
 onClick={() => handleViewUser(user)}
  className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
>
  👁 View
</button>

                       <button
  onClick={() => setUserToDelete(user)}
  className="rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100"
>
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
      {/* View User Modal */}
{selectedUser && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
   <div className="w-[900px] max-w-[95vw] rounded-2xl bg-white p-8 shadow-xl">

      {/* Title */}
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
        User Details
      </h2>

      {/* Profile Picture */}
      <div className="mb-6 flex justify-center">
        {selectedUser.profileImage ? (
         <img
  src={`http://localhost:5050/${selectedUser.profileImage}`}
  alt={selectedUser.name}
  className="h-28 w-28 rounded-full object-cover border-4 border-orange-100"
/>
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-100 text-3xl font-bold text-orange-600">
            {selectedUser.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-center text-xl font-semibold text-gray-900">
        {selectedUser.name}
      </h3>

      {/* Role */}
      <div className="mt-2 flex justify-center">
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            selectedUser.role === "admin"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {selectedUser.role}
        </span>
      </div>

      {/* Information */}
      <div className="mt-8 space-y-4">

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Email</span>
          <span className="text-gray-900">
            {selectedUser.email}
          </span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Phone</span>
          <span className="text-gray-900">
            {selectedUser.phoneNumber}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Joined</span>
          <span className="text-gray-900">
            {new Date(selectedUser.createdAt).toLocaleDateString()}
          </span>
        </div>
<div className="border-t pt-4">
  <h4 className="mb-3 text-lg font-semibold text-gray-900">
    Reservations
  </h4>

  {userReservations.length === 0 ? (
    <p className="text-sm text-gray-500">
      No reservations found.
    </p>
  ) : (
    <div className="space-y-3">
      {userReservations.map((reservation: any) => (
        <div
          key={reservation._id}
          className="rounded-lg border border-gray-200 bg-gray-50 p-4"
        >
          <p className="text-gray-800">
            <strong>Table:</strong> {reservation.table.tableNumber}
          </p>

          <p className="text-gray-800">
            <strong>Date:</strong>{" "}
            {new Date(reservation.reservationDate).toLocaleDateString()}
          </p>

          <p className="text-gray-800">
            <strong>Time:</strong> {reservation.reservationTime}
          </p>

          <p className="text-gray-800">
            <strong>Guests:</strong> {reservation.numberOfGuests}
          </p>

          <p className="text-gray-800">
            <strong>Status:</strong> {reservation.status}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

      </div>

      {/* Close */}
      <button
        onClick={() => setSelectedUser(null)}
        className="mt-8 w-full rounded-lg bg-orange-500 py-3 font-medium text-white hover:bg-orange-600"
      >
        Close
      </button>

    </div>
  </div>
)}
{userToDelete && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900">
        Delete User
      </h2>

      <p className="mt-4 text-gray-600">
        Are you sure you want to permanently delete{" "}
        <span className="font-semibold text-red-600">
          {userToDelete.name}
        </span>
        ?
      </p>

      <div className="mt-8 flex justify-end gap-3">
      <button
  onClick={() => setUserToDelete(null)}
  className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
>
  Cancel
</button>

        <button
          onClick={handleDeleteUser}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}