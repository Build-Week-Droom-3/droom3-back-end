const { generateToken } = require("../Auth/auth-model");
const db = require("../Users/users-model");
const bcrypt = require("bcryptjs");

const verifyRegister = () => {
    return (req, res, next) => {
        if (!req.body.username || !req.body.password || !req.body.name) {
            return res.status(400).json({message: "Please include all required fields"});
        }
        next();
    }
}

const verifyLogin = () => {
    return (req, res, next) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({message: "Please include all required fields"});
        }
        next();
    }
}

const registerToken = () => {
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

const loginToken = () => {
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

const validateUser = () => {
    return async (req, res, next) => {
        const username = req.decoded.username;

        if (username) {
            const user = await db.findBy({username});

            if (user) {
                const token = generateToken(user);
                req.user = {
                    id: user.id,
                    username: user.username,
                    token
                }
                next();
            } else {
                return res.status(500).json({message: "No user with specified username"});
            }
        } else {
            return res.status(500).json({message: "Please provide all required credentials"});
        }
    }
}

const validateJob = () => {
    return async (req, res, next) => {
        if (!req.body.name || !req.body.company_id || !req.body.name || !req.body.type) {
            return res.status(400).json({message: "Please provide all required fields"});
        }
        next();
    }
}

module.exports = {
    verifyLogin,
    verifyLogin,
    verifyRegister,
    validateUser,
    registerToken,
    loginToken,
    validateJob
}