import express from "express";
import { getUsers, getByid, createUser, deleteUser  } from "../controllers/userController.js";
const router = express.Router();

//error handling with higher order component
const use = fn => (req, res, next) =>Promise. resolve(fn (req, res, next)).catch(next);

/**
 * @openapi
 * /users/:
 *   get:
 *     tags:
 *       - User
 *     description: Get list of all users
 *     responses:
 *       200:
 *         description: returns list of users
 */
router.get("/", use(getUsers))

/**
 * @openapi
 * '/users/c7b49336-0bf0-4962-831f-67e5113fe555':
 *  get:
 *    tags:
 *      - User
 *    summary: Get a user by id passed in params
 *    responses:
 *      200:
 *        description: returns a of users with id got from parameter
 *      500:
 *        description: Internal server Error, occurs mostly when porperty names are wrong OR Data type of property is wrongly entered or record not found
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

router.get("/:id", use(getByid))

/**
 * @openapi
 * '/users/':
 *  post:
 *    tags:
 *      - User
 *    summary: Create a new user
 *    description: Create new User with firstName,lastName,age. other porperties are added automatically
 *    security:
 *      - apiAuth: []
 *    requestBody:
 *      description: contains three items firstName, lastName, age
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             age:
 *               type: number
 *    responses:
 *      200:
 *        description: On successful user creation return the user object with status code of 200 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: uid of user
 *                firstName:
 *                  type: string
 *                  description: First name of user
 *                lastName:
 *                  type: string
 *                  description: last Name of user
 *                age:
 *                  type: number
 *                  description: Age of user 
 *                createdAt:
 *                  type: string
 *                  description: date at which user was  created
 *                updatedAt:
 *                  type: string
 *                  description: date at which user was updated
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
router.post("/", use(createUser))

/**
 * @openapi
 * '/users/7dfa3d28-a64f-42c1-b56d-0893ab8f6fa3':
 *  delete:
 *    tags:
 *      - User
 *    summary: delete a user with by id , which is passed in params
 *    responses:
 *      200:
 *        description: On success user is deleted and it is returned with status 200
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: uid of user
 *                firstName:
 *                  type: string
 *                  description: First name of user
 *                lastName:
 *                  type: string
 *                  description: last Name of user
 *                age:
 *                  type: number
 *                  description: Age of user 
 *                createdAt:
 *                  type: string
 *                  description: date at which user was  created
 *                updatedAt:
 *                  type: string
 *                  description: date at which user was updated
 *      500:
 *        description: Internal server Error, occurs mostly when porperty names are wrong OR Data type of property is wrongly entered or params are wrong or not found in db
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
router.delete('/:id',use(deleteUser))

export default router