const express = require("express");

const cors = require("cors");

const PORT = process.env.PORT || 5000;

const HOST = process.env.HOST;

const helmet = require("helmet");

const server = express();

server.use(express.json());

server.use(helmet());

server.use(cors());

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({message: "Something went wrong"});
});

if (!module.parent) {
    server.listen(PORT, () => {
        console.log(`\n *** Server running on port:${PORT} *** \n`);
    });
}
module.exports = server;