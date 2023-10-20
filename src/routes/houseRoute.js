import express from "express";
import { creatManyHouses, createHouse, getAllHouses, getHouseById } from "../controllers/houseController.js";

const router = express.Router();

router.get("/",getAllHouses )
router.get("/:id",getHouseById )
router.post("/", createHouse)
router.delete('/many',creatManyHouses)

export default router