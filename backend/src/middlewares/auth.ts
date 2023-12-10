import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        res.locals.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }

    return next();
};
