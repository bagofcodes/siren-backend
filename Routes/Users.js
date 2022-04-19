const express = require('express');
const router = express.Router();
const User = require("../models/Users");
const {validateToken} = require("../middleware/AuthMiddleware");



//Get a User 

router.get("/byUsername/:username", validateToken, async (req, res)=>{
    try{
        user=await User.findOne({username:req.params.username});
        res.status(200).json({profilepic: user.profilepic, fbid: user.fbid, instaid: user.instaid, twitterid: user.twitterid, youtubeid: user.youtubeid, likes: user.likes});
    }catch(err){
        res.status(500).json("No User Found");;
    }
});

module.exports =router
