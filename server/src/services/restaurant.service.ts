import restaurantRepository from "../repositories/restaurant.repository";
import { restaurantSchema } from "../validators/restaurant.validator";
import activityLogService from "./activityLog.service";

class RestaurantService {
  async createRestaurant(
  userId: string,
  data: {
    name: string;
    description: string;
    address: string;
    phoneNumber: string;
    email: string;
    openingTime: string;
    closingTime: string;
    image?: string;
  }) {
    const validatedData = restaurantSchema.parse(data);

    // Check if restaurant already exists
    const existingRestaurant = await restaurantRepository.getRestaurant();

    if (existingRestaurant) {
      throw new Error("Restaurant already exists.");
    }

    const restaurant =
  await restaurantRepository.createRestaurant(
    validatedData
  );

await activityLogService.logActivity(
  userId,
  "RESTAURANT_CREATED",
  "Admin created restaurant."
);

return restaurant;
  }


  async getRestaurant() {
    const restaurant = await restaurantRepository.getRestaurant();

    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }

    return restaurant;
  }

  async updateRestaurant(
  userId: string,
  data: {
    name?: string;
    description?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    openingTime?: string;
    closingTime?: string;
    image?: string;
  }) {
    const restaurant = await restaurantRepository.updateRestaurant(data);

    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }

    await activityLogService.logActivity(
  userId,
  "RESTAURANT_UPDATED",
  "Admin updated restaurant."
);

return restaurant;
  }
}

export default new RestaurantService();