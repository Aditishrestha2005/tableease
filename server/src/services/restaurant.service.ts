import restaurantRepository from "../repositories/restaurant.repository";
import { restaurantSchema } from "../validators/restaurant.validator";

class RestaurantService {
  // =========================
  // Create Restaurant
  // =========================
  async createRestaurant(data: {
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

    return await restaurantRepository.createRestaurant(validatedData);
  }


  async getAllRestaurants() {
    return await restaurantRepository.getAllRestaurants();
  }


  async getRestaurantById(id: string) {
    const restaurant = await restaurantRepository.getRestaurantById(id);

    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }

    return restaurant;
  }


  async updateRestaurant(
    id: string,
    data: {
      name?: string;
      description?: string;
      address?: string;
      phoneNumber?: string;
      email?: string;
      openingTime?: string;
      closingTime?: string;
      image?: string;
    }
  ) {
    const restaurant = await restaurantRepository.updateRestaurant(id, data);

    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }

    return restaurant;
  }


  async deleteRestaurant(id: string) {
    const restaurant = await restaurantRepository.deleteRestaurant(id);

    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }

    return {
      message: "Restaurant deleted successfully.",
    };
  }
}

export default new RestaurantService();