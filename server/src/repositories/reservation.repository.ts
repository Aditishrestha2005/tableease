import Reservation, {
  IReservation,
} from "../models/reservation.model";

class ReservationRepository {

  async createReservation(data: Partial<IReservation>) {
    return await Reservation.create(data);
  }


  async getAllReservations() {
    return await Reservation.find()
      .populate("user", "name email")
      .populate("table", "tableNumber capacity location")
      .sort({
        reservationDate: 1,
        reservationTime: 1,
      });
  }


  async getReservationById(id: string) {
    return await Reservation.findById(id)
      .populate("user", "name email")
     .populate("table", "tableNumber capacity location")
  }

  async getReservationsByUser(userId: string) {
    return await Reservation.find({
      user: userId,
    })
      .populate("table", "tableNumber capacity location")
      .sort({
        reservationDate: -1,
      });
  }


  async updateReservation(
    id: string,
    data: Partial<IReservation>
  ) {
    return await Reservation.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
  }
  async findReservationById(id: string) {
  return await Reservation.findById(id);
}


async getActiveReservationsForTable(
  tableId: string,
  reservationDate: Date
) {
  return await Reservation.find({
    table: tableId,
    reservationDate,
    status: {
      $ne: "Cancelled",
    },
  });
}

async getActiveReservationsByUser(userId: string) {
  return await Reservation.find({
    user: userId,
    status: {
      $ne: "Cancelled",
    },
  });
}
async getReservationsByDate(
  reservationDate: Date
) {
  const start = new Date(reservationDate);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(reservationDate);
  end.setUTCHours(23, 59, 59, 999);

  return await Reservation.find({
    reservationDate: {
      $gte: start,
      $lte: end,
    },
    status: {
      $ne: "Cancelled",
    },
  });
}
}


export default new ReservationRepository();