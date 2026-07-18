import userRepository from "../repositories/user.repository";

class UserService {
  async getAllUsers() {
    return await userRepository.getAllUsers();
  }
}

export default new UserService();