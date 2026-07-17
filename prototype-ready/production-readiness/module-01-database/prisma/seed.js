import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const permissions = [
  ["auth.login", "auth", "login", "Sign in to the system"],
  ["products.write", "products", "write", "Create and edit products"],
  ["inventory.read", "inventory", "read", "View product stock and availability"],
  ["inventory.receive", "inventory", "receive", "Receive supplier stock"],
  ["inventory.adjust", "inventory", "adjust", "Adjust and correct inventory"],
  ["pos.sale.create", "pos", "sale.create", "Create physical store sales"],
  ["pos.discount.apply", "pos", "discount.apply", "Apply approved discounts"],
  ["orders.manage", "orders", "manage", "Manage store and online orders"],
  ["delivery.manage", "delivery", "manage", "Manage delivery by bill number"],
  ["payments.verify", "payments", "verify", "Verify payments and refunds"],
  ["returns.create", "returns", "create", "Create return or exchange records"],
  ["returns.approve", "returns", "approve", "Approve returns, exchanges, and refunds"],
  ["reports.read", "reports", "read", "View reports and exports"],
  ["users.manage", "users", "manage", "Manage staff users and access"],
  ["settings.manage", "settings", "manage", "Manage store settings"]
];

async function seedAdminPasswordHash() {
  if (process.env.SEED_ADMIN_PASSWORD_HASH) return process.env.SEED_ADMIN_PASSWORD_HASH;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!password || password.length < 8) {
    throw new Error("Set SEED_ADMIN_PASSWORD_HASH or a SEED_ADMIN_PASSWORD with at least 8 characters before running the seed.");
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    throw new Error("SEED_ADMIN_PASSWORD must include letters and numbers.");
  }
  return bcrypt.hash(password, 12);
}

async function main() {
  const passwordHash = await seedAdminPasswordHash();
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
      passwordHash
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
