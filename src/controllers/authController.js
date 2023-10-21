import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const register = async (req, res, next) => {
    const newAcc = await prisma.accounts.create({ data: req.body });
    res.json(newAcc);
}

export const login = async (req, res, next) => {
    const findacc = await prisma.accounts.findUnique({
        where: {
          email: req.body.email,
        },
      })
    if(!findacc){ throw new Error(404,"User not found")} //error to create
    else{
        if(findacc.password===req.body.password)
        {res.json(findacc);}
        else{
            throw new  Error(400,"Wrong Password")
        }
    }
    
}