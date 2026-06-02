const mongoose = require("mongoose");

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect to database")
    }
    catch(err){
        console.log(err)
    }
    // console.log("MONGO_URI =", process.env.MONGO_URI);
}
module.exports = connectToDB