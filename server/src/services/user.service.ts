import userRepository from "../repositories/user.repository";
import reservationRepository from "../repositories/reservation.repository";
class UserService {
  async getAllUsers() {
    return await userRepository.getAllUsers();
  }

  async getUserDetails(id: string) {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throw new Error("User not found.");
  }

  const reservations =
    await reservationRepository.getReservationsByUser(id);

  return {
    user,
    reservations,
  };
}
  async deleteUser(id: string) {
    const user = await userRepository.findUserById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    if (user.role === "admin") {
      throw new Error("Administrator accounts cannot be deleted.");
    }

    await userRepository.deleteUser(id);

    return {
      message: "User deleted successfully.",
    };
  }
}

export default new UserService();