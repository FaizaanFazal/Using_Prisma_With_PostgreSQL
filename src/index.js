import express from 'express';
import usersRoute from './routes/usersRoute.js'
import houseRoute from './routes/houseRoute.js'
import { PrismaClient } from '@prisma/client';

const app=express();
const prisma=new PrismaClient();
app.use(express.json());



//middlewares
app.use("/users/",usersRoute)
app.use("/houses/",houseRoute)

//Global Error handling with middlewares
app.all("*",(req,res,next)=>{
    const err=new Error(`cant find ${req.originalUrl} on server`)
    err.status='fails';
    err.statusCode=401;
    next(err)
})
//error handling with higher order component
// app.use(function(err, req, res, next) {
//     console.log(err);
//     res.status (500).send({ message: 'Something went wrong' });
//     });
app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status =error.status || 'error';
    res.status (error.statusCode).json ({
    status: error.status,
    message: error.message,
    stack: error.stack
    });
    });

app.listen(3001,()=>console.log("server running on port 3001"));
