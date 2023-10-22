import express from 'express';
import usersRoute from './routes/usersRoute.js'
import houseRoute from './routes/houseRoute.js'
import postRoute from './routes/postRoute.js'
import { PrismaClient } from '@prisma/client';
import swaggerDocs from "./utils/swagger.js";
import { authenticateToken } from './models/authModel.js';

const app = express();
const prisma = new PrismaClient();
const port=3001
app.use(express.json());

//middlewares
app.use("/users/", usersRoute)
app.use("/houses/", houseRoute)
app.use("/posts/",authenticateToken, postRoute)


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
    console.log(`App running at http://localhost:${port}`);
    
})