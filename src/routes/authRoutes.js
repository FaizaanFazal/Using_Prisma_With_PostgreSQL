import express from "express";
import { login, register } from "../controllers/authController.js";
const router = express.Router();

const use = fn => (req, res, next) =>Promise. resolve(fn (req, res, next)).catch(next);

/**
 * @openapi
 * '/auth/register':
 *  post:
 *    tags:
 *      - Accounts
 *    summary: Create a new account
 *    description: Create new Account with email,password, other porperties are added automatically
 *    security:
 *      - apiAuth: []
 *    requestBody:
 *      description: contains two items email, password
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string

 *    responses:
 *      200:
 *        description: On successful account creation return the user object with status code of 200 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: uid of user
 *                email:
 *                  type: string
 *                  description: email of user that is unique
 *                password:
 *                  type: string
 *                  description: password of user
 *                createdAt:
 *                  type: string
 *                  description: date at which user was  created
 *      500:
 *        description: Internal server Error, occurs mostly when porperty names are wrong OR Data type of property is wrongly entered
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: Error status
 *                message:
 *                  type: string
 *                  description: Message containg error details for what error occured
 *                stack:
 *                  type: string
 *                  description: stack trace for detailed checking
 */
router.post("/register",use(register) )

/**
 * @openapi
 * '/auth/login':
 *  post:
 *    tags:
 *      - Accounts
 *    summary: Login to account
 *    description: login with email,password, other porperties are added automatically
 *    security:
 *      - apiAuth: []
 *    requestBody:
 *      description: contains two items email, password
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string

 *    responses:
 *      200:
 *        description: On success user account object is returned with  status code of 200 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: uid of user
 *                email:
 *                  type: string
 *                  description: email of user that is unique
 *                password:
 *                  type: string
 *                  description: password of user
 *                createdAt:
 *                  type: string
 *                  description: date at which user was  created
 *      500:
 *        description: Internal server Error, occurs mostly when porperty names are wrong OR Data type of property is wrongly entered
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: Error status
 *                message:
 *                  type: string
 *                  description: Message containg error details for what error occured
 *                stack:
 *                  type: string
 *                  description: stack trace for detailed checking
 */
router.post("/login",use(login) )


export default router