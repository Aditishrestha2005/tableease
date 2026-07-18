"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  verifyPayment,
  createReservation,
} from "../../../lib/api";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function completeReservation() {
      try {
        const pidx = searchParams.get("pidx");
        const status = searchParams.get("status");

        if (!pidx || status !== "Completed") {
          setMessage("Payment was not completed.");
          setLoading(false);
          return;
        }

        // Verify payment with Khalti
        const payment = await verifyPayment(pidx);

        if (payment.data.status !== "Completed") {
          setMessage("Payment verification failed.");
          setLoading(false);
          return;
        }

        // Get reservation data
        const raw = localStorage.getItem("reservationData");

        if (raw) {
          const reservationData = JSON.parse(raw);

          await createReservation(reservationData);
          console.log("Reservation Data:", reservationData);
          
          localStorage.removeItem("reservationData");

          setMessage(
            "Your reservation has been confirmed successfully!"
          );
        } else {
          setMessage(
            "Payment was successful, but reservation information was not found."
          );
        }
      } catch (error: any) {
        console.error(error);

        setMessage(
          error.message || "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    completeReservation();
  }, [searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-xl text-center">

        {loading ? (
          <>
            <h1 className="text-3xl font-bold text-neutral-900">
              Verifying Payment...
            </h1>

            <p className="mt-4 text-neutral-500">
              Please wait while we verify your payment.
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl">🎉</div>

            <h1 className="mt-4 text-3xl font-bold text-green-600">
              Payment Successful
            </h1>

            <p className="mt-6 text-neutral-700">
              {message}
            </p>

            <button
              onClick={() => router.push("/dashboard")}
              className="mt-8 rounded-lg bg-yellow-600 px-10 py-3 text-white font-semibold transition hover:bg-yellow-700"
            >
              OK
            </button>
          </>
        )}
      </div>
    </main>
  );
}