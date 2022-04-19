const mongoose= require("mongoose");
const Likes = require("./Likes");


const PostSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:true,
    },
    username:{
        type: String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: Likes
    }],
    
    
},{timestamps:true});

module.exports = mongoose.model("Posts",PostSchema);