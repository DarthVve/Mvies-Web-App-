import { DataTypes, Model } from 'sequelize';
import db from '../db/database.config';
import { movieInstance } from './movie';


interface User {
    id: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
}

export class userInstance extends Model<User> { };

userInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Fullname required" },
            notEmpty: { msg: "Enter your fullnmae" }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Username Required" },
            notEmpty: { msg: "Enter your Username" }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Email Required" },
            notEmpty: { msg: "Enter your email" }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Password Required" },
            notEmpty: { msg: "Enter your password" }
        }
    }
}, {
    sequelize: db,
    tableName: 'USERS'
});

userInstance.hasMany(movieInstance, { foreignKey: 'userId', as: 'MOVIES' });

movieInstance.belongsTo(userInstance, { foreignKey: 'userId', as: 'USERS' });