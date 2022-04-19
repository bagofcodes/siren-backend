const express = require('express');
const router = express.Router();
const User = require("../models/Users");
const Posts = require("../models/Posts");
const Likes = require("../models/Likes");
const {validateToken} = require("../middleware/AuthMiddleware");


// Post a Like

router.post("/", validateToken, async (req,res)=>{
    const user = await User.findOne({username: req.body.username});
    const post = await Posts.findOne({_id: req.body.postId});
    const like = new Likes();
    const newlike = await like.save();
    user.likes.push(newlike);
    user.save();
    post.likes.push(newlike);
    post.save();
    res.json(newlike);
});


// Delete a like

router.delete("/:username/:postId/:likeid", validateToken, async (req,res)=>{
    const user = await User.findOne({username: req.params.username});
    const post = await Posts.findOne({_id: req.params.postId});
    const unlike = await Likes.findOneAndDelete({_id: req.params.likeid});
    user.likes.pull(req.params.likeid);
    user.save();
    post.likes.pull(req.params.likeid);
    post.save();
    res.json({"status": "Unliked"});
});



module.exports =router