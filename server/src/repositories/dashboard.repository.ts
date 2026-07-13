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
      confirmedReservations,
      cancelledReservations,
      availableTables,
      maintenanceTables,
    ] = await Promise.all([
      User.countDocuments(),

      Table.countDocuments(),

      Reservation.countDocuments(),

      Reservation.countDocuments({
        status: "Booked",
      }),

      Reservation.countDocuments({
        status: "Confirmed",
      }),

      Reservation.countDocuments({
        status: "Cancelled",
      }),

      Table.countDocuments({
        status: "available",
      }),

      Table.countDocuments({
        status: "maintenance",
      }),
    ]);

    return {
      totalUsers,
      totalTables,
      totalReservations,
      bookedReservations,
      confirmedReservations,
      cancelledReservations,
      availableTables,
      maintenanceTables,
    };
  }
}

export default new DashboardRepository();