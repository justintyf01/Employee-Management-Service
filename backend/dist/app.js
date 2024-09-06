"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./configs/database"));
const swagger_1 = require("./configs/swagger");
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
// app.use(express.urlencoded({ extended: true }));
app.get("/health", (req, res) => {
    return res.sendStatus(200);
});
// Set routes
app.use("/", routes_1.default);
// error handler
app.use(error_middleware_1.default);
(0, swagger_1.setupSwagger)(app);
const initApp = () => __awaiter(void 0, void 0, void 0, function* () {
    // Test the connection.
    try {
        yield database_1.default.authenticate();
        console.log("Connection has been established successfully.");
        // Drop all tables
        // await sequelize.sync({ force: true });
        app.listen(3001, () => {
            console.log(`**************************************************\n* Application listening at http://localhost:3001 *\n**************************************************`);
        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
initApp();
