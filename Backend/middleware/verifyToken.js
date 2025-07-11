const jwt = require("jsonwebtoken");


function verifyToken(req,res,next){
  console.log("Verifying token...")
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({message:"Access token missing or malformed"});
  }

  const token = authHeader.split(" ")[1];
 
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
    if(err){
      return res.status(403).json({message:"Invalid or expired token"});
    }
    req.user = decoded
    next();
  })
}

module.exports = verifyToken;