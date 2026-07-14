import dashboardRepository from "../repositories/dashboard.repository";
import reservationRepository from "../repositories/reservation.repository";
import userRepository from "../repositories/user.repository";

class DashboardService {

  async getAdminDashboard() {
    return await dashboardRepository.getAdminDashboardStats();
  }

  async getUserDashboard(userId: string) {
    const user = await userRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

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
  welcomeMessage: `Welcome, ${user.name}!`,

  totalReservations: reservations.length,

  bookedReservations,

  confirmedReservations,

  cancelledReservations,

  recentBookings: reservations.slice(0, 5),
};
  }
}

export default new DashboardService();