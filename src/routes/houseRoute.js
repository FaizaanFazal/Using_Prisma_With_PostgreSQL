import express from "express";
import { creatManyHouses, createHouse, getAllHouses, getHouseById } from "../controllers/houseController.js";
const router = express.Router();

const use = fn => (req, res, next) =>Promise. resolve(fn (req, res, next)).catch(next);


/**
 * @openapi
 * /houses/:
 *   get:
 *     tags:
 *       - Houses
 *     description: Get list of all houses
 *     responses:
 *       200:
 *         description: returns list of houses
 */
router.get("/",use(getAllHouses) )


/**
 * @openapi
 * '/houses/{id}':
 *  get:
 *    tags:
 *      - Houses
 *    summary: Get a House by its id passed in params
 *    parameters:
 *      - in: path
 *        name: id
 *        type: integer
 *        required: true
 *        description: Numeric ID of the house to get.
 *    responses:
 *      200:
 *        description: On success the house object with status code of 200 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: uid of house
 *                address:
 *                  type: string
 *                  description: First name of house
 *                wifiPassword:
 *                  type: string
 *                  description: last Name of house
 *                ownerId:
 *                  type: number
 *                  description: Age of house 
 *                builtById:
 *                  type: string
 *                  description: date at which house was  created
 *                owner:
 *                  type: object
 *                  description: date at which house was updated
 *                  properties:
 *                    id:
 *                      type: string
 *                    firstName:
 *                      type: string
 *                    lastName:
 *                      type: string
 *                    age:
 *                      type: number
 *                    createdAt:
 *                      type: string
 *                    updatedAt:
 *                      type: string
 *                builtBy:
 *                  type: object
 *                  description: date at which house was updated
 *                  properties:
 *                    id:
 *                      type: string
 *                    firstName:
 *                      type: string
 *                    lastName:
 *                       type: string
 *                    age:
 *                       type: number
 *                    createdAt:
 *                       type: string
 *                    updatedAt:
 *                       type: string
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
router.get("/:id", use(getHouseById) )

/**
 * @openapi
 * '/houses/':
 *  post:
 *    tags:
 *      - Houses
 *    summary: Create a new house
 *    description: Create new House with address(unique),wifipassword(optional),ownerId,builtById, other porperties are added automatically
 *    security:
 *      - apiAuth: []
 *    requestBody:
 *      description: contains three items address(unique) wifipassword(optional) ownerId builtById Note OwnerId and BuuiltBy id must be present in User table
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             wifiPassword:
 *               type: string
 *             ownerId:
 *               type: string
 *             builtById:
 *               type: string
 *    responses:
 *      200:
 *        description: On successful house creation return the house object with status code of 200 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: uid of house
 *                address:
 *                  type: string
 *                  description: First name of house
 *                wifiPassword:
 *                  type: string
 *                  description: last Name of house
 *                ownerId:
 *                  type: number
 *                  description: Age of house 
 *                builtById:
 *                  type: string
 *                  description: date at which house was  created
 *                createdAt:
 *                  type: string
 *                  description: date at which house was updated
 *                updatedAt:
 *                  type: string
 *                  description: date at which house was updated
 *                                
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
router.post("/", use(createHouse))

/**
 * @openapi
 * '/houses/many':
 *  post:
 *    tags:
 *      - Houses
 *    summary: Create a multiple new houses
 *    description: Create Multiple new House with address(unique),wifipassword(optional),ownerId,builtById, other porperties are added automatically
 *    security:
 *      - apiAuth: []
 *    requestBody:
 *      description: list of multiple objects, and each object contains three items address(unique) wifipassword(optional) ownerId builtById Note OwnerId and BuuiltBy id must be present in User table
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             wifiPassword:
 *               type: string
 *             ownerId:
 *               type: string
 *             builtById:
 *               type: string
 *    responses:
 *      200:
 *        description: On successful house creation return the house object with status code of 200 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: number
 *                  description: count of number of houses created
 *                                
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
router.post('/many', use(creatManyHouses))

export default router