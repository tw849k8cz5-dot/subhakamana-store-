export function createPrismaSessionRepository(prisma) {
  return {
    create(data) {
      return prisma.session.create({
        data,
        include: sessionInclude()
      });
    },

    findByRefreshTokenHash(refreshTokenHash) {
      return prisma.session.findFirst({
        where: {
          refreshTokenHash,
          status: "ACTIVE",
          deletedAt: null
        },
        include: sessionInclude()
      });
    },

    revokeByRefreshTokenHash(refreshTokenHash, revokedAt) {
      return prisma.session.updateMany({
        where: {
          refreshTokenHash,
          revokedAt: null,
          status: "ACTIVE"
        },
        data: {
          revokedAt,
          status: "INACTIVE"
        }
      });
    }
  };
}

function sessionInclude() {
  return {
    user: {
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
    }
  };
}
