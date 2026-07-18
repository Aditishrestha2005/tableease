import User from "../models/user.model";
import Table from "../models/table.model";
import Reservation from "../models/reservation.model";

class DashboardRepository {
  async getAdminDashboardStats() {
    const [
      totalUsers,
      totalTables,
      totalReservations,
      bookedReservations,
      cancelledReservations,
      availableTables,
      recentUsers,
      recentReservations,
    ] = await Promise.all([
      User.countDocuments(),

      Table.countDocuments(),

      Reservation.countDocuments(),

      Reservation.countDocuments({
        status: "Booked",
      }),

      Reservation.countDocuments({
        status: "Cancelled",
      }),

      Table.countDocuments({
        status: "available",
      }),

      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email createdAt"),

      Reservation.find()
        .populate("user", "name")
        .populate("table", "tableNumber")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    return {
      totalUsers,
      totalTables,
      totalReservations,
      bookedReservations,
      cancelledReservations,
      availableTables,

      recentUsers,
      recentReservations,
    };
  }
}

export default new DashboardRepository();