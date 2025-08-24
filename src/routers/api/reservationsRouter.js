"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
//const router = require('express').Router()
import express from "express";
const reservationsRouter = express.Router()
/* ------------------------------------------------------- */
// routes/reservation:

// const reservation = require('../controllers/reservation')
import reservationController from "../../controllers/api/reservationsController.js";

// URL: /reservations

reservationsRouter
  .route("/")
  .get(reservationController.list)
  .post(reservationController.create);

reservationsRouter
  .route("/:id")
  .get(reservationController.read)
  .put(reservationController.update)
  .patch(reservationController.update)
  .delete(reservationController.delete);

/* ------------------------------------------------------- */
// Exports:
export default reservationsRouter;
