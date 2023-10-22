import express from 'express';
import usersRoute from './routes/usersRoute.js'
import houseRoute from './routes/houseRoute.js'
import postRoute from './routes/postRoute.js'
import authRoute from './routes/authRoutes.js'
import { PrismaClient } from '@prisma/client';
import swaggerDocs from "./utils/swagger.js";
import { authenticateToken } from './models/authModel.js';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';


const app = express();
const prisma = new PrismaClient();
const port=3001
var csrfProtection = csurf({ cookie: true });

app.use(express.json());
app.use(cookieParser());

//middlewares
app.get('/', csrfProtection, function(req, res) {
    // Pass the Csrf Token
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.json({});
  });
app.use("/users/", usersRoute)
app.use("/houses/", houseRoute)
app.use("/posts/",csrfProtection,authenticateToken, postRoute)
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
    console.log(`App running at http://localhost:${port}`);
    
})