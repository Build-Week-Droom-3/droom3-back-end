const db = require("./jobs-model");
const { verifyToken} = require("../Auth/auth-model");
const { validateJob } = require("../Middleware/validate");
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
        res.json(await db.findJob(req.params.id));
    } catch(err) {
        next(err);
    }
});

router.get("/company/:id", verifyToken(), async(req, res,next) => {
    try {
        const company_id = req.params.id
        res.json(await db.findBy({company_id}));
    } catch(err) {
        next(err);
    }
});

router.post("/", verifyToken(), validateJob(), async (req, res, next) => {
    try {
        res.json(await db.add(req.body));
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

router.put("/:id", verifyToken(), async(req, res, next) => {
    try {
        res.json(await db.update(req.params.id, req.body));
    } catch(err) {
        next(err);
    }
});

module.exports = router;