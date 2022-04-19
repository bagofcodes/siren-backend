const mongoose= require("mongoose");
const Posts = require("./Posts");
const Likes = require("./Likes");


const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        default:"",
    },
    fbid:{
        type:String,
        default:"#",
    },
    instaid:{
        type:String,
        default:"#",
    },
    twitterid:{
        type:String,
        default:"#",
    },
    youtubeid:{
        type:String,
        default:"#",
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: Likes
    }],
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: Posts
    }],
    
},{timestamps:true});

module.exports = mongoose.model("User",UserSchema);