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

// URL: /rooms

roomRouter
  .route("/")
  .get(roomController.list)
  .post(roomController.create);

roomRouter
  .route("/:id")
  .get(roomController.read)
  .put(roomController.update)
  .patch(roomController.update)
  .delete(roomController.delete);

/* ------------------------------------------------------- */
// Exports:
export default roomRouter;
