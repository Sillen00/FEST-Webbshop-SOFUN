import { Request, Response, NextFunction } from 'express';

export function authUser(req: Request, res: Response, next: NextFunction) {
    console.log("Placeholder för authUser");
    next();
}

export function authAdmin(req: Request, res: Response, next: NextFunction) {
    console.log("Placeholder för authAdmin");
    next();
}


