const db = require("./users-model");
const { verifyToken} = require("../Auth/auth-model");
const { verifyRegisterBody, verifyLoginBody, addRegisterToken, addLoginToken} = require("../Middleware/verifyUserBody");
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

router.post("/", verifyRegisterBody(),addRegisterToken(), async (req, res, next) => {
    try {
        res.json(req.data);
    } catch(err) {
        next(err);
    }
});

router.post("/login",verifyLoginBody(), addLoginToken(), async (req, res, next) => {
    try {
        res.json(req.data);
    } catch(err) {
        next(err);
    }
});

router.delete("/:id", verifyToken(), async(req, res, next) => {
    try {
        res.json(await db.remove(req.params.id));
    } catch(err) {
        next(err);
    }
});

router.put("/:id", verifyToken(), verifyRegisterBody(), async(req, res, next) => {
    try {
        res.json(await db.update(req.params.id, req.body));
    } catch(err) {
        next(err);
    }
});

module.exports = router;