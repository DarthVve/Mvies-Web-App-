import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { userInstance } from '../models/user';
import bcrypt from 'bcryptjs';
import { userSchema, loginSchema, getToken, options } from '../utility/utils';
import { movieInstance } from '../models/movie';

export async function signupUser(req: Request, res: Response, next: NextFunction) {
    const id = uuidv4();
    try {
        const validation = userSchema.validate(req.body, options);
        if (validation.error) {
            return res.status(400).json({ Error: validation.error.details[0].message });
        }

        const usedUsername = await userInstance.findOne({ where: { username: req.body.username } });
        if (usedUsername) {
            return res.status(409).json({ msg: "Username taken" });
        }

        const usedEmail = await userInstance.findOne({ where: { email: req.body.email } });
        if (usedEmail) {
            return res.status(409).json({ msg: "email has been used" });
        }

        const hashPassword = await bcrypt.hash(req.body.password, 8);
        const entry = await userInstance.create({
            id: id,
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })
        res.redirect('/users/login');
        // return res.status(201).json({
        //     msg: `User created successfully. Welcome ${req.body.username}`,
        //     entry
        // })
    } catch (err) { res.status(500).json({ msg: "Couldn't Sign Up User ", route: '/register' }) };
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
    try {
        const validation = loginSchema.validate(req.body, options);
        if (validation.error) {
            return res.status(400).json({ Error: validation.error.details[0].message });
        }
        const user = await userInstance.findOne({ where: { email: req.body.email }, include: [{ model: movieInstance, as: 'MOVIES' }] }) as unknown as {[key: string]: string};
        const { id } = user;
        const token = getToken({ id });
        const validPass = await bcrypt.compare(req.body.password, user.password);

        if (!validPass) {
            res.status(401).json({ msg: "Invalid email or password" });
        } else {
            res.cookie("auth", token, {
                httpOnly: true,
                secure: true,
            });
            res.cookie("id", id, {
                httpOnly: true,
                secure: true,
            });
            res.render('dashboard', { user });
            // res.status(200).json({
            //     msg: "Login Successful",
            //     token,
            //     user
            // })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Failed to Login", route: '/login' })
    };
}

export async function viewUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const limit = req.query?.limit as number | undefined;
        const offset = req.query?.offset as number | undefined;

        const response = await userInstance.findAndCountAll({
            limit, offset, include: [{
                model: movieInstance,
                as: 'MOVIES'
        }] });
        res.status(200).json({
            msg: "View Users",
            count: response.count,
            response: response.rows
        })
    } catch (err) { res.status(500).json({ msg: "Unable to show Movie Listings", route: '/movies' }) };
};

export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        //const userId = req.user.id;
        const entry: any = await userInstance.findOne({ where: { id }, include: [{ model: movieInstance, as: 'Movies' }] });
        
        //res.render('dashboard', entry)
        // return res.status(200).json({
        //     msg: "Welcome User",
        //     entry
        // })
    } catch (err) { res.status(500).json({ msg: "Unable to show", route: "/movies/:id" }) };
}

export async function dash(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userInstance.findOne({ where: { id: req.cookies.id }, include: [{ model: movieInstance, as: 'MOVIES' }] }) as unknown as { [key: string]: string };
        res.render('dashboard', { user });
    } catch (err) {
        console.log(err)
        //res.status(500).json({ msg: "Failed to Login", route: '/login' })
        res.redirect('/users/login')
    };
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        res.clearCookie("id")
        res.clearCookie("auth")
        res.render('logout');
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Failed to Logout", route: '/logout' })
    };
}