import { Router } from 'express'
import {
    showLoginForm,
    logoutUser,
    loginUser,
    createUser,
} from '../controllers/userController.js'

const userRouter = Router()

// userRouter.get('/', getHome)
// userRouter.get('/create', showCreateUserForm)
userRouter.post('/signup', createUser)

userRouter.get('/login', showLoginForm)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)

export default userRouter
