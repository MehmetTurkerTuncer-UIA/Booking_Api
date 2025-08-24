"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
//const router = require('express').Router()
import express from "express";
const router = express.Router()
/* ------------------------------------------------------- */
// routes/reservation:

// const reservation = require('../controllers/reservation')
import reservationController from "../../controllers/api/reservations.controller.js";

// URL: /reservations

router
  .route("/")
  .get(reservationController.list)
  .post(reservationController.create);

router
  .route("/:id")
  .get(reservationController.read)
  .put(reservationController.update)
  .patch(reservationController.update)
  .delete(reservationController.delete);

/* ------------------------------------------------------- */
// Exports:
export default router;
