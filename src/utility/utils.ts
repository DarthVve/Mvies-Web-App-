import Joi from 'joi';
import jwt from 'jsonwebtoken';

export const options = {
    abortEarly: false,
    errors: {
        wrap: { label: '' }
    }
}
/* USER SCHEMAS */
export const userSchema = Joi.object().keys({
    fullname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: Joi.ref('password')
}).with('password', 'confirm_password');

export const loginSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}/)
})

/* MOVIE SCHEMAS */
export const movieSchema = Joi.object().keys({
    title: Joi.string().lowercase().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number()
}) 

export const editSchema = Joi.object().keys({
    title: Joi.string().lowercase(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number()    
}) 



//Token Generator function for login sessions
export const getToken = (user: { [key: string]: unknown }): unknown => {
    const sessionId = `${process.env.JWT_SECRET}`
    return jwt.sign(user, sessionId, {expiresIn: '5d'})
}
