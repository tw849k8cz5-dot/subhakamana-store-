import { ApiError } from "./errors.js";
import { mapVariantRecord } from "./prisma-product-repository.js";

export function createPrismaInventoryRepository(prisma) {
  return {
    async listInventory() {
      const variants = await prisma.productVariant.findMany({
        where: { deletedAt: null },
        orderBy: [{ sku: "asc" }],
        include: inventoryInclude()
      });
      return variants.map(mapInventoryRecord);
    },

    async receiveStock(input) {
      const receiving = normalizeReceivingInput(input);
      return runInTransaction(prisma, async (tx) => {
        const variant = await tx.productVariant.findUnique({
          where: { sku: receiving.sku },
          include: inventoryInclude()
        });
        if (!variant) throw new ApiError(404, "PRODUCT_NOT_FOUND", "No product found for this SKU.");
        await tx.productVariant.update({
          where: { id: variant.id },
          data: { costPrice: receiving.cost }
        });
        const inventory = await tx.inventory.upsert({
          where: { variantId: variant.id },
          update: {
            onHand: { increment: receiving.quantity },
            version: { increment: 1 }
          },
          create: {
            variantId: variant.id,
            onHand: receiving.quantity,
            reserved: 0,
            committed: 0,
            damaged: 0,
            returned: 0,
            inTransit: 0,
            version: 1
          }
        });
        const newOnHand = Number(inventory.onHand || 0);
        const previousOnHand = newOnHand - receiving.quantity;
        const movement = await tx.inventoryMovement.create({
          data: {
            variantId: variant.id,
            movementType: "PURCHASE_RECEIVE",
            quantity: receiving.quantity,
            referenceType: receiving.referenceType,
            referenceId: receiving.referenceId,
            previousOnHand,
            newOnHand,
            reason: `${receiving.quantity} received from ${receiving.supplier}. Ref: ${receiving.reference}`
          }
        });
        return {
          product: {
            ...mapVariantRecord({
              ...variant,
              costPrice: receiving.cost,
              inventory: { ...inventory, onHand: newOnHand }
            }),
            stock: newOnHand,
            onHand: newOnHand
          },
          movement
        };
      });
    }
  };
}

function runInTransaction(prisma, callback) {
  if (typeof prisma.$transaction === "function") return prisma.$transaction(callback);
  return callback(prisma);
}

export function mapInventoryRecord(variant) {
  const row = mapVariantRecord(variant);
  const available = Math.max(0, row.onHand - row.reserved - row.committed - row.damaged);
  return {
    ...row,
    available,
    status: row.onHand <= 0 ? "Out of Stock" : row.onHand <= row.reorder ? "Low Stock" : "In Stock"
  };
}

function inventoryInclude() {
  return {
    product: {
      include: {
        category: true,
        brand: true
      }
    },
    inventory: true
  };
}

function normalizeReceivingInput(input = {}) {
  const sku = String(input.sku || "").trim();
  const quantity = Number(input.quantity || 0);
  const cost = Number(input.cost || 0);
  const reference = String(input.reference || "").trim();
  if (!sku || !Number.isInteger(quantity) || quantity <= 0 || cost < 0 || !reference) {
    throw new ApiError(400, "INVALID_RECEIVING", "SKU, positive quantity, valid cost, and reference are required.");
  }
  return {
    sku,
    quantity,
    cost,
    reference,
    supplier: String(input.supplier || "supplier").trim(),
    referenceType: input.referenceType || "purchase_order",
    referenceId: input.referenceId || null
  };
}
