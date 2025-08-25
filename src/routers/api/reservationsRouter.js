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
import permissions from "../../middlewares/permissions.js";

// URL: /reservations

reservationsRouter
  .route("/")
  .get(permissions.isAdmin, reservationController.list)
  .post(permissions.isLogin, reservationController.create);

reservationsRouter
  .route("/:id")
  .get(permissions.isLogin, reservationController.read)
  .put(permissions.isLogin, reservationController.update)
  .patch(permissions.isLogin, reservationController.update)
  .delete(permissions.isStaff, reservationController.delete);

/* ------------------------------------------------------- */
// Exports:
export default reservationsRouter;
