import express from "express";
import { creatManyHouses, createHouse, getAllHouses, getHouseById } from "../controllers/houseController.js";
const router = express.Router();

const use = fn => (req, res, next) =>Promise. resolve(fn (req, res, next)).catch(next);

router.get("/",use(getAllHouses) )
router.get("/:id", use(getHouseById) )
router.post("/", use(createHouse))
router.delete('/many', use(creatManyHouses))

export default router