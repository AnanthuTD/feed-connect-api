import { Router } from 'express'
import {
    showLoginForm,
    logoutUser,
    loginUser,
    createUser,
    handleRefreshToken,
} from '../controllers/userController.js'

const userRouter = Router()

// userRouter.get('/', getHome)
// userRouter.get('/create', showCreateUserForm)
userRouter.post('/signup', createUser)

userRouter.get('/login', showLoginForm)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)

userRouter.post('/refresh-token', handleRefreshToken)

export default userRouter
