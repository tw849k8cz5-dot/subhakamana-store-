import { normalizeEmail } from "./auth.js";

export function createPrismaUserRepository(prisma) {
  return {
    findByEmail(email) {
      return prisma.user.findUnique({
        where: { email: normalizeEmail(email) },
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true
                }
              }
            }
          }
        }
      });
    }
  };
}
