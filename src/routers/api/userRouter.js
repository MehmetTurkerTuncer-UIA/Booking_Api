"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
//const router = require('express').Router()
import express from "express";
const router = express.Router()
/* ------------------------------------------------------- */
// routes/user:

// const user = require('../controllers/user')
import userController from "../../controllers/api/userController.js";

// URL: /users

router
  .route("/")
  .get(userController.list)
  .post(userController.create);

router
  .route("/:id")
  .get(userController.read)
  .put(userController.update)
  .patch(userController.update)
  .delete(userController.delete);

/* ------------------------------------------------------- */
// Exports:
export default router;
