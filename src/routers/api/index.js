"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
import express from "express";
import reservationsRouter from "./reservationsRouter.js";

const router = express.Router();

router.use("/reservations", reservationsRouter);

export default router;
