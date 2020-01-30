const { generateToken } = require("../Auth/auth-model");
const db = require("../Users/users-model");
const bcrypt = require("bcryptjs");

const verifyRegisterBody = () => {
    return (req, res, next) => {
        if (!req.body.username || !req.body.password || !req.body.first_name || !req.body.last_name || !req.body.occupation || !req.body.interest) {
            return res.status(500).json({message: "Please include all required fields"});
        }
        next();
    }
}

const verifyLoginBody = () => {
    return (req, res, next) => {
        if (!req.body.username || !req.body.password) {
            return res.status(500).json({message: "Please include all required fields"});
        }
        next();
    }
}

const addRegisterToken = () => {
    return async (req, res, next) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 12);
            const user = await db.add(req.body);

            const token = generateToken(user);

            const body = {
                ...user,
                token
            };

            req.data = body;
            next();
        } catch(err) {
            next(err);
        }

    }
}

const addLoginToken = () => {
    return async (req, res, next) => {
        try {
            const { username, password} = req.body;
            const user = await db.findBy({username});

            const validPassword = bcrypt.compareSync(password, user.password);

            if (user && validPassword) {
                const token = generateToken(user);

                req.data = {
                    id: user.id,
                    username: user.username,
                    token
                };
                next();
            } else {
                res.status(401).json({message:"Invalid Credentials"});
            }
        } catch(err) {
            next(err);
        }
    }
}

module.exports = {
    verifyLoginBody,
    verifyRegisterBody,
    addRegisterToken,
    addLoginToken
}