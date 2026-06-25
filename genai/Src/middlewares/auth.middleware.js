const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {

    try {

        let token = req.cookies.token;

        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "Token not provided."
            });
        }

        const isTokenBlacklisted =
            await tokenBlacklistModel.findOne({ token });

        if (isTokenBlacklisted) {
            return res.status(401).json({
                message: "Token is invalid"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (err) {

        console.error("AUTH ERROR =>", err);

        return res.status(401).json({
            message: "Authentication failed.",
            error: err.message
        });
    }
}

module.exports = { authUser };