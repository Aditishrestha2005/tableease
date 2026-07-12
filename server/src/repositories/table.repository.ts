import Table, { ITable } from "../models/table.model";

class TableRepository {
  // Create Table
  async createTable(data: Partial<ITable>) {
    return await Table.create(data);
  }

  // Get All Tables
  async getAllTables() {
    return await Table.find().sort({ tableNumber: 1 });
  }

  // Get Table By ID
  async getTableById(id: string) {
    return await Table.findById(id);
  }

  // Update Table
  async updateTable(id: string, data: Partial<ITable>) {
    return await Table.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  // Delete Table
  async deleteTable(id: string) {
    return await Table.findByIdAndDelete(id);
  }

  // Find by Table Number
  async findByTableNumber(tableNumber: number) {
    return await Table.findOne({ tableNumber });
  }
}

export default new TableRepository();