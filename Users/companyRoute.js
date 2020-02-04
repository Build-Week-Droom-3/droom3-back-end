const db = require("./users-model");
const express = require("express");
const { verifyToken } = require("../Auth/auth-model");
const router = express.Router()

router.get("/companies", verifyToken(), async(req, res,next) => {
    try {
        res.json(await db.findCompanies());
    } catch(err) {
        next(err);
    }
});

router.get("/companies/:id", verifyToken(), async(req, res, next) => {
    try {
        res.json(await db.findUser(req.params.id));
    } catch(err) {
        next(err);
    }
});

module.exports = router;