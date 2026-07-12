import Restaurant, { IRestaurant } from "../models/restaurant.model";

class RestaurantRepository {
  // Create restaurant (only once)
  async createRestaurant(data: Partial<IRestaurant>) {
    return await Restaurant.create(data);
  }

  // Get the only restaurant
  async getRestaurant() {
    return await Restaurant.findOne();
  }

  // Update the only restaurant
  async updateRestaurant(data: Partial<IRestaurant>) {
    return await Restaurant.findOneAndUpdate({}, data, {
      new: true,
    });
  }
}

export default new RestaurantRepository();