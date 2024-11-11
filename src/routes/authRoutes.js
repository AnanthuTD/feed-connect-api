import { Router } from 'express'
import {
    logoutUser,
    loginUser,
    createUser,
    handleRefreshToken,
} from '../controllers/userController.js'

const authRouter = Router()

authRouter.post('/signup', createUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logoutUser)
authRouter.post('/refresh-token', handleRefreshToken)

export default authRouter
