// places var into process/runtime
require('dotenv').config()

// express import
const express = require('express')

// cors import
const cors = require('cors')

// import connection
require('./db/connection')

// import router
const router = require('./routes/router')

// create server
const server = express()

server.use(cors())

// to parse json to your server app
server.use(express.json())

// use router
server.use(router)

// var to create port number
const port = process.env.port || 3000

// api testing
server.get('/',(req,res)=>{
    res.status(200).json("server started")
})

// run server
server.listen(port,()=>{
    console.log(`ecart server listening at ${port}`);
})