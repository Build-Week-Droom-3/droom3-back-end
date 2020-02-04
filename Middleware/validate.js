const { generateToken } = require("../Auth/auth-model");
const db = require("../Users/users-model");
const bcrypt = require("bcryptjs");
const jobDB = require("../Jobs/jobs-model");


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

            req.data = {
                id: user.id,
                username: user.username,
                token
            };
            next();
        } catch(err) {
            next(err);
        }

    }
}

const loginToken = () => {
    return async (req, res, next) => {
        try {
            const { username, password } = req.body;
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

const validateUserToken = () => {
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
                return res.status(404).json({message: "No user with specified username"});
            }
        } else {
            return res.status(500).json({message: "Please provide all required credentials"});
        }
    }
}

const validateJobField = () => {
    return async (req, res, next) => {
        if (!req.body.name || !req.body.company_id || !req.body.type) {
            return res.status(400).json({message: "Missing fields"});
        }
        next();
    }
}

const validateCompany = () => {
    return async (req, res, next) => {
        try {
            const user = await db.findCompany(req.params.id);

            if (user) {
                req.user = user;
                next();
            } else {
                return res.status(404).json({message: "Company not found"});
            }
        }catch(err) {
            next(err);
        }
    }
}

const validateUser = () => {
    return async (req, res, next) => {
        try {
            const user = await db.findUser(req.params.id);

            if (user) {
                req.user = user;
                next();
            } else {
                return res.status(404).json({message: "User not found"});
            }
        } catch(err) {
            next(err);
        }
    }
}

const validateUserMatch = () => {
    return async (req, res, next) => {
        try {
            if (!req.body.user_id || !req.body.job_id) {
                return res.status(400).json({message: "Missing fields"});
            }
        } catch(err) {
            next(err);
        }
    }
}

const validateJob = () => {
    return async (req, res, next) => {
        try {
            const job = await jobDB.findJob(req.params.id);

            if (job) {
                req.job = job;
                next();
            } else {
                return res.status(404).json({message: "No job with specified ID"});
            }
        } catch(err) {
            next(err);
        }
    }
}

module.exports = {
    verifyLogin,
    verifyLogin,
    verifyRegister,
    validateUserToken,
    registerToken,
    loginToken,
    validateJob,
    validateJobField,
    validateCompany,
    validateUser,
    validateUserMatch
}