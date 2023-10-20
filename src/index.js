import express from 'express';
import usersRoute from './routes/usersRoute.js'
import houseRoute from './routes/houseRoute.js'
import { PrismaClient } from '@prisma/client';
import swaggerDocs from "./utils/swagger.js";
// import logger from "./utils/logger.js";

const app = express();
const prisma = new PrismaClient();
const port=3001
app.use(express.json());

// // Swagger options
// const swaggerOptions = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Users and house API's with Swagger",
//             version: "1.0.0",
//             description:
//                 "Swagger integration with Node.js",
//         },
//         servers: [
//             {
//                 url: 'http://localhost:3001/'
//             }
//         ]
//     },
// //     apis: ['./src/routes/*.js'], // Path to the API routes directory
// // };

// const swaggerSpec =swaggerJSDoc(swaggerOptions);
// //serve swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//middlewares
app.use("/users/", usersRoute)
app.use("/houses/", houseRoute)
swaggerDocs(app, port);
//Global Error handling with middlewares
app.all("*", (req, res, next) => {
    const err = new Error(`cant find ${req.originalUrl} on server`)
    err.status = 'fails';
    err.statusCode = 401;
    next(err)
})
//error handling with higher order component
// app.use(function(err, req, res, next) {
//     console.log(err);
//     res.status (500).send({ message: 'Something went wrong' });
//     });
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