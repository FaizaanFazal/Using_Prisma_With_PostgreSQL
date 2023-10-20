import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUsers = async (req, res, next) => {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
}

export const getByid = async (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    const newAge = req.body.age;
    const updatedUser = await prisma.user.update({
        where: { id: String(id) },
        data: { age: newAge },
    });
    res.json(updatedUser);
}

export const createUser = async (req, res, next) => {
    const newUser = await prisma.user.create({ data: req.body });
    res.json(newUser);
}
export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    const deletedUser = await prisma.user.delete({
        where: { id: String(id) },
    });
    res.json(deletedUser);
}
