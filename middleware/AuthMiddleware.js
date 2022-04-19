const {verify} = require("jsonwebtoken");

const validateToken = (req,res,next)=>{
    const accessToken = req.header("accessToken");
    if(!accessToken) return res.json({error: "User is not Logged in..!!"});

    try{
        const validToken = verify(accessToken, "secretmessage");
        req.user = validToken;

        if(validToken){
            return next();
        }
    }catch(err){
        return res.json({error: err});
    }

};

module.exports = {validateToken};