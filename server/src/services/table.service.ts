import tableRepository from "../repositories/table.repository";
import { tableSchema } from "../validators/table.validator";

class TableService {

  async createTable(data: {
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

    return await tableRepository.createTable(validatedData);
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
    id: string,
    data: {
      tableNumber?: number;
      capacity?: number;
      location?: "Indoor" | "Outdoor" | "VIP";
      status?: "available" | "maintenance";
    }
  ) {
    const table = await tableRepository.updateTable(id, data);

    if (!table) {
      throw new Error("Table not found.");
    }

    return table;
  }

  
  async deleteTable(id: string) {
    const table = await tableRepository.deleteTable(id);

    if (!table) {
      throw new Error("Table not found.");
    }

    return {
      message: "Table deleted successfully.",
    };
  }
}

export default new TableService();