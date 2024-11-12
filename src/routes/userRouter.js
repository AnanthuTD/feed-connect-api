import { Router } from 'express'
import { ProfileController } from '../controllers/profileController.js'

const userRouter = Router()

const profileController = new ProfileController()

userRouter.get('/profile', profileController.getProfile)
userRouter.post('/post', profileController.getProfile)

export default userRouter
