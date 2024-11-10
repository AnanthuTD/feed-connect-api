import { Router } from 'express'
import { ProfileController } from '../controllers/profileController.js'

const userRouter = Router()

const profileController = new ProfileController()

userRouter.get('/profile', profileController.getProfile)

export default userRouter
