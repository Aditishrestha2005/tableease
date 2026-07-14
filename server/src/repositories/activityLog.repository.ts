import ActivityLog from "../models/activityLog.model";

class ActivityLogRepository {
  async createLog(
    userId: string,
    action: string,
    description: string
  ) {
    return await ActivityLog.create({
      user: userId,
      action,
      description,
    });
  }

  async getAllLogs() {
    return await ActivityLog.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });
  }
}

export default new ActivityLogRepository();