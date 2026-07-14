import activityLogRepository from "../repositories/activityLog.repository";

class ActivityLogService {
  async logActivity(
    userId: string,
    action: string,
    description: string
  ) {
    return await activityLogRepository.createLog(
      userId,
      action,
      description
    );
  }

  async getAllLogs() {
    return await activityLogRepository.getAllLogs();
  }
}

export default new ActivityLogService();