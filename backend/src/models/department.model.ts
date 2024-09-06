import { DataTypes } from "sequelize";
import sequelize from "../configs/database";

const Department = sequelize.define(
    "Department",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        departmentName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["Admin", "HR", "PS"]],
            },
        },
    },
    {
        timestamps: false,
    }
);

// Export the model
export default Department;
