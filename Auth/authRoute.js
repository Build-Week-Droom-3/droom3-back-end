const express = require("express");

const {verifyToken } = require("./auth-model");

const { validateUserToken } = require("../Middleware/validate");

const router = express.Router();

/**
 * @api {get} /auth Get user information
 * @apiName GetUserInfo
 * @apiGroup Auth
 * 
 * @apiSuccess {Number} id User ID
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
 * @apiError Unauthorized You are not logged in
 * 
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 Unauthorized
 *      {
 *          "message": "You are not authorized"
 *      }
 */
router.get("/", verifyToken(), validateUserToken(), async (req, res, next) => {
    try {
        res.json(req.user);
    }catch(err) {
        next(err);
    }
});

module.exports = router;