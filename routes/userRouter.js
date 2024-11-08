import { Router } from 'express'
import {
    // getHome,
    // showCreateUserForm,
    // createUser,
    showLoginForm,
    loginUser,
    logoutUser,
} from '../controllers/userController/userController'

const userRouter = Router()

// userRouter.get('/', getHome)
// userRouter.get('/create', showCreateUserForm)
// userRouter.post('/create', createUser)

userRouter.get('/login', showLoginForm)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)

export default userRouter
