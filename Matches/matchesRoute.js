const express = require("express");

const router = express.Router();

const db = require("./matches-model");

router.get("/company/:id", async (req, res, next) => {
    try {
        res.json(await db.findCompanyMatches(req.params.id))
    } catch(err){
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        res.json(await db.findUserMatches(req.params.id));
    } catch(err){
        next(err);
    }
});

module.exports = router;