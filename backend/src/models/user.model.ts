import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../configs/database";

interface UserAttributes {
    id?: number;
    username: string;
    password: string;
    departmentId: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public departmentId!: number;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 3,
            },
        },
    },
    {
        sequelize,
        tableName: "Users",
        timestamps: false,
    }
);

export default User;
