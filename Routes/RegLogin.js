const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const date = require('date-and-time');

const {sign} = require("jsonwebtoken");

const {validateToken} = require("../middleware/AuthMiddleware");


//Register

router.post("/register", async (req,res)=>{

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salt);
    const now  =  new Date();   
    const value = date.format(now,'YYYYMMDDHHmmss');

    const dp = req.files.profilepic;
    var path = "Images/users/" +value+ dp.name;



    dp.mv(path, async (err)=>{
        if(err){
            res.json({"status": "File Not Uploaded"})
            console.log(err);
        }

        else{
            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                password: hashedPass,
                fbid: req.body.fbid,
                instaid: req.body.instaid,
                twitterid: req.body.twitterid,
                youtubeid: req.body.youtubeid,
                profilepic: value+dp.name
            })
            const addedUser = await newUser.save();
            res.json({"status": "Record Successfully Inserted"});

        }
    });
});


// Login

router.post("/login", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({username: username});
    if(!user){
        res.json({"error": "No user found with such username"});
    }
    else{
        bcrypt.compare(password,user.password).then((match)=>{
            if(!match) return res.json({error: "Wrong Credentials"});

            const accesstoken = sign({username: user.username, userid: user._id}, "secretmessage");
            res.json({token: accesstoken, username: user.username, userid: user._id})
        })
    }
})


// Check token

router.get("/verify", validateToken, (req, res)=>{
    res.json(req.user)
})





module.exports= router;