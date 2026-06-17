const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');

async function authUser(req,res,next){
    const token = req.cookies.token;

     if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }

//    sikha saini
    if(!token){
        return res.status(401).json({
            message:"Token not provided."
        })
    }
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({token})
    if (isTokenBlacklisted){
        return res.status(401).json({
            message:"Token is invalid"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded;
        next();
    }
    // catch(err){

    //     console.log("JWT ERROR:", err.message);

    //     return res.status(401).json({
    //         message:"Invalid token."
    //     })
    // }
    catch(err){

    console.log("JWT ERROR =>", err);

    return res.status(401).json({
        message:"Invalid token.",
        error: err.message
    })
}
}
module.exports = {authUser}