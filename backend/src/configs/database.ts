/**
 * Import Sequelize.
 */
import { Sequelize } from "sequelize";

/**
 * Create a Sequelize instance. This can be done by passing
 * the connection parameters separately to the Sequelize constructor.
 */
const sequelize = new Sequelize("Training", "postgres", "12345678", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
});

// const sequelize = new Sequelize("postgres://postgres:12345678@host.docker.internal:5432/Training");

/**
 * Export the Sequelize instance. This instance can now be
 * used in the index.js file to authenticate and establish a database connection.
 */
export default sequelize;

