const mongoose  = require('mongoose'); 

exports.dbconnect = ()=>{
    mongoose.connect(process.env.URL)
    .then(()=>{console.log("Database Connect Successfully")})
    .catch((err)=>{console.log("error in connecting to database", err)})
}