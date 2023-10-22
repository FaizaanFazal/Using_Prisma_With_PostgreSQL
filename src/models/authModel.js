import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()

export const generateAccestoken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

export const readTokens = () => {
    fs.readFile('../../tokens.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const jsonObject = JSON.parse(data);
            console.log(jsonObject);
            return jsonObject;
        }
    });
}


export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']
    console.log(req.headers)

    if (token == null) return 401
    console.log("verifying")
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                resolve(403);
            } else {
                resolve(user);
            }
        });
    })
}