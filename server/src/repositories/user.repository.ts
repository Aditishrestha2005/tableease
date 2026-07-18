import User, { IUser } from "../models/user.model";

class UserRepository {
  async createUser(userData: Partial<IUser>) {
    return await User.create(userData);
  }

  async findUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  async findUserById(id: string) {
    return await User.findById(id);
  }

  async updateUser(id: string, data: Partial<IUser>) {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
    });
  }
  async getAllUsers() {
  return await User.find()
    .select("name email phoneNumber role createdAt")
    .sort({ createdAt: -1 });
}
}


export default new UserRepository();