import tableRepository from "../repositories/table.repository";
import {
  tableSchema,
  updateTableSchema,
} from "../validators/table.validator";
import reservationRepository from "../repositories/reservation.repository";
import activityLogService from "./activityLog.service";
import availabilityService from "./availability.service";


class TableService {

  async createTable(
  userId: string,
  data: {
    tableNumber: number;
    capacity: number;
    location: "Indoor" | "Outdoor" | "VIP";
    status: "available" | "maintenance";
  }) {
    const validatedData = tableSchema.parse(data);

    // Check if table number already exists
    const existingTable = await tableRepository.findByTableNumber(
      validatedData.tableNumber
    );

    if (existingTable) {
      throw new Error("Table number already exists.");
    }

    const table =
  await tableRepository.createTable(validatedData);

await activityLogService.logActivity(
  userId,
  "TABLE_CREATED",
  "Administrator created table."
);

return table;
  }

 async getAllTables() {
  const tables = await tableRepository.getAllTables();

  const today = new Date();

  const reservations =
    await reservationRepository.getReservationsByDate(today);

  return tables.map((table) => {
    const isBooked = reservations.some(
      (reservation) =>
        String(reservation.table) === String(table._id)
    );

    return {
      ...table.toObject(),
      isBooked,
    };
  });
}
  async getTableById(id: string) {
    const table = await tableRepository.getTableById(id);

    if (!table) {
      throw new Error("Table not found.");
    }

    return table;
  }

  async updateTable(
  userId: string,
  id: string,
  data: {
      tableNumber?: number;
      capacity?: number;
      location?: "Indoor" | "Outdoor" | "VIP";
      status?: "available" | "maintenance";
    }
  ) {
    // Validate update data
    const validatedData = updateTableSchema.parse(data);

    // Check duplicate table number
    if (validatedData.tableNumber !== undefined) {
      const existingTable = await tableRepository.findByTableNumber(
        validatedData.tableNumber
      );

      if (
        existingTable &&
        String(existingTable._id) !== id
      ) {
        throw new Error("Table number already exists.");
      }
    }

    const updatedTable = await tableRepository.updateTable(
      id,
      validatedData
    );

    if (!updatedTable) {
      throw new Error("Table not found.");
    }

    await activityLogService.logActivity(
  userId,
  "TABLE_UPDATED",
  "Administrator updated table information."
);

return updatedTable;

  }

 async deleteTable(
  userId: string,
  id: string
) {
  const table = await tableRepository.deleteTable(id);

  if (!table) {
    throw new Error("Table not found.");
  }

  await activityLogService.logActivity(
    userId,
    "TABLE_DELETED",
    "Administrator deleted  table."
  );

  return {
    message: "Table deleted successfully.",
  };
}

async getAvailableTables(
  date: string,
  time: string,
  guests: number
) {
  return await availabilityService.getAvailableTables(
    date,
    time,
    guests
  );
}
}
export default new TableService();