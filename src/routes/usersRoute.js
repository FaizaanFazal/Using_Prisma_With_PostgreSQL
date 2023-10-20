import express from "express";
import { getUsers, getByid, createUser, deleteUser  } from "../controllers/userController.js";
const router = express.Router();

//error handling with higher order component
const use = fn => (req, res, next) =>Promise. resolve(fn (req, res, next)).catch(next);

router.get("/", use(getUsers))
router.get("/:id", use(getByid))
router.post("/", use(createUser))
router.delete('/:id',use(deleteUser))

export default router