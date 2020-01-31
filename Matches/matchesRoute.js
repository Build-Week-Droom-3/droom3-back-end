const express = require("express");

const router = express.Router();

const db = require("./matches-model");

const { verifyToken } = require("../Auth/auth-model");

const data = require("../data/config");

router.get("/company/:id", verifyToken(), async (req, res, next) => {
    try {
        res.json(await db.findCompanyMatches(req.params.id))
    } catch(err){
        next(err);
    }
});

router.get("/user/:id", verifyToken(), async (req, res, next) => {
    try {
        res.json(await db.findUserMatches(req.params.id));
    } catch(err){
        next(err);
    }
});

//find all user_matches with company_id == user.id of company
router.get("/:id", verifyToken(), async(req, res, next) => {
    try {
        res.json(await db.findCompanyUserMatches(req.params.id));
    }catch(err) {
        next(err);
    }
});

router.get("/", verifyToken(), async(req, res, next) => {
    try {
        res.json(await data("user_matches").select())
    }catch(err) {
        next(err);
    }
});

router.post("/:id",verifyToken(), async (req, res, next) => {
    try {
        res.status(201).json(await db.addCompanyMatch(req.params.id));
    }catch(err) {
        next(err);
    }
});

//add user match to user_matches
router.post("/user", verifyToken(), async(req, res, next) => {
    try {
        res.status(201).json(await db.addUserMatch(req.body));
    }catch(err) {
        next(err);
    }
});
module.exports = router;