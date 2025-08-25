import express from "express";
import authController from "../../controllers/api/authController.js"

const authRouter = express.Router()

/* ------------------------------------------------------- */




// URL: /auth

authRouter.post('/login', authController.login)
authRouter.post('/refresh', authController.refresh)
authRouter.get('/logout', authController.logout)

/* ------------------------------------------------------- */
export default authRouter