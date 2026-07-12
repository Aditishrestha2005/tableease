import Restaurant, { IRestaurant } from "../models/restaurant.model";

class RestaurantRepository {
  async createRestaurant(data: Partial<IRestaurant>) {
    return await Restaurant.create(data);
  }

  async getAllRestaurants() {
    return await Restaurant.find();
  }

  async getRestaurantById(id: string) {
    return await Restaurant.findById(id);
  }

  async updateRestaurant(id: string, data: Partial<IRestaurant>) {
    return await Restaurant.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async deleteRestaurant(id: string) {
    return await Restaurant.findByIdAndDelete(id);
  }
}

export default new RestaurantRepository();