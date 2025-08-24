"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
import express from "express";
import reservationsRouter from "./reservationsRouter.js"
import userRouter from "./userRouter.js";
import findSearchSortPage from "../../middlewares/findSearchSortPage.js"


const apiRouter = express.Router();


apiRouter.use(findSearchSortPage)

apiRouter.use("/users", userRouter);

apiRouter.use("/reservations", reservationsRouter);


export default apiRouter;
