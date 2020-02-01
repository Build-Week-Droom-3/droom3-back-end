const db = require("./users-model");
const { verifyToken} = require("../Auth/auth-model");
const { verifyRegister, verifyLogin, registerToken, loginToken} = require("../Middleware/validate");
const companyRoute = require("./companyRoute")
const express = require("express");

const router = express.Router();

router.get("/companies", verifyToken(), async(req, res,next) => {
    try {
        res.json(await db.findCompanies());
    } catch(err) {
        next(err);
    }
});

router.get("/", verifyToken(), async (req, res, next) => {
    try {
        res.json(await db.find());
    } catch(err) {
        next(err);
    }
});


// *** GET REQUEST SPECIFIC USER *** //

/**
 * @api {get} /users/:id Request specific user
 * @apiName GetUser
 * @apiGroup Users
 * 
 * @apiParam {Number} id User id
 * 
 *  * @apiSuccess {Number} id User id
 * @apiSuccess {String} username User's username
 * @apiSuccess {String} name User's name
 * @apiSuccess {String} occupation User's occupation, can be NULL
 * @apiSuccess {Boolean} company Is user a company or not, 0 for false, 1 for true
 * @apiSuccess {String} interest User's interests, can be NULL
 * @apiSuccess {String} experience User's experience, can be NULL
 * @apiSuccess {String} description User's description, can be NULL
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "id": 1,
 *          "username": "example",
 *          "name": "Example User",
 *          "occupation":"Software Developer",
 *          "company": 0,
 *          "interest": "Keyboards, Cars",
 *          "experience": "1 year JavaScript",
 *          "description": "Software Developer in Roanoke !"
 *      }
 * 
 * @apiError UserNotFound User was not found
 * 
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "message":"User not found"
 *      }
 */
router.get("/:id", verifyToken(), async (req, res, next) => {
    try {
        res.json(await db.findUser(req.params.id));
    } catch(err) {
        next(err);
    }
});


// *** POST REQUEST REGISTER *** //

/**
 * @api {post} /users/register User register
 * @apiName Register
 * @apiGroup Users
 *
 * @apiParam {String} username User's username, must be unique
 * @apiParam {String} password User's password
 * @apiParam {String} name User's name, not nullable
 * @apiParam {String} occupation User's occupation, can be NULL
 * @apiParam {Boolean} company Is user a company or not, 0 for false, 1 for true, defaults to 0
 * @apiParam {String} interest User's interests, can be NULL
 * @apiParam {String} experience User's experience, can be NULL
 * @apiParam {String} description User's description, can be NULL
 * 
 * @apiSuccess {Number} id User id
 * @apiSuccess {String} username User's username
 * @apiSuccess {String} token User's token
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 201 Created
 *     {
 *       "id": "1",
 *       "username": "example",
 *       "token": "randomTokenHere"
 *     }
 * @apiError MissingFields Missing required fields
 * 
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 400 Bad Request
 *      {
 *          "message": "Please include all required fields"
 *      }
 */

router.post("/", verifyRegister(),registerToken(), async (req, res, next) => {
    try {
        res.status(201).json(req.data);
    } catch(err) {
        next(err);
    }
});



// *** POST REQUEST LOGIN *** //

/**
 * @api {post} /users/login User login
 * @apiName Login
 * @apiGroup Users
 *
 * @apiParam {String} username User's username
 * @apiParam {String} password User's password
 *
 * @apiSuccess {Number} id User id
 * @apiSuccess {String} username User's username
 * @apiSuccess {String} token User's token
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *     {
 *       "id": "1",
 *       "username": "example",
 *       "token": "randomTokenHere"
 *     }
 * @apiError InvalidCredentials The Username or Password is incorrect
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Invalid Credentials"
 *     }
 */
router.post("/login",verifyLogin(), loginToken(), async (req, res, next) => {
    try {
        res.json(req.data);
    } catch(err) {
        next(err);
    }
});


// *** DELETE REQUEST *** //

/**
 * @api {delete} /users/:id Delete User
 * @apiName DeleteUser
 * @apiGroup Users
 * 
 * @apiParam {Number} id User id
 * 
 * @apiSuccess {Number} count Count of users deleted
 * 
 */

router.delete("/:id", verifyToken(), async(req, res, next) => {
    try {
        res.json(await db.remove(req.params.id));
    } catch(err) {
        next(err);
    }
});



// *** PUT REQUEST *** //

/**
 * @api {put} /users/:id Update User
 * @apiName UpdateUser
 * @apiGroup Users
 * 
 * @apiParam {Number} id User id
 * 
 * @apiSuccess {Number} id User id
 * @apiSuccess {String} username User's username
 * @apiSuccess {String} name User's name
 * @apiSuccess {String} occupation User's occupation, can be NULL
 * @apiSuccess {Boolean} company Is user a company or not, 0 for false, 1 for true
 * @apiSuccess {String} interest User's interests, can be NULL
 * @apiSuccess {String} experience User's experience, can be NULL
 * @apiSuccess {String} description User's description, can be NULL
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "id": 1,
 *          "username": "example",
 *          "name": "Example User",
 *          "occupation":"Software Developer",
 *          "company": 0,
 *          "interest": "Keyboards, Cars",
 *          "experience": "1 year JavaScript",
 *          "description": "Software Developer in Roanoke !"
 *      }
 * 
 * @apiError UserNotFound User was not found
 * 
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "message":"User not found"
 *      }
 * 
 * @apiError MissingFields Missing required fields
 * 
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 400 Bad Request
 *      {
 *          "message": "Please include all required fields"
 *      }
 */

router.put("/:id", verifyToken(), verifyRegister(), async(req, res, next) => {
    try {
        const user = await db.update(req.params.id, req.body)
        if (user) {
            res.json(user);
        } else {
            return res.status(404).json({message: "User not found"});
        }
    } catch(err) {
        next(err);
    }
});

module.exports = router;