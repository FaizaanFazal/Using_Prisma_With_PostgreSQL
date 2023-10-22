import express from 'express';
import authRoute from './routes/authRoutes.js'
import { PrismaClient } from '@prisma/client';
import swaggerDocs from "./utils/swagger.js";

const app = express();
const prisma = new PrismaClient();
const port=3002
app.use(express.json());

//middlewares

app.use("/auth/", authRoute)

swaggerDocs(app, port);
//Global Error handling with middlewares
app.all("*", (req, res, next) => {
    const err = new Error(`cant find ${req.originalUrl} on server`)
    err.status = 'fails';
    err.statusCode = 401;
    next(err)
});

app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stack: error.stack
    });
});

app.listen(port, () => {
    console.log(`Auth server running at http://localhost:${port}`);
    
})