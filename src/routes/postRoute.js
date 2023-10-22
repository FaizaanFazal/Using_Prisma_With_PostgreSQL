import express from "express";
import { authenticateToken } from "../models/authModel.js";
import { getPost } from "../controllers/postController.js";
const router = express.Router();

const use = fn => (req, res, next) =>Promise. resolve(fn (req, res, next)).catch(next);

router.get("/",use(getPost) )

export default router;