"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
//const router = require('express').Router()
import express from "express";
const roomRouter = express.Router()
/* ------------------------------------------------------- */
// routes/room:

// const room = require('../controllers/room')
import roomController from "../../controllers/api/roomController.js";
import permissions from "../../middlewares/permissions.js";
// URL: /rooms

roomRouter
  .route("/")
  .get(permissions.isStaff, roomController.list)
  .post(permissions.isAdmin, roomController.create);

roomRouter
  .route("/:id")
  .get(permissions.isLogin, roomController.read)
  .put(permissions.isStaff, roomController.update)
  .patch(rpermissions.isStaff, roomController.update)
  .delete(permissions.isAdmin, roomController.delete);

/* ------------------------------------------------------- */
// Exports:
export default roomRouter;
