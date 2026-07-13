import dashboardRepository from "../repositories/dashboard.repository";
import reservationRepository from "../repositories/reservation.repository";

class DashboardService {

  async getAdminDashboard() {
    return await dashboardRepository.getAdminDashboardStats();
  }


  async getUserDashboard(userId: string) {
    const reservations =
      await reservationRepository.getReservationsByUser(userId);

    const bookedReservations = reservations.filter(
      (reservation) => reservation.status === "Booked"
    ).length;

    const confirmedReservations = reservations.filter(
      (reservation) => reservation.status === "Confirmed"
    ).length;

    const cancelledReservations = reservations.filter(
      (reservation) => reservation.status === "Cancelled"
    ).length;

    return {
      totalReservations: reservations.length,
      bookedReservations,
      confirmedReservations,
      cancelledReservations,
      recentReservations: reservations.slice(0, 5),
    };
  }
}

export default new DashboardService();