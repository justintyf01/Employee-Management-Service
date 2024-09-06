import { Request, Response, NextFunction } from "express";
import { redisClient } from "../app";
import jwt from "jsonwebtoken";

export default async function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {

        // Verify expiry of token and signature
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Retrieve session ID from JWT
        const sessionId = "sess:" + (decoded as any).sessionId;

        // Validate session in Redis
        const redisSession = await redisClient.get(sessionId);

        if (!redisSession) {
            return res.status(401).send("Session not found or expired");
        }

        const session = JSON.parse(JSON.parse(JSON.stringify(redisSession)));

        if (!session.loggedin) {
            return res.status(401).send("User is not logged in");
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).send("Invalid token");
    }
}
