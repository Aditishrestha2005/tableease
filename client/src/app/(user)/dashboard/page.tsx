"use client";

import { useEffect, useState } from "react";
import { getUserDashboard } from "../../lib/api";

interface Reservation {
  _id: string;
  reservationDate: string;
  reservationTime: string;
  status: string;
  table: {
    tableNumber: number;
  };
}

interface DashboardData {
  welcomeMessage: string;
  totalReservations: number;
  bookedReservations: number;
  cancelledReservations: number;
  recentBookings: Reservation[];
}

export default function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await getUserDashboard();
        setDashboard(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm font-medium text-neutral-600">
        Loading Dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="text-sm font-medium text-red-600 py-12">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    // Changed max-w-7xl mx-auto to w-full for fluid left-alignment
    <div className="space-y-8 w-full px-6">
      {/* Welcome Heading */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          {dashboard.welcomeMessage}
        </h1>

        <p className="mt-2 text-sm text-neutral-500 font-light">
          Here's an overview of your reservations.
        </p>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          title="Total Reservations"
          value={dashboard.totalReservations}
        />

        <StatCard
          title="Booked"
          value={dashboard.bookedReservations}
        />

        <StatCard
          title="Cancelled"
          value={dashboard.cancelledReservations}
        />
      </div>

      {/* Recent Reservations Panel */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-neutral-100">
        <h2 className="mb-5 text-xl font-bold text-neutral-900 tracking-tight">
          Recent Reservations
        </h2>

        {dashboard.recentBookings.length === 0 ? (
          <p className="text-sm text-neutral-500 font-light py-4">
            No reservations yet.
          </p>
        ) : (
          <div className="space-y-4">
            {dashboard.recentBookings.map((booking) => {
              let statusClasses = "bg-yellow-50 text-yellow-700 border-yellow-100";
              if (booking.status.toLowerCase() === "confirmed") {
                statusClasses = "bg-emerald-50 text-emerald-700 border-emerald-100";
              } else if (booking.status.toLowerCase() === "cancelled") {
                statusClasses = "bg-rose-50 text-rose-700 border-rose-100";
              }

              return (
                <div
                  key={booking._id}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4 transition hover:shadow-sm"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-neutral-900">
                      Table {booking.table.tableNumber}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-neutral-500 font-light">
                      <p className="flex items-center gap-1">
                        <span>📅</span>
                        {new Date(booking.reservationDate).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
})}
                      </p>
                      <p className="flex items-center gap-1">
                        <span>🕒</span>
                        {booking.reservationTime}
                      </p>
                    </div>
                  </div>

                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide capitalize ${statusClasses}`}>
                    {booking.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-neutral-200/80">
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-extrabold text-neutral-900 tracking-tight">
        {value}
      </h2>
    </div>
  );
}