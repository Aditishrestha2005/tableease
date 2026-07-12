import mongoose, { Document, Schema } from "mongoose";

export interface ITable extends Document {
  tableNumber: number;
  capacity: number;

  location: "Indoor" | "Outdoor" | "VIP";

  status: "available" | "maintenance";

  createdAt: Date;
  updatedAt: Date;
}

const tableSchema = new Schema<ITable>(
  {
    tableNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    location: {
      type: String,
      enum: ["Indoor", "Outdoor", "VIP"],
      default: "Indoor",
    },

    status: {
      type: String,
      enum: ["available", "maintenance"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model<ITable>("Table", tableSchema);

export default Table;