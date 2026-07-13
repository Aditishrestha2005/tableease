import mongoose from "mongoose";

import reservationRepository from "../repositories/reservation.repository";
import tableRepository from "../repositories/table.repository";

import { reservationSchema } from "../validators/reservation.validator";

import {
  combineDateAndTime,
  calculateEndTime,
  hasTimeConflict,
} from "../utils/dateTime";
const DEFAULT_RESERVATION_DURATION = 2;

class ReservationService {

  async createReservation(
    userId: string,
    data: {
      table: string;
      reservationDate: Date;
      reservationTime: string;
      numberOfGuests: number;
    }
  ) {
    // Validate input
    const validatedData = reservationSchema.parse(data);

    // Find table
    const table = await tableRepository.getTableById(
      validatedData.table
    );

    if (!table) {
      throw new Error("Table not found.");
    }

    // Maintenance check
    if (table.status === "maintenance") {
      throw new Error(
        "This table is currently under maintenance."
      );
    }

    // Capacity check
    if (
      validatedData.numberOfGuests >
      table.capacity
    ) {
      throw new Error(
        `This table can only accommodate ${table.capacity} guests.`
      );
    }

    // Combine reservation start
    const reservationStart =
      combineDateAndTime(
        validatedData.reservationDate,
        validatedData.reservationTime
      );

      


    // Prevent past booking
    if (reservationStart <= new Date()) {
      throw new Error(
        "Reservations cannot be made in the past."
      );
    }
    

    // Calculate end time
    const reservationEnd =
   calculateEndTime(
  reservationStart,
  DEFAULT_RESERVATION_DURATION
);

    // Get active reservations
    const reservations =
      await reservationRepository.getActiveReservationsForTable(
        validatedData.table,
        validatedData.reservationDate
      );
      const userReservations =
  await reservationRepository.getActiveReservationsByUser(
    userId
  );

for (const reservation of userReservations) {
  const existingStart = combineDateAndTime(
    reservation.reservationDate,
    reservation.reservationTime
  );

  const existingEnd = calculateEndTime(
    existingStart,
    reservation.duration
  );

  if (
    hasTimeConflict(
      existingStart,
      existingEnd,
      reservationStart,
      reservationEnd
    )
  ) {
    throw new Error(
      "You already have another reservation during this time."
    );
  }
}

    // Check overlap
    for (const reservation of reservations) {
      const existingStart =
        combineDateAndTime(
          reservation.reservationDate,
          reservation.reservationTime
        );

      const existingEnd =
        calculateEndTime(
          existingStart,
          reservation.duration
        );

      if (
        hasTimeConflict(
          existingStart,
          existingEnd,
          reservationStart,
          reservationEnd
        )
      ) {
        throw new Error(
          "This table is already reserved during the selected time."
        );
      }
    }

    // Create reservation
    return await reservationRepository.createReservation({
      user: new mongoose.Types.ObjectId(userId),

      table: new mongoose.Types.ObjectId(
        validatedData.table
      ),

      reservationDate:
        validatedData.reservationDate,

      reservationTime:
        validatedData.reservationTime,

      duration: DEFAULT_RESERVATION_DURATION,

      numberOfGuests:
        validatedData.numberOfGuests,

      status: "Booked",
    });
  }

  async getMyReservations(userId: string) {
    return await reservationRepository.getReservationsByUser(
      userId
    );
  }


  async getAllReservations() {
    return await reservationRepository.getAllReservations();
  }


  async getReservationById(id: string) {
    const reservation =
      await reservationRepository.getReservationById(id);

    if (!reservation) {
      throw new Error("Reservation not found.");
    }

    return reservation;
  }


  async cancelReservation(
    reservationId: string,
    userId: string,
    role: "user" | "admin"
  ) {
    const reservation =
      await reservationRepository.findReservationById(
        reservationId
      );

    if (!reservation) {
      throw new Error("Reservation not found.");
    }

    // Users can only cancel their own reservation
    if (
      role === "user" &&
      reservation.user.toString() !== userId
    ) {
      throw new Error(
        "You can only cancel your own reservations."
      );
    }

    // Already cancelled
    if (reservation.status === "Cancelled") {
      throw new Error(
        "Reservation is already cancelled."
      );
    }


    const reservationStart =
      combineDateAndTime(
        reservation.reservationDate,
        reservation.reservationTime
      );
      const reservationHour = reservationStart.getHours();
const reservationMinute = reservationStart.getMinutes();

// Restaurant Hours
if (
  reservationHour < 9 ||
  reservationHour > 20 ||
  (reservationHour === 20 && reservationMinute > 0)
) {
  throw new Error(
    "Reservations are only allowed between 09:00 and 20:00."
  );
}

    const currentTime = new Date();

    const difference =
      reservationStart.getTime() -
      currentTime.getTime();

    const oneHour =
      60 * 60 * 1000;
          // One-hour cancellation rule
    if (difference < oneHour) {
      throw new Error(
        "Reservations cannot be cancelled within one hour of the reservation time."
      );
    }

    // Cancel reservation
    const updatedReservation =
      await reservationRepository.updateReservation(
        reservationId,
        {
          status: "Cancelled",
        }
      );

    return {
      message: "Reservation cancelled successfully.",
      reservation: updatedReservation,
    };
  }
}

export default new ReservationService();