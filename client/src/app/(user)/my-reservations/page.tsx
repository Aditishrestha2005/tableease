"use client";

import { useEffect, useState } from "react";
import {
  getMyReservations,
  cancelReservation,
} from "../../lib/api";

interface Reservation {
  _id: string;
  reservationDate: string;
  reservationTime: string;
  numberOfGuests: number;
  status: string;
  table: {
    tableNumber: number;
    capacity: number;
    location: string;
  };
}

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);

  async function loadReservations() {
    try {
      const response = await getMyReservations();
      setReservations(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load reservations.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReservations();
  }, []);

  function handleCancelClick(id: string) {
    setSelectedReservationId(id);
    setShowCancelModal(true);
  }

  async function confirmCancel() {
    if (!selectedReservationId) return;

    try {
      const response = await cancelReservation(selectedReservationId);

      alert(response.message);

      setShowCancelModal(false);
      setSelectedReservationId(null);

      loadReservations();
    } catch (error: any) {
      alert(error.message);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm font-medium text-neutral-600">
        Loading reservations...
      </div>
    );
  }

  return (
    <main className="w-full px-6 py-4 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          My Reservations
        </h1>

        <p className="mt-2 text-sm text-neutral-500 font-light">
          View and manage your table reservations.
        </p>
      </div>

      {reservations.length === 0 ? (
        <div className="rounded-xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
          <p className="text-neutral-500">
            You don't have any reservations yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reservations.map((reservation) => {
            let statusClasses =
              "bg-yellow-50 text-yellow-700 border-yellow-100";

            if (
              reservation.status.toLowerCase() === "cancelled"
            ) {
              statusClasses =
                "bg-rose-50 text-rose-700 border-rose-100";
            }

            return (
              <div
                key={reservation._id}
                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h2 className="text-xl font-bold text-neutral-900">
                  Table {reservation.table.tableNumber}
                </h2>

                <div className="mt-4 space-y-2 text-sm text-neutral-600">
                  <p>
                    📅{" "}
                    {new Date(
                      reservation.reservationDate
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  <p>🕒 {reservation.reservationTime}</p>

                  <p>
                    👥 {reservation.numberOfGuests} Guest
                    {reservation.numberOfGuests > 1
                      ? "s"
                      : ""}
                  </p>

                  <p>
                    📍 {reservation.table.location}
                  </p>
                </div>

                <div className="mt-5">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide capitalize ${statusClasses}`}
                  >
                    {reservation.status}
                  </span>
                </div>

                {reservation.status === "Booked" && (
                  <button
                    onClick={() =>
                      handleCancelClick(reservation._id)
                    }
                    className="mt-6 w-full rounded-md bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Cancel Reservation
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-neutral-900">
              Cancel Reservation?
            </h2>

            <p className="mt-3 text-sm text-neutral-500">
              Are you sure you want to cancel this reservation?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSelectedReservationId(null);
                }}
                className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                No
              </button>

              <button
                onClick={confirmCancel}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}