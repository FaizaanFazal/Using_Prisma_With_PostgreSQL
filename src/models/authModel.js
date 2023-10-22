import dotenv from "dotenv"
import  jwt  from "jsonwebtoken" 
dotenv.config()

export const generateAccestoken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}


export const authenticateToken=async(req, res, next)=>{
    const token = req.headers['authorization']
    console.log(req.headers)

    if (token == null) return 401;
    console.log("verifying")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return 403;
      req.user = user;
      return user;
    })
  }