import argon2 from 'argon2';
import { Request, Response } from 'express';
import { z } from 'zod';
import { UserModel } from './user-model';

const UserCreateSchema = z.object({
  username: z.string().nonempty('Username is required'),
  password: z.string().nonempty('Password is required'),
  isAdmin: z.boolean().optional(),
});

// ENDPOINTS ---------------------------------------------------------------------------------------------------------------

// ADMIN - GET ALL USERS ---------------------------------------------------------------

export async function getAllUsers(req: Request, res: Response) {
  if (req.session?.isAdmin) {
    const users = await UserModel.find({}).select('-password');
    res.status(200).json(users);
  } else {
    res.status(401).json('You are not authorized to perform this action');
  }
}

// SIGNUP / REGISTER USER --------------------------------------------------------------

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

// LOGIN USER ----------------------------------------------------------------------------

export async function logInUser(req: Request, res: Response) {
  const { password } = req.body;
  const user = await UserModel.findOne({ username: req.body.username });

  !user && res.status(401).json('user not found');

  const isAuth = await argon2.verify(user!.password, password);
  if (!isAuth) {
    res.status(401).json('Incorrect email or password');
  } else {
    // Create session / cookie
    req.session! = {
      _id: user?.id,
      username: user?.username,
      isAdmin: user?.isAdmin,
    };
    res.status(200).json(req.session);
  }
}

// LOGOUT USER ----------------------------------------------------------------------------

export async function logOutUser(req: Request, res: Response) {
  const user = await UserModel.findOne({ username: req.session!.username });

  !user && res.status(401).json('You are already logged out');

  req.session = null;
  res.status(204).json(req.session);
  // req.session.destroy((err) => {
  //   if (err) {
  //     console.error('Error destroying session:', err);
  //   }
  //   res.status(204).end();
  // });
  
}

// ADMIN - UPDATE USER ROLE TO ADMIN ---------------------------------------------------------

export async function assignAsAdmin(req: Request, res: Response) {
  const { id } = req.params;

  // Check if the current user is an admin
  if (!req.session?.isAdmin) {
    return res.status(401).json('You are not authorized to perform this action');
  }

  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      $set: { isAdmin: true },
    },
    { new: true, timestamps: false }
  ).select('-password');

  res.status(200).json(user);
}

export async function removeAsAdmin(req: Request, res: Response) {
  const { id } = req.params;
  if (!req.session?.isAdmin) {
    return res.status(401).json('You are not authorized to perform this action');
  }

  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      $set: { isAdmin: false },
    },
    { new: true, timestamps: false }
  ).select('-password');

  res.status(200).json(user);
}
