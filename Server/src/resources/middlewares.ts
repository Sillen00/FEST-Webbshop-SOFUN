import { Request, Response, NextFunction } from 'express';

export function authLogin(req: Request, res: Response, next: NextFunction) {
    console.log("Placeholder för authUser");
    next();
}

export function authAdmin(req: Request, res: Response, next: NextFunction) {
    console.log("Placeholder för authAdmin");
    next();
}


