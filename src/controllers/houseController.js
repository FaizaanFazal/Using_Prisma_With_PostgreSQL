import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllHouses = async (req, res, next) => {
        const allhouse = await prisma.house.findMany({
            include: {
                owner: true,
                builtBy: true,
            }
        });
        res.json(allhouse);
}

export const getHouseById = async (req, res, next) => {
        const id = req.params.id;
        const allhouse = await prisma.house.findMany({
            where: { id, },
            include: {
                owner: true,
                builtBy: true,
            }
        });
        res.json(allhouse);
}


export const createHouse = async (req, res, next) => {
        const newHouse = await prisma.house.create({ data: req.body });
        res.json(newHouse);

}


export const creatManyHouses = async (req, res, next) => {
        const newHouse = await prisma.house.createMany({ data: req.body });
        res.json(newHouse);
}