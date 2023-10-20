import express from "express";
import { getUsers, getByid, createUser, deleteUser  } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers)
router.get("/:id", getByid)
router.post("/", createUser)
router.delete('/:id',deleteUser)

export default router