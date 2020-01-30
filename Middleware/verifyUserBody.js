

const verifyBody = () => {
    return async (req, res, next) => {
        if (!req.body.username || !req.body.password || !req.body.first_name || !req.body.last_name || !req.body.occupation || !req.body.interest) {
            return res.status(500).json({message: "Please include all required fields"});
        }
        next();
    }
}

module.exports = {
    verifyBody,
}