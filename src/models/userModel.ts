import prisma from "../lib/prisma";

export async function findByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    throw new Error("User not found");
  }
}

export async function findByNameID(nameID: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { nameID },
    });
    return user;
  } catch (error) {
    throw new Error("User not found");
  }
}
