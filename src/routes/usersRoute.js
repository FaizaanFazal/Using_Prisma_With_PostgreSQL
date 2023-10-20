import express from "express";
import { getUsers, getByid, createUser, deleteUser  } from "../controllers/userController.js";
const router = express.Router();

//error handling with higher order component
const use = fn => (req, res, next) =>Promise. resolve(fn (req, res, next)).catch(next);

/**
 * @openapi
 * /users/:
 *   get:
 *          description: Get list of all users
 *          responses:
 *              200:
 *                  description: returns list of users
 */
router.get("/", use(getUsers))

/**
 * @openapi
 * /users/c7b49336-0bf0-4962-831f-67e5113fe555:
 *  get:
 *      summary: Register a user
 *      responses:
 *              200:
 *                  description: returns a of users with id got from parameter
 */

router.get("/:id", use(getByid))

/**
 * @swagger
 * /users/:
 *  post:
 *      summary: Create a new sample
 *      description: Create a new sample item.
 *      request Body:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          class:
 *                              type: string
 *          responses:
 *               200:
 *                  description: Successfully created anew sample.
*/
router.post("/", use(createUser))
router.delete('/:id',use(deleteUser))

export default router