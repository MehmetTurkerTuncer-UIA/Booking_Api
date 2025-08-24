import {Room} from "../../models/index.js";

const roomController = {
  // GET /api/rooms
  list: async (req, res) => {
    const data = await res.getModelList(Room);
    const details = await res.getModelListDetails(Room);
    return res.status(200).json({ error: false, details, data });
  },

  // POST /api/rooms
  create: async (req, res) => {
     /*
    #swagger.tags = ["Rooms"]
    #swagger.summary = "Create Room"
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        "roomNumber": 101,    // must be unique
        "roomType": "Double",   // Single | Double | Suite
        "capacity": 2,
        "isAvailable": true
      }
    }
  */
    const data = await Room.create(req.body);
    return res.status(201).json({ error: false, data });
  
},

  // GET /api/rooms/:id
  read: async (req, res) => {
    const id = Number(req.params.id);
    const data = await Room.findOne({ where: { id } });
    if (!data) {
      const err = new Error("Room not found");
      err.status = 404;
      throw err;
    }
    return res.status(200).json({ error: false, data });
  },

  // PUT /api/rooms/:id
  update: async (req, res) => {
    /*
    #swagger.tags = ["Rooms"]
    #swagger.summary = "Update Room"
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        "roomNumber": 202,  // must be unique
        "roomType": "Suite",   // Single | Double | Suite
        "capacity": 3,
        "isAvailable": false
      }
    }
  */
    const id = Number(req.params.id);
    const item = await Room.findOne({ where: { id } });
  
    if (!item) {
      const err = new Error("Room not found");
      err.status = 404;
      throw err;
    }
  
  
  
    await item.update(req.body);
    return res.status(200).json({ error: false, data: item });
  },






  // DELETE /api/rooms/:id
  delete: async (req, res) => {
    /*
      #swagger.tags = ["Rooms"]
      #swagger.summary = "Delete Room"
    */
    const id = Number(req.params.id);
    const deletedCount = await Room.destroy({ where: { id } });
    if (!deletedCount) {
      const err = new Error("Room not found");
      err.status = 404;
      throw err;
    }
    return res.status(204).send();
  },
};

export default roomController;
