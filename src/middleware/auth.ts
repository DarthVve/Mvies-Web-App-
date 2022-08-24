import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userInstance } from '../models/user';

const secret = process.env.JWT_SECRET as string;

export async function auth(req: Request | any, res: Response, next: NextFunction) {
    try {
        const authorization = req.cookies.auth; //req.headers.authorization
        if (!authorization) {
            res.status(401).json({ Error: 'Kindly Sign In As A User' })
        }

        const token = authorization;  //authorization?.slice(7)
        let verified = jwt.verify(token, secret);

        if (!verified) {
            return res.status(401).json({ Error: "User not verified, Access denied" });
        }

        const { id } = verified as { [key: string]: string };
        const user = await userInstance.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({ Error: 'User not verified, Please Login' });
        }
        req.user = verified;
        next()
    } catch (err) {
        console.log(err)
        res.status(403).json({ Error: "User Not Logged In" })
    };
}