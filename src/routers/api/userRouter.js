"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
//const router = require('express').Router()
import express from "express";
const userRouter = express.Router()
/* ------------------------------------------------------- */
// routes/user:

// const user = require('../controllers/user')
import userController from "../../controllers/api/userController.js";

// URL: /users

userRouter
  .route("/")
  .get(userController.list)
  .post(userController.create);

userRouter
  .route("/:id")
  .get(userController.read)
  .put(userController.update)
  .patch(userController.update)
  .delete(userController.delete);

/* ------------------------------------------------------- */
// Exports:
export default userRouter;
