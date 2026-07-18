"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAvailableTables } from "../../lib/api";

interface Table {
  _id: string;
  tableNumber: number;
  capacity: number;
  location: string;
}

export default function BookTablePage() {
    const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);

  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }

    try {
      setLoading(true);

      const response = await getAvailableTables(
        date,
        time,
        guests
      );

      setTables(response.data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    // Replaced mx-auto max-w-6xl with w-full px-6 for clean left alignment matching the layout grid
    <main className="w-full text-left px-6 py-4 space-y-8">
      
      {/* Page Heading Section with Enhanced Contrast */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Book a Table
        </h1>

        <p className="mt-2 text-sm text-neutral-500 font-light">
          Find an available table and reserve it.
        </p>
      </div>

      {/* Search Form Panel */}
      <div className="grid gap-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Reservation Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Reservation Time
          </label>

          <input
            type="time"
            step={1800}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Guests
          </label>

          <input
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full rounded-md bg-neutral-950 py-2.5 text-sm font-semibold text-white tracking-wide transition hover:bg-yellow-600 active:bg-yellow-700 shadow-sm"
          >
            {loading ? "Searching..." : "Search Tables"}
          </button>
        </div>
      </div>

      {/* Available Tables Panel Grid */}
      {tables.length > 0 && (
        <div className="mt-4 space-y-6">
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Available Tables
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tables.map((table) => (
              <div
                key={table._id}
                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                  Table {table.tableNumber}
                </h3>

                <div className="mt-3 space-y-1.5 text-sm text-neutral-600 font-light">
                  <p className="flex items-center gap-2">
                    <span>👥</span> Capacity: <span className="font-normal text-neutral-800">{table.capacity} guests</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <span>📍</span> Location: <span className="font-normal text-neutral-800">{table.location}</span>
                  </p>
                </div>

                <button
  onClick={() =>
    router.push(
      `/reservation-summary?tableId=${table._id}&tableNumber=${table.tableNumber}&capacity=${table.capacity}&location=${table.location}&date=${date}&time=${time}&guests=${guests}`
    )
  }
  className="mt-6 w-full rounded-md bg-yellow-600 py-2.5 text-sm font-semibold text-white tracking-wide transition hover:bg-yellow-700 active:bg-yellow-800 shadow-sm"
>
  Select Table
</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}