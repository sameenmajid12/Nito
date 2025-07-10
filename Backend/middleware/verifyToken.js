const jwt = require("jsonwebtoken");


function verifyToken(req,res,next){
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    res.status(401).json({message:"Access token missing or malformed"});
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
    if(err){
      res.status(403).json({message:"Invalid or expired token"});
    }
    req.user = decoded
    next();
  })
}

module.exports = verifyToken;