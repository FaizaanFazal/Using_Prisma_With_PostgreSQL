import dotenv from "dotenv"
import fs from "fs"
import { PrismaClient } from '@prisma/client';
import { generateAccestoken } from '../models/authModel.js';
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();
dotenv.config()
let refreshTokens = [] //store in db or on server not here in list

export const register = async (req, res, next) => {
    const newAcc = await prisma.accounts.create({ data: req.body });
    res.json(newAcc);
}

export const login = async (req, res, next) => {
    const findacc = await prisma.accounts.findUnique({
        where: {
            email: req.body.email,
        },
    })
    if (!findacc) { throw new Error(404, "User not found") } //error to create
    else {
        if (findacc.password === req.body.password) {
            const useremail = req.body.email
            const user = { email: useremail } //creating object

            const accessToken = generateAccestoken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            //storing refresh token on server for now
            refreshTokens.push(refreshToken)
            //sending response with both tokens
            res.cookie('CSRF',{ httpOnly: true, expires: 0 });
            //for eas of practice sending in response
            res.json({ accessToken: accessToken, refreshToken: refreshToken })
        }
        else {
            throw new Error(400, "Wrong Password")
        }
    }

}

export const logout = async (req, res, next) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
}

export const getToken = (req, res, next) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })

}