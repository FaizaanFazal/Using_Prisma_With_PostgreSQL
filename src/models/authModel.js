import dotenv from "dotenv"
import  jwt  from "jsonwebtoken" 
dotenv.config()

export const generateAccestoken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}


export const authenticateToken=(req, res, next)=>{
    const token = req.headers['authorization']
    console.log(req.headers)

    if (token == null) return res.sendStatus(401)
    console.log("verifying")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }