import  express from 'express'

import  AuthController from '../controllers/auth.controller'

let router = express.Router()

router.post("/register", AuthController.registerUser)

router.post("/login", AuthController.login)

export default router