"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
import express from "express";
import reservationsRouter from "./reservationsRouter.js"
import userRouter from "./userRouter.js";
import findSearchSortPage from "../../middlewares/findSearchSortPage.js"


const router = express.Router();


router.use(findSearchSortPage)

router.use("/users", userRouter);

router.use("/reservations", reservationsRouter);


export default router;
