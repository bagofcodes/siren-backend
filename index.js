// Importing Required Packages and routes
const express = require("express");
const app = express();
const dotenv=require("dotenv");
const cors= require("cors");
const mongoose= require("mongoose");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');


// //Setting the port to 5000 
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());
dotenv.config();
app.use(fileUpload());

// //Making Connection to Mongodb Database
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(console.log("Connected to MongoDB")).catch(err=>console.log(err));



//Setting Up Routes

const regloginRoute = require("./Routes/RegLogin");
app.use("/api/auth",regloginRoute);


const catRoute = require("./Routes/Category");
app.use("/api/cat",catRoute);

const postRoute = require("./Routes/Posts");
app.use("/api/posts",postRoute);

const userRoute = require("./Routes/Users");
app.use("/api/users",userRoute);

const likeRoute = require("./Routes/Likes");
app.use("/api/likes",likeRoute);






// //Making the images folder static
app.use(express.static("Images"));

//Starting the Backend Server
app.listen(PORT, ()=>{
    console.log("Backend Connected Successfully",PORT);
});