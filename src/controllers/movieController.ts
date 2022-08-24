import {Request, Response, NextFunction} from 'express';
import { v4 as uuidv4 } from 'uuid';
import { movieInstance } from '../models/movie';
import { movieSchema, editSchema, options } from '../utility/utils';
import { userInstance } from '../models/user';

export async function createMovie(req: Request | any, res: Response, next: NextFunction) {
    const id = uuidv4();
    const userId = req.user.id;
    try {
        const validation = movieSchema.validate(req.body, options)
        if (validation.error) {
            return res.status(400).json({ Error: validation.error.details[0].message });
        }
        const user = await userInstance.findOne({ where: { id: userId }, include: [{ model: movieInstance, as: 'MOVIES' }] }) as unknown as {[key: string]: string};
        const entry = await movieInstance.create({ id, ...req.body, userId });
        res.redirect('/users/dashboard')
        // res.status(201).json({
        //     msg: "Movie has been added to listings",
        //     entry
        // })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Unable to add movie', route: '/add-movie' })
    };
};

export async function viewMovies(req: Request, res: Response, next: NextFunction) {
    try {
        const limit = req.query?.limit as number | undefined;
        const offset = req.query?.offset as number | undefined;

        const moviesRes = await movieInstance.findAndCountAll({
            limit, offset, include: [{
                model: userInstance,
                attributes: ['id', 'fullname', 'email'],
                as: 'USERS'
            }]
        });
        res.render('index', moviesRes)
        // res.status(200).json({
        //     msg: "Here are the available Movies",
        //     count: moviesRes.count,
        //     response: moviesRes.rows
        // })
    } catch (err) { res.status(500).json({ msg: "Unable to show Movie Listings", route: '/movies' }) };
};

export async function aMovie(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const entry = await movieInstance.findOne({ where: { id } });
        return res.status(200).json({
            msg: "Here is your Movie",
            entry
        })
    } catch (err) { res.status(500).json({ msg: "Unable to show", route: "/movies/:id" }) };
}

export async function editMovie(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { title, description, image, price } = req.body;
        const validation = editSchema.validate(req.body, options);

        if (validation.error) {
            return res.status(400).json({ Error: validation.error.details[0].message });
        }

        const entry = await movieInstance.findOne({ where: { id } });
        if (!entry) {
            return res.status(404).json({ Error: "Can't find existing movie" });
        }

        const updatedEntry = await entry.update({
            title: title,
            description: description,
            image: image,
            price: price
        })

        res.redirect('/users/dashboard')
        // res.status(200).json({
        //     msg: "You have successfully edited this movie listing",
        //     updatedEntry
        // })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Failed to Update", route: '/edit/:id' })
    };
}

export async function delMovie(req: Request, res: Response, net: NextFunction) {
    try {
        const { id } = req.params;
        const entry = await movieInstance.findOne({ where: { id } });
        const user = await userInstance.findOne({ where: { id: req.cookies.id }, include: [{ model: movieInstance, as: 'MOVIES' }] }) as unknown as {[key: string]: string};
        if (!entry) {
            return res.status(404).json({ msg: "Can't find existing movie" });
        }

        const delEntry = await entry.destroy();

        return res.redirect('/users/dashboard')
        // res.status(200).json({
        //     msg: "Movie listing deleted successfully",
        //     delEntry
        // });
    } catch (err) { res.status(500).json({ msg: "Failed to delete movie", route: '/delete/:id' })
    };
}