"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
//const router = require('express').Router()
import express from "express";
const tokenRouter = express.Router()
/* ------------------------------------------------------- */
// routes/token:

// const token = require('../controllers/token')
import tokenController from "../../controllers/api/tokenController.js";

// URL: /tokens

tokenRouter
  .route("/")
  .get(tokenController.list)
  .post(tokenController.create);

tokenRouter
  .route("/:id")
  .get(tokenController.read)
  .put(tokenController.update)
  .patch(tokenController.update)
  .delete(tokenController.delete);

/* ------------------------------------------------------- */
// Exports:
export default tokenRouter;
