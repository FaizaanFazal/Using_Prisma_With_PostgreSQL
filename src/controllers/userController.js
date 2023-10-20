import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUsers = async (req, res, next) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
    } catch (error) {
        const err = new Error(`Failed to fetch users`)
        err.status = error.status;
        err.statusCode = error.statusCode;
        next(err)
    }

}

export const getByid = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id)
        const newAge = req.body.age;
        const updatedUser = await prisma.user.update({
            where: { id: String(id) },
            data: { age: newAge },
        });
        res.json(updatedUser);
    } catch (error) {
        const err = new Error(`user not found with this id->${req.params.id}`)
        err.status = error.status;
        err.statusCode = error.statusCode;
        next(err)
    }
}

export const createUser = async (req, res, next) => {
    try {
        const newUser = await prisma.user.create({ data: req.body });
        res.json(newUser);
    } catch (error) {
        const err = new Error(`Failed to create user`)
        err.status = error.status;
        err.statusCode = error.statusCode;
        next(err)
    }

}
export const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedUser = await prisma.user.delete({
            where: { id: String(id) },
        });
        res.json(deletedUser);
    } catch (error) {
        const err = new Error(`Error deleting user with id->${req.params.id}`)
        err.status = error.status;
        err.statusCode = error.statusCode;
        next(err)
    }
}
