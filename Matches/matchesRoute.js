const express = require("express");

const router = express.Router();

const db = require("./matches-model");

const data = require("../data/config");

router.get("/company/:id", async (req, res, next) => {
    try {
        res.json(await db.findCompanyMatches(req.params.id))
    } catch(err){
        next(err);
    }
});

router.get("/user/:id", async (req, res, next) => {
    try {
        res.json(await db.findUserMatches(req.params.id));
    } catch(err){
        next(err);
    }
});

//find all user_matches with company_id == user.id of company
router.get("/:id", async(req, res, next) => {
    try {
        res.json(await db.findCompanyUserMatches(req.params.id));
    }catch(err) {
        next(err);
    }
});

router.get("/", async(req, res, next) => {
    try {
        res.json(await data("user_matches").select())
    }catch(err) {
        next(err);
    }
});

//for some reason user_matches has no ids
router.post("/:id",async (req, res, next) => {
    try {
        let match = await data("user_matches").where({id: req.params.id});
        match.match = true;
        res.json(match);
    }catch(err) {
        next(err);
    }
});

module.exports = router;