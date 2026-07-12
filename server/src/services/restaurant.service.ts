import restaurantRepository from "../repositories/restaurant.repository";
import { restaurantSchema } from "../validators/restaurant.validator";

class RestaurantService {
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

    // Check if restaurant already exists
    const existingRestaurant = await restaurantRepository.getRestaurant();

    if (existingRestaurant) {
      throw new Error("Restaurant already exists.");
    }

    return await restaurantRepository.createRestaurant(validatedData);
  }


  async getRestaurant() {
    const restaurant = await restaurantRepository.getRestaurant();

    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }

    return restaurant;
  }

  async updateRestaurant(data: {
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

    return restaurant;
  }
}

export default new RestaurantService();