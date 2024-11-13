import { Router } from 'express'
import { post } from '../controllers/postController.js'
import { upload } from '../middleware/multerS3Config.js'
import { ProfileController } from '../controllers/profileController.js'

const userRouter = Router()

const profileController = new ProfileController()

userRouter.get('/profile', profileController.getProfile)
userRouter.post('/post', profileController.getProfile)

userRouter.post('/postContent', upload.single('file'), post)

export default userRouter
