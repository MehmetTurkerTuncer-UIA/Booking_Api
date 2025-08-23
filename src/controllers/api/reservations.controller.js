import Reservation from "../../models/Reservation.js";

const reservationController = {
  // GET /api/reservations
  list: async (req, res) => {
    const data = await res.getModelList(Reservation);
    const details = await res.getModelListDetails(Reservation);
    return res.status(200).json({ error: false, details, data });
  },

  // POST /api/reservations
  create: async (req, res) => {
    /*
      #swagger.tags = ["Reservations"]
      #swagger.summary = "Create Reservation"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          guestName: "Ali Veli",
          roomNumber: 101,
          checkIn: "2025-09-01",
          checkOut: "2025-09-05",
          status: "Pending"
        }
      }
    */
    const data = await Reservation.create(req.body);
    return res.status(201).json({ error: false, data });
  },

  // GET /api/reservations/:id
  read: async (req, res) => {
    const id = Number(req.params.id);
    const data = await Reservation.findOne({ where: { id } });
    if (!data) {
      const err = new Error("Reservation not found");
      err.status = 404;
      throw err;
    }
    return res.status(200).json({ error: false, data });
  },

  // PUT /api/reservations/:id
  update: async (req, res) => {
    /*
      #swagger.tags = ["Reservations"]
      #swagger.summary = "Update Reservation"
      #swagger.parameters['body'] = { in: 'body', required: true, schema: { guestName: "Ali Veli", roomNumber: 101, checkIn: "2025-09-01", checkOut: "2025-09-05", status: "Pending" } }
    */
    const id = Number(req.params.id);
    const item = await Reservation.findOne({ where: { id } });
    if (!item) {
      const err = new Error("Reservation not found");
      err.status = 404;
      throw err;
    }
    await item.update(req.body);
    return res.status(200).json({ error: false, data: item });
  },

  // DELETE /api/reservations/:id
  delete: async (req, res) => {
    /*
      #swagger.tags = ["Reservations"]
      #swagger.summary = "Delete Reservation"
    */
    const id = Number(req.params.id);
    const deletedCount = await Reservation.destroy({ where: { id } });
    if (!deletedCount) {
      const err = new Error("Reservation not found");
      err.status = 404;
      throw err;
    }
    return res.status(204).send();
  },
};

export default reservationController;
