// GET /api/users A L
// POST /api/users/signup V
// POST /api/users/login V
// POST /api/users/logout L
// PUT /api/users/assignAsAdmin A

import express from 'express';
import { authAdmin, authLogin } from '../middlewares';
import { assignAsAdmin, getAllUsers, logInUser, logOutUser, signUpUser } from './user-controller';

const userRouter = express
  .Router()
  .get('/api/users', authAdmin, authLogin, getAllUsers)
  .post('/api/users/signup', signUpUser)
  .post('/api/users/login', logInUser)
  .post('/api/users/logout', authLogin, logOutUser)
  .put('/api/users/assignAsAdmin', authAdmin, assignAsAdmin);

export default userRouter;
