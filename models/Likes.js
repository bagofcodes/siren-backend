const mongoose = require("mongoose");


const LikesSchema = new mongoose.Schema({}, {timestamps:true});

module.exports = mongoose.model("Likes", LikesSchema);

