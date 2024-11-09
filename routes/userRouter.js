import { Router } from 'express'
import {
    // getHome,
    // showCreateUserForm,
    showLoginForm,
    loginUser,
    logoutUser,
    createUser,
} from '../controllers/userController/userController.js'

const userRouter = Router()

// userRouter.get('/', getHome)
// userRouter.get('/create', showCreateUserForm)
userRouter.post('/signup', createUser)

userRouter.get('/login', showLoginForm)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)

export default userRouter
