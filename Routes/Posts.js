const express = require('express');
const router = express.Router();
const Posts = require("../models/Posts");
const User = require("../models/Users");
const {validateToken} = require("../middleware/AuthMiddleware");
const date = require('date-and-time');



//Post a post

router.post("/", validateToken, async (req,res)=>{

    const now  =  new Date();   
    const value = date.format(now,'YYYYMMDDHHmmss');

    const dp = req.files.photo;
    var path = "Images/posts/" +value+ dp.name;

    const user = await User.findOne({username: req.user.username});


    dp.mv(path, async(err)=>{
        if(err){
            res.json({"status": "File Not Uploaded"})
        }
        else{
            const newPost = new Posts({
                title: req.body.title,
                desc: req.body.desc,
                name: user.name,
                username: user.username,
                photo: value+dp.name,
                category: req.body.category
            });
            const savedPost = await newPost.save();
            user.posts.push(savedPost);
            user.save();
            res.json({"status":"Post Created Successfully"});
        }
    });
})


// Get all Posts

router.get("/", validateToken, async (req, res)=>{
    try{
        posts=await Posts.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json("No post Found");;
    }
});

router.get("/latest", validateToken, async (req, res)=>{
    try{
        posts=await Posts.find().sort({createdAt: -1 });
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json("No post Found");;
    }
})

router.get("/byCategory/:category", validateToken, async (req, res)=>{
    try{
        posts=await Posts.find({category: req.params.category}).sort({createdAt: -1 });
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json("No post Found");
    }
})

router.get("/related/:category", validateToken, async (req, res)=>{
    try{
        posts=await Posts.find({category: {$in: [req.params.category,"Travel"]}}).sort({createdAt: -1 });
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json("No post Found");
    }
})
router.get("/singlePost/:postId", validateToken, async (req, res)=>{
    try{
        posts=await Posts.findOne({_id: req.params.postId});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json("No post Found");
    }
})

router.get("/topPosts", validateToken, async (req, res)=>{
    try{
        posts=await Posts.aggregate([{"$project": 
        {"likecount": {"$size": "$likes"},
        "photo": 1,
        "title": 1,
        "category": 1,
        "createdAt": 1,
        }}, 
        {"$sort": {"likecount": -1}}, {"$limit" : 4}]);
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json("No post Found");
    }
})



module.exports =router