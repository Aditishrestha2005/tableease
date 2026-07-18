"use client";

import { useSearchParams } from "next/navigation";
import { initiatePayment } from "../../lib/api";

export default function ReservationSummaryPage() {
  const searchParams = useSearchParams();

  const tableId = searchParams.get("tableId");
  const tableNumber = searchParams.get("tableNumber");
  const capacity = searchParams.get("capacity");
  const location = searchParams.get("location");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const guests = searchParams.get("guests");

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  return (
    <main className="w-full text-left px-6 py-10">
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">

        {/* Header */}
        <div className="border-b border-neutral-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-neutral-900">
            Reservation Summary
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Please review your reservation before proceeding to payment.
          </p>
        </div>

        {/* High-Visibility Policy Banner (Moved to the top) */}
        <div className="bg-amber-50/70 border-b border-neutral-200 px-8 py-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            ⚠️ Reservation Policy
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-700">
            <li>
              • Reservation fee is <strong className="font-semibold text-neutral-900">non-refundable</strong>.
            </li>
            <li>
              • Reservation will only be confirmed after successful payment.
            </li>
            <li>
              • Please arrive at least 15 minutes before your reservation time.
            </li>
          </ul>
        </div>

        {/* Details List */}
        <div className="space-y-5 px-8 py-8">
          <SummaryRow
            label="Reservation Date"
            value={formattedDate}
          />

          <SummaryRow
            label="Reservation Time"
            value={time || "-"}
          />

          <SummaryRow
            label="Guests"
            value={`${guests} Guests`}
          />

          <SummaryRow
            label="Table"
            value={`Table ${tableNumber}`}
          />

          <SummaryRow
            label="Capacity"
            value={`${capacity} Guests`}
          />

          <SummaryRow
            label="Location"
            value={location || "-"}
          />

          {/* High-Contrast Pricing Row */}
          <div className="border-t border-neutral-200 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900">
                Reservation Fee
              </h2>
              <span className="text-2xl font-black text-yellow-600">
                NPR 100
              </span>
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex justify-end border-t border-neutral-200 bg-neutral-50 px-8 py-5">
          <button
     onClick={async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const response = await initiatePayment({
      amount: 10000,
      purchaseOrderId: `RES-${Date.now()}`,
      purchaseOrderName: "Lumina Table Reservation",

      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phoneNumber,
    });
localStorage.setItem(
  "reservationData",
  JSON.stringify({
    table: tableId,
    reservationDate: date,
    reservationTime: time,
    numberOfGuests: Number(guests),
  })
);
console.log(
  "Saved reservationData:",
  localStorage.getItem("reservationData")
);

    window.location.href = response.data.payment_url;
  } catch (error: any) {
    alert(error.message);
  }
}}
            className="w-full sm:w-auto rounded-lg bg-yellow-600 px-10 py-3.5 text-sm font-semibold text-white transition hover:bg-yellow-700 shadow-sm"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </main>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-neutral-200 pb-4">
      <span className="font-medium text-neutral-700">
        {label}
      </span>
      <span className="font-bold text-neutral-900">
        {value}
      </span>
    </div>
  );
}