// GET /api/users A L
// POST /api/users/signup V
// POST /api/users/login V
// POST /api/users/logout L
// PUT /api/users/assignAsAdmin A

import express from 'express';
import { getAllUsers, signUpUser, logInUser, logOutUser, assignAsAdmin } from './user-controller';
import { authAdmin } from '../middlewares';

const userRouter = express
  .Router()
  .get('/api/users', authAdmin, getAllUsers)
  .post('/api/users/signup', signUpUser)
  .post('/api/users/login', logInUser)
  .post('/api/users/logout', logOutUser)
  .put('/api/users/assignAsAdmin', authAdmin, assignAsAdmin);

export default userRouter;
