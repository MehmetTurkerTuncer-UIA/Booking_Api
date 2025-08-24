"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
import { User, Reservation, Room } from "../../models/index.js"
import { emailAndPasswordChecker, validateEmailOnly } from "../../utils/emailAndPasswordChecker.js"



const userController = {
  // GET /api/users
  list: async (req, res) => {
    const data = await res.getModelList(User);
    const details = await res.getModelListDetails(User);
    return res.status(200).json({ 
        error: false, 
        details, 
        data });
  },

  // POST /api/users
  create: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Create User"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          {
          "name": "Ali Veli",
          "email": "ali@example.com",
          "phoneNumber": "+905551112233",
          "password": "Test123!"
          }

        }
      }
    */
    
    const safeData = emailAndPasswordChecker(req.body)
    const data = await User.create(safeData)
    
    
    return res.status(201).json({ 
        error: false, 
        data });
  },

  // GET /api/users/:id
  read: async (req, res) => {
    const id = Number(req.params.id);
    const data = await User.findOne({ where: { id },
    include: [
    {
      model: Reservation,
      attributes: ["id", "checkIn", "checkOut", "status"],
      include: [
        {
          model: Room,
          attributes: ["id", "roomNumber", "roomType", "capacity", "isAvailable"]
        }
      ]
    }
  ],
    // Rezervasyonları tarihe göre sıralamak istersen:
    order: [[Reservation, "checkIn", "ASC"]]

    });
    if (!data) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    return res.status(200).json({ error: false, data });
  },

  // PUT /api/users/:id
  update: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Update User"
      #swagger.parameters['body'] = { in: 'body', required: true, schema: { guestName: "Ali Veli", roomNumber: 101, checkIn: "2025-09-01", checkOut: "2025-09-05", status: "Pending" } }
    */


    const id = Number(req.params.id);
    const user = await User.findOne({ where: { id } });
    
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    const {email, password} = req.body || {}
    if(!email || !password ){
      const err = new Error('Email ve password zorunludur')
      err.status = 400
      throw err
    } 

    const payload = emailAndPasswordChecker(req.body)
    await user.update(payload)

    
    return res.status(200).json({ 
      error: false,
      data : user });
  },

  // DELETE /api/users/:id
  delete: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Delete User"
    */
    const id = Number(req.params.id);
    const deletedCount = await User.destroy({ where: { id } });
    if (!deletedCount) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    return res.status(204).send();
  },
};

export default userController;
