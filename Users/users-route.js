const db = require("./users-model");
const bcrypt = require("bcryptjs");
const { generateToken, verifyToken} = require("../Auth/auth-model");
const { verifyBody } = require("../Middleware/verifyUserBody");
const express = require("express");

const router = express.Router();

router.get("/", verifyToken(), async (req, res, next) => {
    try {
        res.json(await db.find());
    } catch(err) {
        next(err);
    }
});

router.get("/:id", verifyToken(), async (req, res, next) => {
    try {
        res.json(await db.findUser(req.params.id));
    } catch(err) {
        next(err);
    }
});

router.post("/", verifyBody(), async (req, res, next) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 12);

        res.status(201).json(await db.add(req.body));
    } catch(err) {
        next(err);
    }
})