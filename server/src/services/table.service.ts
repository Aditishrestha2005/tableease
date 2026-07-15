import tableRepository from "../repositories/table.repository";
import {
  tableSchema,
  updateTableSchema,
} from "../validators/table.validator";
import activityLogService from "./activityLog.service";


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
  "Administrator created a table."
);

return table;
  }

  async getAllTables() {
    return await tableRepository.getAllTables();
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
    "Administrator deleted a table."
  );

  return {
    message: "Table deleted successfully.",
  };
}
}
export default new TableService();