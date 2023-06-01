import express from 'express';
import { authAdmin, authLogin } from '../middlewares';
import {
  assignAsAdmin,
  checkSession,
  getAllUsers,
  logInUser,
  logOutUser,
  removeAsAdmin,
  signUpUser,
} from './user-controller';

const userRouter = express
  .Router()
  .get('/api/users', authAdmin, getAllUsers)
  .post('/api/users/signup', signUpUser)
  .post('/api/users/login', logInUser)
  .get('/api/users/checkSession', checkSession)
  .post('/api/users/logout', authLogin, logOutUser)
  .put('/api/users/:id/assignAsAdmin', authAdmin, assignAsAdmin)
  .put('/api/users/:id/removeAsAdmin', authAdmin, removeAsAdmin);

export default userRouter;
