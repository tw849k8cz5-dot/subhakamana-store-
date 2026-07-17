import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const permissions = [
  ["auth.login", "auth", "login", "Sign in to the system"],
  ["products.manage", "products", "manage", "Create and edit products"],
  ["inventory.manage", "inventory", "manage", "Adjust and receive stock"],
  ["orders.manage", "orders", "manage", "Manage store and online orders"],
  ["delivery.manage", "delivery", "manage", "Manage delivery by bill number"],
  ["payments.manage", "payments", "manage", "Verify payments and refunds"],
  ["reports.view", "reports", "view", "View reports and exports"],
  ["settings.manage", "settings", "manage", "Manage store settings"]
];

async function main() {
  const ownerRole = await prisma.role.upsert({
    where: { name: "Owner" },
    update: {},
    create: { name: "Owner", description: "Full access for Subhakamana Store owner." }
  });

  for (const [code, module, action, description] of permissions) {
    const permission = await prisma.permission.upsert({
      where: { code },
      update: { module, action, description },
      create: { code, module, action, description }
    });

    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: ownerRole.id, permissionId: permission.id } },
      update: {},
      create: { roleId: ownerRole.id, permissionId: permission.id }
    });
  }

  await prisma.user.upsert({
    where: { email: process.env.SEED_ADMIN_EMAIL ?? "admin@subhakamanastore.local" },
    update: { roleId: ownerRole.id },
    create: {
      roleId: ownerRole.id,
      fullName: process.env.SEED_ADMIN_NAME ?? "Subhakamana Store Admin",
      email: process.env.SEED_ADMIN_EMAIL ?? "admin@subhakamanastore.local",
      passwordHash: process.env.SEED_ADMIN_PASSWORD_HASH ?? "replace_with_argon2_hash_from_auth_module"
    }
  });

  const categories = [
    ["Kurta Sets", "kurta-sets"],
    ["Sarees", "sarees"],
    ["Dupattas", "dupattas"],
    ["Festival Wear", "festival-wear"]
  ];

  for (const [name, slug] of categories) {
    await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { name, slug }
    });
  }

  await prisma.setting.upsert({
    where: { key: "store.profile" },
    update: {
      value: {
        name: "Subhakamana Store",
        currency: "NPR",
        country: "Nepal",
        deliveryWorkflow: "bill-number-product-first"
      }
    },
    create: {
      key: "store.profile",
      value: {
        name: "Subhakamana Store",
        currency: "NPR",
        country: "Nepal",
        deliveryWorkflow: "bill-number-product-first"
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
