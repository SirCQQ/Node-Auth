const express = require('express');
let router = express.Router();
const verify = require("./verify")


router.get("/",verify,(req,res)=>{
    res.json({
        post:{
            title:"My first post ",
            description:"You shall not see this for fuck sake"
        }
    })
})

module.exports=router;