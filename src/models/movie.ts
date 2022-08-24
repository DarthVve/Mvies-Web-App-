import { DataTypes, Model } from "sequelize";
import db from '../db/database.config';

interface Movie {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    userId: string;
}

export class movieInstance extends Model<Movie> { };

movieInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Title Required" },
            notEmpty: { msg: "Enter a Title" }
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Description Required" },
            notEmpty: {msg: "Enter a Description" }
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Image Required" },
            notEmpty: {msg: "Upload an Image"}
        }
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    tableName: 'MOVIES'
})