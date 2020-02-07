const db = require("./jobs-model");
const { verifyToken} = require("../Auth/auth-model");
const { validateJobField, validateJob, validateCompany} = require("../Middleware/validate");
const express = require("express");
const router = express.Router();

// *** GET REQUEST ALL JOBS *** //

/**
 * @api {get} /jobs Get a list of all jobs
 * @apiName GetJobs
 * @apiGroup Jobs
 * 
 * @apiSuccess {Number} id Job ID
 * @apiSuccess {Number} company_id Company ID
 * @apiSuccess {String} name Job title
 * @apiSuccess {String} type Job type
 * @apiSuccess {String} description Description of job
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {
 *              "id": 1,
 *              "company_id": 3,
 *              "name": "Software Engineer",
 *              "type": "Software",
 *              "description": "Build awesome things with us!"
 *          },
 *          {
 *              "id": 2,
 *              "company_id": 4,
 *              "name": "React Developer",
 *              "type": "Software",
 *              "description": "React Developer with 2 years experience"
 *          }
 *      ]
 * 
 * 
 */

router.get("/", verifyToken(), async (req, res, next) => {
    try {
        res.json(await db.find());
    } catch(err) {
        next(err);
    }
});


// *** GET REQUEST SPECIFIC JOB *** //

/**
 * @api {get} /jobs/:id Get specific job
 * @apiName GetJob
 * @apiGroup Jobs
 * 
 * @apiParam {Number} id Job ID
 * 
 * @apiSuccess {Number} id Job ID
 * @apiSuccess {Number} company_id Company ID
 * @apiSuccess {String} name Job title
 * @apiSuccess {String} type Job type
 * @apiSuccess {String} description Description of job
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "id": 1,
 *          "company_id": 3,
 *          "name": "Software Engineer",
 *          "type": "Software",
 *          "description": "Build awesome things with us!"
 *      }
 * 
 * @apiError JobNotFound No Job Found
 * 
 * @apiErrorExample Error-Respone: 
 *      HTTP/1.1 404 Not Found
 *      {
 *          "message": "No job with specified ID"
 *      }
 */

router.get("/:id", verifyToken(),validateJob(), async (req, res, next) => {
    try {
        res.json(req.job);
    } catch(err) {
        next(err);
    }
});



// *** GET REQUEST GET ALL COMPANY'S JOBS *** //

/**
 * @api {get} /jobs/company/:id Get all jobs from company
 * @apiName GetCompanysJobs
 * @apiGroup Jobs
 * 
 * @apiParam {Number} id Company ID
 * 
 * @apiSuccess {Number} id Job ID
 * @apiSuccess {Number} company_id Company ID
 * @apiSuccess {String} name Job title
 * @apiSuccess {String} type Job type
 * @apiSuccess {String} description Description of job
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {
 *              "id": 2,
 *              "company_id": 4,
 *              "name": "React Developer",
 *              "type": "Software",
 *              "description": "React developer with 2 years experience"
 *          }
 *      ]
 * 
 * @apiError CompanyNotFound Company not found
 * 
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "message": "Company not found"
 *      }
 * 
 */

router.get("/company/:id", verifyToken(),validateCompany(), async(req, res,next) => {
    try {
        const company_id = req.params.id
        res.json(await db.findBy({company_id}));
    } catch(err) {
        next(err);
    }
});



// *** POST REQUEST ADD JOB *** //

/**
 * @api {post} /jobs Add job
 * @apiName AddJob
 * @apiGroup Jobs
 * 
 * @apiParam {String} name Job title
 * @apiParam {Number} company_id Company ID
 * @apiParam {String} type Job type
 * @apiParam {String} description Job description, can be NULL
 * 
 * @apiSuccess {Number} id Job ID
 * @apiSuccess {String} name Job title
 * @apiSuccess {Number} company_id Company ID
 * @apiSuccess {String} type Job type
 * @apiSuccess {String} description Job description, can be NULL
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 201 Created
 *      {
 *          "id": 4,
 *          "name": "Node.js Engineer",
 *          "company_id": 4,
 *          "type": "Software",
 *          "description": "Looking for a developer with 4 years of Node.js experience"
 *      }
 * 
 * @apiError Missingfields Missing required fields
 * 
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 400 Bad Request
 *      {
 *          "message": "Missing fields"
 *      }
 * 
 */

router.post("/", verifyToken(), validateJobField(), async (req, res, next) => {
    try {
        res.status(201).json(await db.add(req.body));
    } catch(err) {
        next(err);
    }
});



// *** DELETE REQUEST DELETE JOB *** //


/**
 * @api {delete} /jobs/:id Delete Job
 * @apiName DeleteJob
 * @apiGroup Jobs
 * 
 * @apiParam {Number} id Job ID
 * 
 * @apiSuccess {Number} count Count of jobs deleted
 * 
 */

router.delete("/:id", verifyToken(), async(req, res, next) => {
    try {
        res.json(await db.remove(req.params.id));
    } catch(err) {
        next(err);
    }
});


// *** PUT REQUEST UPDATE JOB *** //


/**
 * @api {put} /jobs/:id Update Job
 * @apiName UpdateJob
 * @apiGroup Jobs
 * 
 * @apiParam {String} name Job title
 * @apiParam {Number} company_id Company ID
 * @apiParam {String} type Job type
 * @apiParam {String} description Job description, can be NULL
 * 
 * @apiSuccess {Number} id Job ID
 * @apiSuccess {String} name Job title
 * @apiSuccess {Number} company_id Company ID
 * @apiSuccess {String} type Job type
 * @apiSuccess {String} description Job description, can be NULL
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "id": 4,
 *          "name": "Node.js Engineer",
 *          "company_id": 4,
 *          "type": "Software",
 *          "description": "Looking for a developer with 4 years of Node.js experience"
 *      }
 * 
 * @apiError Missingfields Missing required fields
 * 
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 400 Bad Request
 *      {
 *          "message": "Missing fields"
 *      }
 * 
 */

router.put("/:id", verifyToken(), async(req, res, next) => {
    try {
        res.json(await db.update(req.params.id, req.body));
    } catch(err) {
        next(err);
    }
});

module.exports = router;