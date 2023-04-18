

// import mongose
const mongoose = require('mongoose')

// get conn string frm .env
const DB = process.env.DATABASE

// connect mongodb
mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("database connection successfully");
}).catch((error)=>{
    console.log(error);
})