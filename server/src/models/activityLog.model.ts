import mongoose, { Document, Schema } from "mongoose";

export interface IActivityLog extends Document {
  user: mongoose.Types.ObjectId;

  action: string;

  description: string;

  createdAt: Date;
  updatedAt: Date;
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ActivityLog = mongoose.model<IActivityLog>(
  "ActivityLog",
  activityLogSchema
);

export default ActivityLog;