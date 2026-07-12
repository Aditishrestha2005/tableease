import mongoose, { Document, Schema } from "mongoose";

export interface IReservation extends Document {
  user: mongoose.Types.ObjectId;

  table: mongoose.Types.ObjectId;

  reservationDate: Date;

  reservationTime: string;

  duration: number;

  numberOfGuests: number;

  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";

  createdAt: Date;
  updatedAt: Date;
}

const reservationSchema = new Schema<IReservation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    table: {
      type: Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },

    reservationDate: {
      type: Date,
      required: true,
    },

    reservationTime: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      default: 2,
    },

    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Cancelled",
        "Completed",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model<IReservation>(
  "Reservation",
  reservationSchema
);

export default Reservation;