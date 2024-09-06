const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const express = require("express");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync("localhost-key.pem"),
    cert: fs.readFileSync("localhost.pem"),
};

app.prepare().then(() => {
    const server = express();

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    createServer(httpsOptions, server).listen(3000, (err) => {
        if (err) throw err;
        console.log("> Server started on https://localhost:3000");
    });
});
