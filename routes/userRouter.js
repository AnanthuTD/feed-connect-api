import { Router } from 'express';
import { getHome, showCreateUserForm, createUser } from '../controllers/userController/userController';

const userRouter = Router();

userRouter.get('/', getHome);
userRouter.get('/create', showCreateUserForm);
userRouter.post('/create', createUser);

export default userRouter;
