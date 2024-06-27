import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';

export const createUser = async (username: string, password: string, role: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, password: hashedPassword, role }
  });
  return user;
};
