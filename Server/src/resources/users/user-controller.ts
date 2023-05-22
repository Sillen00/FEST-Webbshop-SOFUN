// getAllUsers()
// signUpUser()
// logInUser()
// logOutUser()
// assignAsAdmin()

import { Request, Response } from 'express';
import { UserModel } from './user-model';
import { z } from 'zod';

const UserCreateSchema = z.object({
    username: z.string().nonempty('Username is required'),
    password: z.string().nonempty('Password is required'),
    isAdmin: z.boolean().optional(),
  });

// ENDPOINTS ----------------------------------------------------------------------

export async function getAllUsers(req: Request, res: Response) {
  console.log('Placeholder för getAllUsers');
}

export async function signUpUser(req: Request, res: Response) {
  const userBody = await UserCreateSchema.parse(req.body);
  const existingUser = await UserModel.findOne({ username: userBody.username });
  if (existingUser) {
    return res.status(409).json('Username is already taken');
  }

  const newUser = new UserModel(req.body);
  const { password, ...userWithoutPass } = newUser.toObject();
  await newUser.save();
  res.status(201).json(userWithoutPass);
}

export async function logInUser(req: Request, res: Response) {
  console.log('Placeholder för logInUser');
}

export async function logOutUser(req: Request, res: Response) {
  console.log('Placeholder för logOutUser');
}

export async function assignAsAdmin(req: Request, res: Response) {
  console.log('Placeholder för assignAsAdmin');
}
