import { NextFunction, Request, Response } from 'express';

export function authLogin(req: Request, res: Response, next: NextFunction) {
  const username = req.session?.username;

  if (username) {
    // User is logged in.
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

export function authAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session?.isAdmin) {
    next();
  } else {
    return res.status(401).json({ error: 'You are not authorized to perform this action' });
  }
}
