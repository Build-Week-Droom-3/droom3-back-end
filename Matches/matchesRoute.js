const express = require("express");

const router = express.Router();

const db = require("./matches-model");

const { verifyToken } = require("../Auth/auth-model");

const data = require("../data/config");

const { validateCompany, validateUser, validateUserMatch} = require("../Middleware/validate");

// *** GET REQUEST COMPANY MATCHES *** //

/**
 * @api {get} /matches/company/:id Get all of a specific company's matches
 * @apiName GetCompanyMatches
 * @apiGroup Matches
 * 
 * @apiParam {Number} id Company's ID
 * 
 * @apiSuccess {Number} id Match ID
 * @apiSuccess {Number} user_id ID of user
 * @apiSuccess {number} job_id ID of job
 * @apiSuccess {String} description Description of job
 * @apiSuccess {String} type Type of job
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {   
 *              "id": 2,
 *              "user_id": 1,
 *              "job_id": 2,
 *              "description": "React Developer with 2 years experience ",
 *              "type": "Software"
 *          },
 *          {
 *              "id":3,
 *              "user_id": 2,
 *              "job_id": 2,
 *              "description": "React Developer with 2 years experience ",
 *              "type": "Software"
 *          }
 *      ]
 * 
 * @apiError CompanyNotFound Company was not found
 * 
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "message":"Company not found"
 *      }
 */

router.get("/company/:id", verifyToken(), validateCompany(), async (req, res, next) => {
    try {
        res.json(await db.findCompanyMatches(req.params.id))
    } catch(err){
        next(err);
    }
});


// *** GET REQUEST USER MATCHES *** //

/**
 * @api {get} /user/:id Get User's matches
 * @apiName GetUserMatches
 * @apiGroup Matches
 * 
 * @apiParam {Number} id User's ID
 * 
 * @apiSuccess {Number} id Match ID
 * @apiSuccess {Number} job_id Job ID
 * @apiSuccess {Number} company_id ID of Company
 * @apiSuccess {String} title Job title
 * @apiSuccess {String} type Job type
 * @apiSuccess {String} description Description of job
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {
 *              "id": 2,
 *              "job_id": 2,
 *              "company_id": 4,
 *              "title": "React Developer",
 *              "type": "Software",
 *              "description": "React developer with 2 years experience"
 *          }
 *      ]
 * 
 * @apiError UserNotFound User was not found
 * 
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "message":"User not found"
 *      }
 */

router.get("/user/:id", verifyToken(), validateUser(), async (req, res, next) => {
    try {
        res.json(await db.findUserMatches(req.params.id));
    } catch(err){
        next(err);
    }
});


// *** GET REQUEST ALL COMPANY'S MATCHES/APPLICATIONS *** //

/**
 * @api {get} /matches/:id Get company's user applications
 * @apiName GetCompanyApplications
 * @apiGroup Matches
 * 
 * @apiParam {Number} id Company ID
 * 
 * @apiSuccess {Number} user_id User's ID
 * @apiSuccess {Number} job_id Job ID
 * @apiSuccess {String} title Job title
 * @apiSuccess {String} description Description of job
 * @apiSuccess {String} type Type of job
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {
 *              "user_id": 1,
 *              "job_id": 1,
 *              "title": "Software Engineer",
 *              "type": "Software",
 *              "description": "Node.js experience preferred"
 *          }
 *      ]
 * 
 * @apiError CompanyNotFound Company was not found
 * 
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "message":"Company not found"
 *      }
 * 
 */


//find all user_matches with company_id == user.id of company
router.get("/:id", verifyToken(), validateCompany(), async(req, res, next) => {
    try {
        res.json(await db.findCompanyUserMatches(req.params.id));
    }catch(err) {
        next(err);
    }
});



// UNUSED FOR NOW
router.get("/", verifyToken(), async(req, res, next) => {
    try {
        res.json(await data("user_matches").select())
    }catch(err) {
        next(err);
    }
});

// *** PUT REQUEST MATCH COMPANY TO USER *** //

/**
 * @api {put} /matches/:id Match Company to User
 * @apiName AddCompanyMatch
 * @apiGroup Matches
 * 
 * @apiParam {Number} id Match ID
 * 
 * @apiSuccess {Number} id Match ID
 * @apiSuccess {Number} user_id User ID
 * @apiSuccess {Number} job_id Job ID
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *       "id": 3,
 *       "match": true,
 *       "user_id": 2,
 *       "job_id": 2
 *      }
 * 
 */

router.put("/:id",verifyToken(), async (req, res, next) => {
    try {
        res.status(200).json(await db.addCompanyMatch(req.params.id));
    }catch(err) {
        next(err);
    }
});


// *** POST REQUEST ADD USER MATCH TO TABLE *** //

/**
 * @api {post} /matches/user Apply user for job
 * @apiName UserApply
 * @apiGroup Matches
 * 
 * @apiParam {Number} user_id User's ID
 * @apiParam {Number} job_id Job ID
 * 
 * @apiSuccess {Number} id Match ID
 * @apiSuccess {Number} user_id User's ID
 * @apiSuccess {Number} job_id Job ID
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 201 Created
 *      {
 *       "id": 4,
 *       "user_id": 2,
 *       "job_id": 1
 *     }
 * 
 * @apiError MissingFields Missing required fields
 * 
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 400 Bad Request
 *      {
 *          "message":"Missing fields"
 *      }
 */

//add user match to user_matches
router.post("/", verifyToken(),validateUserMatch(),async(req, res, next) => {
    try {
        res.status(201).json(await db.addUserMatch(req.body));
    }catch(err) {
        next(err);
    }
});



module.exports = router;