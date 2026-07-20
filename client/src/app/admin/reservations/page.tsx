"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getAllReservations,
  cancelReservation,
} from "../../lib/api";

interface Reservation {
  _id: string;

  user: {
    _id: string;
    name: string;
    email: string;
  };

  table: {
    _id: string;
    tableNumber: number;
    capacity: number;
    location: string;
  };

  reservationDate: string;
  reservationTime: string;
  duration: number;
  numberOfGuests: number;
  status: "Booked"  | "Cancelled";
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const [reservationToCancel, setReservationToCancel] =
    useState<Reservation | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    try {
      setLoading(true);

      const result = await getAllReservations();

      setReservations(result.data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelReservation() {
    if (!reservationToCancel) return;

    try {
      await cancelReservation(reservationToCancel._id);

      setReservations((previous) =>
        previous.map((reservation) =>
          reservation._id === reservationToCancel._id
            ? {
                ...reservation,
                status: "Cancelled",
              }
            : reservation
        )
      );

      setReservationToCancel(null);
    } catch (error: any) {
      alert(error.message);
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "Booked":
        return "bg-blue-100 text-blue-700";


      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const matchesSearch =
        reservation.user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        reservation.user.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        reservation.table.tableNumber
          .toString()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        reservation.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reservations, search, statusFilter]);

  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Reservation Management
        </h1>

        <p className="mt-1 text-gray-600">
          View and manage restaurant reservations.
        </p>
      </div>

      <div className="mb-6 flex gap-4">

        <input
          type="text"
          placeholder="Search by customer or table..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-orange-500"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-orange-500 bg-white"
        >
          <option>All</option>
          <option>Booked</option>
          <option>Cancelled</option>
        </select>

      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr className="text-gray-700">

              <th className="px-6 py-4 text-left font-semibold">
                Customer
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Table
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Date
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Time
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Guests
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={7}
                  className="py-8 text-center text-gray-600 font-medium"
                >
                  Loading reservations...
                </td>

              </tr>

            ) : filteredReservations.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="py-8 text-center text-gray-600 font-medium"
                >
                  No reservations found.
                </td>

              </tr>

            ) : (

              filteredReservations.map((reservation) => (

                <tr
                  key={reservation._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    <div className="font-semibold text-gray-900">
                      {reservation.user.name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {reservation.user.email}
                    </div>

                  </td>

                  <td className="px-6 py-4 text-gray-800">
                    Table {reservation.table.tableNumber}
                  </td>

                  <td className="px-6 py-4 text-gray-800">
                    {new Date(
                      reservation.reservationDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-gray-800">
                    {reservation.reservationTime}
                  </td>

                  <td className="px-6 py-4 text-gray-800">
                    {reservation.numberOfGuests}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                        reservation.status
                      )}`}
                    >
                      {reservation.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          setSelectedReservation(
                            reservation
                          )
                        }
                        className="rounded bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600 font-medium"
                      >
                        View
                      </button>

                      {reservation.status !==
                        "Cancelled" && (

                        <button
                          onClick={() =>
                            setReservationToCancel(
                              reservation
                            )
                          }
                          className="rounded bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600 font-medium"
                        >
                          Cancel
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* View Reservation Modal */}
      {selectedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-xl">

            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Reservation Details
            </h2>

            <div className="space-y-4 text-gray-800">

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-900">
                  Customer
                </span>

                <span className="text-gray-800">
                  {selectedReservation.user.name}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-900">
                  Email
                </span>

                <span className="text-gray-800">
                  {selectedReservation.user.email}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-900">
                  Table
                </span>

                <span className="text-gray-800">
                  Table {selectedReservation.table.tableNumber}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-900">
                  Capacity
                </span>

                <span className="text-gray-800">
                  {selectedReservation.table.capacity} Guests
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-900">
                  Location
                </span>

                <span className="text-gray-800">
                  {selectedReservation.table.location}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-900">
                  Reservation Date
                </span>

                <span className="text-gray-800">
                  {new Date(
                    selectedReservation.reservationDate
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-900">
                  Reservation Time
                </span>

                <span className="text-gray-800">
                  {selectedReservation.reservationTime}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-900">
                  Guests
                </span>

                <span className="text-gray-800">
                  {selectedReservation.numberOfGuests}
                </span>
              </div>

              <div className="flex justify-between">

                <span className="font-semibold text-gray-900">
                  Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                    selectedReservation.status
                  )}`}
                >
                  {selectedReservation.status}
                </span>

              </div>

            </div>

            <div className="mt-8 flex justify-end">

              <button
                onClick={() =>
                  setSelectedReservation(null)
                }
                className="rounded-lg bg-gray-900 px-5 py-2 text-white hover:bg-gray-700 font-medium"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

      {/* Cancel Confirmation */}
      {reservationToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Cancel Reservation
            </h2>

            <p className="text-gray-700">

              Are you sure you want to cancel the reservation for{" "}

              <span className="font-semibold text-gray-900">
                {reservationToCancel.user.name}
              </span>

              ?

            </p>

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() =>
                  setReservationToCancel(null)
                }
                className="rounded bg-gray-900 px-5 py-2 text-white hover:bg-gray-700 font-medium"
              >
                Keep Reservation
              </button>

              <button
                onClick={handleCancelReservation}
                className="rounded bg-red-600 px-5 py-2 text-white hover:bg-red-700 font-medium"
              >
                Cancel Reservation
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}