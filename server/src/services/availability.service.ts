import tableRepository from "../repositories/table.repository";
import reservationRepository from "../repositories/reservation.repository";

import {
  combineDateAndTime,
  calculateEndTime,
  hasTimeConflict,
} from "../utils/dateTime";

class AvailabilityService {
  async getAvailableTables(
    date: string,
    time: string,
    guests: number
  ) {
    const tables = await tableRepository.getAllTables();
    // Find the smallest table capacity that can fit the guests
const suitableCapacities = tables
  .filter(
    (table) =>
      table.status === "available" &&
      table.capacity >= guests
  )
  .map((table) => table.capacity)
  .sort((a, b) => a - b);

if (suitableCapacities.length === 0) {
  return [];
}

const requiredCapacity = suitableCapacities[0];
   const searchDate = new Date(`${date}T00:00:00.000Z`);



const reservations =
  await reservationRepository.getReservationsByDate(
    searchDate
  );

    const requestedStart = combineDateAndTime(
      new Date(date),
      time
    );

    const requestedEnd = calculateEndTime(
      requestedStart,
      2
    );

    const availableTables = tables.filter((table) => {
      // Maintenance
      if (table.status === "maintenance") {
        return false;
      }

   // Only show the smallest suitable table capacity
if (table.capacity !== requiredCapacity) {
  return false;
}

      // Reservations for this table
      const tableReservations =
        reservations.filter(
          (reservation) =>
            reservation.table.toString() ===
            table._id.toString()
        );

      // Time conflict
      for (const reservation of tableReservations) {
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
            requestedStart,
            requestedEnd
          )
        ) {
          return false;
        }
      }

      return true;
    });
    console.log(
  "Available Tables:",
  availableTables.map((t) => t.tableNumber)
);

    return availableTables;
  }
}

export default new AvailabilityService();