import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllHouses = async (req, res, next) => {
    try {
        const allhouse = await prisma.house.findMany({
            include: {
                owner: true,
                builtBy: true,
            }
        });
        res.json(allhouse);

    } catch (error) {
        const err = new Error(`Error getting houses`)
        err.status = error.status;
        err.statusCode = error.statusCode;
        next(err)
    }
}

export const getHouseById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const allhouse = await prisma.house.findMany({
            where: { id, },
            include: {
                owner: true,
                builtBy: true,
            }
        });
        res.json(allhouse);
    } catch (error) {
        const err = new Error(`Error fetching house of id: ${req.params.id}`)
        err.status = error.status;
        err.statusCode = error.statusCode;
        next(err)
    }
}


export const createHouse = async (req, res, next) => {
    try {
        const newHouse = await prisma.house.create({ data: req.body });
        res.json(newHouse);
    } catch (error) {
        const err = new Error(`Failed to create House`)
        err.message=error.message;
        err.status = error.status;
        err.statusCode = error.statusCode;
        next(err)
    }
}


export const creatManyHouses = async (req, res, next) => {
    try {
        const newHouse = await prisma.house.createMany({ data: req.body });
        res.json(newHouse);
    } catch (error) {
        const err = new Error(`Failed to create Many houses`)
        err.status = error.status;
        err.statusCode = error.statusCode;
        next(err)
    }
}