import express from 'express'
import userRouter from './userRouter.js'
import authRouter from './authRoutes.js'
import AuthMiddleware from '../middleware/authentication.js'

const router = express.Router()

const authMiddleware = new AuthMiddleware()

router.use('/user', authMiddleware.authenticate, userRouter)
router.use('/auth', authRouter)

export default router
