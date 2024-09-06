"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Import Sequelize.
 */
const sequelize_1 = require("sequelize");
/**
 * Create a Sequelize instance. This can be done by passing
 * the connection parameters separately to the Sequelize constructor.
 */
const sequelize = new sequelize_1.Sequelize("Training", "postgres", "12345678", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
});
/**
 * Export the Sequelize instance. This instance can now be
 * used in the index.js file to authenticate and establish a database connection.
 */
exports.default = sequelize;
