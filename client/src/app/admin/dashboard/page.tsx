"use client";

import { useEffect, useState } from "react";
import { getAllActivityLogs } from "@/app/lib/api";
import axios from "axios";
import {
  Users,
  TableProperties,
  CalendarDays,
  ClipboardCheck,
  CircleX,
  Armchair,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface RecentUser {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface RecentReservation {
  _id: string;
  user: {
    name: string;
  };
  table: {
    tableNumber: number;
  };
  reservationDate: string;
  reservationTime: string;
  status: string;
}
interface ActivityLog {
  _id: string;
  action: string;
  description: string;
  createdAt: string;
}

interface DashboardData {
  totalUsers: number;
  totalTables: number;
  totalReservations: number;
  bookedReservations: number;
  cancelledReservations: number;
  availableTables: number;
  recentUsers: RecentUser[];
  recentReservations: RecentReservation[];
}

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState<ActivityLog[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5050/api/v1/dashboard/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDashboard(response.data.data);
        const logs = await getAllActivityLogs();

const securityActions = [
  "LOGIN_SUCCESS",
  "LOGIN_FAILED",
  "ACCOUNT_LOCKED",
  "PASSWORD_CHANGED",
  "MFA_ENABLED",
];

setSecurityAlerts(
  logs.data
    .filter((log: ActivityLog) =>
      securityActions.includes(log.action)
    )
    .slice(0, 5)
);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-red-500">
        Failed to load dashboard.
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      icon: Users,
    },
    {
      title: "Total Tables",
      value: dashboard.totalTables,
      icon: TableProperties,
    },
    {
      title: "Reservations",
      value: dashboard.totalReservations,
      icon: CalendarDays,
    },
    {
      title: "Booked",
      value: dashboard.bookedReservations,
      icon: ClipboardCheck,
    },
    {
      title: "Cancelled",
      value: dashboard.cancelledReservations,
      icon: CircleX,
    },
    {
      title: "Available Tables",
      value: dashboard.availableTables,
      icon: Armchair,
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-500">
                  {card.title}
                </h2>

                <Icon
                  size={24}
                  className="text-yellow-600"
                />
              </div>

              <p className="text-4xl font-bold text-gray-800">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Latest Users */}
      <div className="mt-10 rounded-xl bg-white p-6 shadow">
        <div className="mb-5 flex items-center justify-between">
         <h2 className="text-xl font-semibold text-gray-900">
  Latest Users
</h2>
<button
  onClick={() => router.push("/admin/users")}
  className="rounded-lg bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600"
>
  View All
</button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-3">Name</th>
              <th>Email</th>
              <th>Joined</th>
            </tr>
          </thead>

          <tbody>
            {(dashboard.recentUsers ?? []).map((user) => (
              <tr
                key={user._id}
                className="border-b last:border-none"
              >
           <td className="py-4 font-medium text-gray-900">
  {user.name}
</td>

<td className="text-gray-600">{user.email}</td>

<td className="text-gray-600">
  {new Date(
    user.createdAt
  ).toLocaleDateString()}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{/* Latest Reservations */}
<div className="mt-8 rounded-xl bg-white p-6 shadow">
  <div className="mb-5 flex items-center justify-between">
  <h2 className="text-xl font-semibold text-gray-900">
  Latest Reservations
</h2>

  <button
  onClick={() => router.push("/admin/reservations")}
  className="rounded-lg bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600"
>
  View All
</button>
  </div>

  <table className="w-full">
    <thead>
      <tr className="border-b text-left text-gray-500">
        <th className="py-3">Customer</th>
        <th>Table</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {(dashboard.recentReservations ?? []).map((reservation) => (
        <tr
          key={reservation._id}
          className="border-b last:border-none"
        >
         <td className="py-4 font-medium text-gray-900">
  {reservation.user.name}
</td>

<td className="text-gray-600">
  Table {reservation.table.tableNumber}
</td>

<td className="text-gray-600">
  {new Date(
    reservation.reservationDate
  ).toLocaleDateString()}
</td>

<td className="text-gray-600">{reservation.reservationTime}</td>
          <td>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                reservation.status === "Booked"
                  ? "bg-green-100 text-green-700"
                  : reservation.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {reservation.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
{/* Security Alerts */}
<div className="mt-8 rounded-xl bg-white p-6 shadow">
  <h2 className="mb-5 text-xl font-semibold text-gray-900">
    🚨 Security Alerts
  </h2>

  {securityAlerts.length === 0 ? (
    <p className="text-gray-500">
      No recent security alerts.
    </p>
  ) : (
    <div className="space-y-4">
      {securityAlerts.map((alert) => (
        <div
          key={alert._id}
          className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4"
        >
          <p className="font-semibold text-red-700">
            {alert.action}
          </p>

          <p className="text-gray-700">
            {alert.description}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {new Date(alert.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
}
