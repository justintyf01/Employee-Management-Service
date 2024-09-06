import { Session } from "express-session";

declare module "express-session" {
    interface Session {
        loggedin?: boolean;
        departmentId?: number;
    }
}
