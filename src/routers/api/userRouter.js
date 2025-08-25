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
import permissions from "../../middlewares/permissions.js";

// URL: /users

userRouter
  .route("/")
  .get(permissions.isAdmin, userController.list)
  .post(userController.create);

userRouter
  .route("/:id")
  .get(permissions.isLogin, userController.read)
  .put(permissions.isLogin, userController.update)
  .patch(permissions.isLogin, userController.update)
  .delete(permissions.isLogin, userController.delete);

/* ------------------------------------------------------- */
// Exports:
export default userRouter;
