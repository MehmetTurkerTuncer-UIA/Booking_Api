import {Token, User} from "../../models/index.js";

const tokenController = {
  // GET /api/tokens
  list: async (req, res) => {
    const data = await res.getModelList(Token, {}, 'UserId');
    
    return res.status(200).json({ 
                                error: false, 
                                details: await res.getModelListDetails(Token),
                                data });
  },

  // POST /api/tokens
  create: async (req, res) => {
    /*
      #swagger.tags = ["Tokens"]
      #swagger.summary = "Create Token"
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
    const data = await Token.create(req.body);
    return res.status(201).json({ error: false, data });
  },

  // GET /api/tokens/:id
  read: async (req, res) => {
    const id = Number(req.params.id);
    const data = await Token.findOne({ where: { id },
                                       include: [{ model: User, attributes: ["id", "name", "email"] }],
    
            });
    if (!data) {
      const err = new Error("Token not found");
      err.status = 404;
      throw err;
    }
    return res.status(200).json({ error: false, data });
  },

  // PUT /api/tokens/:id
  update: async (req, res) => {
    /*
      #swagger.tags = ["Tokens"]
      #swagger.summary = "Update Token"
      #swagger.parameters['body'] = { in: 'body', required: true, schema: { guestName: "Ali Veli", roomNumber: 101, checkIn: "2025-09-01", checkOut: "2025-09-05", status: "Pending" } }
    */
    const id = Number(req.params.id);
    const item = await Token.findOne({ where: { id } });
  
    if (!item) {
      const err = new Error("Token not found");
      err.status = 404;
      throw err;
    }
  
  
  
    await item.update(req.body);
    return res.status(200).json({ error: false, data: item });
  },






  // DELETE /api/tokens/:id
  delete: async (req, res) => {
    /*
      #swagger.tags = ["Tokens"]
      #swagger.summary = "Delete Token"
    */
    const id = Number(req.params.id);
    const deletedCount = await Token.destroy({ where: { id } });
    if (!deletedCount) {
      const err = new Error("Token not found");
      err.status = 404;
      throw err;
    }
    return res.status(204).send();
  },
};

export default tokenController;
