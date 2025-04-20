const jwt = require("jsonwebtoken");

const authMiddleware= (req,res,next)=>{
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({message:"No token is provided"})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized"})
    }
}

module.exports= authMiddleware;