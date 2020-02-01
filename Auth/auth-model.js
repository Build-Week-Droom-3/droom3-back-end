const jwt = require("jsonwebtoken");
const secret = require("../Secrets/index");

const verifyToken = () => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const decoded = jwt.verify(token, secret.jwtSecret);
            if (token && decoded) {
                req.decoded = decoded.subject;
                next();
            } else {
                return res.status(400).json({message: "You are not authorized"});
            }
        } catch(err) {
            next(err);
        }
    }
}

const generateToken = (user) => {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = {
    verifyToken,
    generateToken
}