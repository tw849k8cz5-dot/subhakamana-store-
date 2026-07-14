import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const schemaPath = path.join(root, "prisma", "schema.prisma");
const readmePath = path.join(root, "README.md");
const seedPath = path.join(root, "prisma", "seed.js");

const schema = fs.readFileSync(schemaPath, "utf8");
const readme = fs.readFileSync(readmePath, "utf8");
const seed = fs.readFileSync(seedPath, "utf8");

const requiredModels = [
  "User",
  "Role",
  "Permission",
  "Session",
  "Customer",
  "Address",
  "Product",
  "ProductVariant",
  "Category",
  "Brand",
  "Supplier",
  "PurchaseOrder",
  "PurchaseItem",
  "Inventory",
  "InventoryMovement",
  "Order",
  "OrderItem",
  "Payment",
  "Delivery",
  "Return",
  "Refund",
  "CashierShift",
  "Stocktake",
  "AuditLog",
  "Notification",
  "Setting",
  "IdempotencyKey"
];

const requiredEnums = [
  "OrderStatus",
  "PaymentStatus",
  "DeliveryStatus",
  "PurchaseStatus",
  "MovementType"
];

const requiredEvidence = [
  "provider = \"postgresql\"",
  "@default(uuid())",
  "@unique",
  "deletedAt",
  "version",
  "billNumber",
  "onHand",
  "reserved",
  "committed",
  "RolePermission",
  "Argon2"
];

const failures = [];

for (const model of requiredModels) {
  if (!schema.includes(`model ${model} `)) {
    failures.push(`Missing Prisma model: ${model}`);
  }
}

for (const enumName of requiredEnums) {
  if (!schema.includes(`enum ${enumName} `)) {
    failures.push(`Missing Prisma enum: ${enumName}`);
  }
}

for (const text of requiredEvidence) {
  const haystack = text === "Argon2" ? readme : schema;
  if (!haystack.includes(text)) {
    failures.push(`Missing evidence: ${text}`);
  }
}

if (!seed.includes("Subhakamana Store") || !seed.includes("deliveryWorkflow")) {
  failures.push("Seed file does not include Subhakamana Store starter settings.");
}

if (failures.length > 0) {
  console.error("Database module verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Database module verification passed.");
