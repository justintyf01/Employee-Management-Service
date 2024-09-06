

import { DataTypes } from "sequelize";
import sequelize from "../configs/database";

const Employee = sequelize.define(
    "Employee",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        // departmentId: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         isIn: [["HR", "PS"]],
        //     },
        // },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                // isIn: [["Admin", "HR", "PS"]],
                min: 1,
                max: 3,
            },
        },
    },
    {
        timestamps: false,
    }
);

// Export the model
export default Employee;
