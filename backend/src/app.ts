import express from "express";
import helmet from "helmet";
import router from "./routes";
import sequelize from "./configs/database";
import { setupSwagger } from "./configs/swagger";
import errorHandler from "./middlewares/error.middleware";
import cors from "cors";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import https from "https";
import fs from "fs";
import authenticateJWT from "./middlewares/auth.middleware";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();


// Create a Redis client
export const redisClient = createClient({
    socket: {
        host: "localhost",
        port: 6379,
    },
});

// Handle Redis connection errors
redisClient.on("error", (err) => console.log("Redis Client Error", err));

// Connect to Redis
redisClient.connect().catch(console.error);

const app = express();

app.use(cookieParser());

app.use(
    cors({
        origin: process.env.FRONTEND_URL, // The frontend origin
        credentials: true, // Allow credentials (cookies, etc.) to be sent
    })
);

// enable https
const options = {
    key: fs.readFileSync("localhost-key.pem"),
    cert: fs.readFileSync("localhost.pem"),
};

app.use(helmet());

app.use(express.json());

// enable session authentication and Redis for session-store
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET_KEY, // secret signing key
        resave: false, // Prevents session from being saved back to the session store unless modified
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 60 * 1000,
            httpOnly: true,
            secure: true, // true if HTTPS in production
            sameSite: "none",
        },
    })
);

// app.use(authenticateJWT);

// app.use(express.urlencoded({ extended: true }));



app.get("/health", (req, res) => {
    return res.sendStatus(200);
});

app.get("/auth/jwtCheck", authenticateJWT, (req, res) => {
    res.status(200).send();
});

// Set routes
app.use("/", router);

// error handler
app.use(errorHandler);

setupSwagger(app);

const initApp = async () => {
    // Test the connection.
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        // Uncomment to drop all tables
        // await sequelize.sync({ force: true });

        https.createServer(options, app).listen(3001, () => {
            console.log(`**************************************************\n* Application listening at ${process.env.FRONTEND_URL} *\n**************************************************`);
        });
        // app.listen(3001, () => {
        //     console.log(`**************************************************\n* Application listening at http://localhost:3001 *\n**************************************************`);
        // })
    } catch (error: any) {
        console.error("Unable to connect to the database:", error);
    }
};

initApp();
