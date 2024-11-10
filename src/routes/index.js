import express from 'express'
import userRouter from './userRouter.js'
import authRouter from './authRoutes.js'
import { authenticate } from '../middleware/authentication.js'

const router = express.Router()

router.use('/user', authenticate, userRouter)
router.use('/auth', authRouter)

export default router
