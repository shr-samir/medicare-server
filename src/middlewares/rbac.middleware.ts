import { NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
/**
 * @DESC Check Role Middleware
 */
export const checkRole =
  (roles: any) => async (req: any, res: any, next: NextFunction) => {
    let id = req.user.id;

    //retrieve employee info from DB
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    // delete user.password
    console.log(user);
    !roles.includes(user?.role)
      ? res.status(401).json('Sorry you do not have access to this route')
      : next();
  };
