import test from "node:test";
import assert from "node:assert/strict";
import { createPrismaInventoryRepository } from "../src/prisma-inventory-repository.js";
import { createPrismaProductRepository } from "../src/prisma-product-repository.js";

function variantRecord(overrides = {}) {
  return {
    id: "variant-1",
    productId: "product-1",
    sku: "KUR-BLU-L",
    barcode: "890100002",
    size: "L",
    color: "Blue",
    fabric: "Cotton",
    costPrice: 900,
    sellingPrice: 1650,
    originalPrice: null,
    reorderLevel: 5,
    status: "ACTIVE",
    createdAt: new Date("2026-07-16T00:00:00.000Z"),
    product: {
      id: "product-1",
      name: "Blue Printed Kurta",
      showOnWebsite: true,
      isFeatured: false,
      isNewArrival: true,
      status: "ACTIVE",
      category: { name: "Kurta" },
      brand: { name: "Subhakamana" }
    },
    inventory: {
      onHand: 4,
      reserved: 0,
      committed: 0,
      damaged: 0,
      returned: 0,
      inTransit: 0,
      version: 1
    },
    ...overrides
  };
}

test("Prisma product repository lists variant-shaped products", async () => {
  const repository = createPrismaProductRepository({
    productVariant: {
      async findMany(query) {
        assert.equal(query.where.deletedAt, null);
        return [variantRecord()];
      }
    }
  });
  const products = await repository.listProducts();
  assert.equal(products[0].name, "Blue Printed Kurta");
  assert.equal(products[0].variant, "L / Blue / Cotton");
  assert.equal(products[0].stock, 4);
});

test("Prisma product repository creates product, variant, and opening inventory", async () => {
  const calls = [];
  const repository = createPrismaProductRepository({
    productVariant: {
      async findUnique({ where }) {
        calls.push(["findUnique", where]);
        return null;
      }
    },
    product: {
      async create({ data }) {
        calls.push(["createProduct", data]);
        assert.equal(data.name, "Test Green Kurta");
        assert.equal(data.variants.create[0].sku, "KUR-GRN-M");
        assert.equal(data.variants.create[0].inventory.create.onHand, 6);
        return {
          variants: [variantRecord({
            id: "variant-2",
            sku: data.variants.create[0].sku,
            barcode: data.variants.create[0].barcode,
            costPrice: data.variants.create[0].costPrice,
            sellingPrice: data.variants.create[0].sellingPrice,
            reorderLevel: data.variants.create[0].reorderLevel,
            inventory: { onHand: 6 },
            product: { name: data.name, category: { name: "Kurta" }, brand: { name: "Subhakamana" }, showOnWebsite: true }
          })]
        };
      }
    },
    inventoryMovement: {
      async create({ data }) {
        calls.push(["createMovement", data]);
        assert.equal(data.movementType, "MANUAL_CORRECTION");
        assert.equal(data.quantity, 6);
        return { id: "movement-opening", ...data };
      }
    }
  });
  const product = await repository.createProduct({
    name: "Test Green Kurta",
    category: "Kurta",
    brand: "Subhakamana",
    variant: "M / Green / Cotton",
    sku: "KUR-GRN-M",
    barcode: "890199001",
    cost: 800,
    price: 1500,
    stock: 6,
    reorder: 2
  });
  assert.equal(product.sku, "KUR-GRN-M");
  assert.equal(calls.filter(([name]) => name === "findUnique").length, 2);
  assert.equal(calls.some(([name]) => name === "createMovement"), true);
});

test("Prisma product repository rejects duplicate SKU before create", async () => {
  const repository = createPrismaProductRepository({
    productVariant: {
      async findUnique({ where }) {
        if (where.sku === "KUR-BLU-L") return variantRecord();
        return null;
      }
    },
    product: {
      async create() {
        throw new Error("should not create duplicate");
      }
    }
  });
  await assert.rejects(
    () => repository.createProduct({ name: "Duplicate", sku: "KUR-BLU-L", barcode: "999" }),
    /SKU/
  );
});

test("Prisma inventory repository lists inventory rows", async () => {
  const repository = createPrismaInventoryRepository({
    productVariant: {
      async findMany() {
        return [variantRecord()];
      }
    }
  });
  const inventory = await repository.listInventory();
  assert.equal(inventory[0].available, 4);
  assert.equal(inventory[0].status, "Low Stock");
});

test("Prisma inventory repository receives stock in a transaction", async () => {
  const calls = [];
  const tx = {
    productVariant: {
      async findUnique({ where }) {
        calls.push(["findVariant", where]);
        return variantRecord();
      },
      async update({ where, data }) {
        calls.push(["updateVariant", where, data]);
        return { id: where.id };
      }
    },
    inventory: {
      async upsert({ where, update }) {
        calls.push(["upsertInventory", where, update]);
        return { variantId: where.variantId, onHand: 9, reserved: 0, committed: 0, damaged: 0, returned: 0, inTransit: 0, version: 2 };
      }
    },
    inventoryMovement: {
      async create({ data }) {
        calls.push(["createMovement", data]);
        return { id: "movement-1", ...data };
      }
    }
  };
  const repository = createPrismaInventoryRepository({
    async $transaction(callback) {
      return callback(tx);
    }
  });
  const result = await repository.receiveStock({ sku: "KUR-BLU-L", quantity: 5, cost: 950, reference: "PO-001", supplier: "Kathmandu Textile" });
  assert.equal(result.product.onHand, 9);
  assert.equal(result.movement.previousOnHand, 4);
  assert.equal(result.movement.newOnHand, 9);
  assert.equal(calls.some(([name]) => name === "createMovement"), true);
});

test("Prisma inventory repository rejects invalid receiving input", async () => {
  const repository = createPrismaInventoryRepository({});
  await assert.rejects(
    () => repository.receiveStock({ sku: "KUR-BLU-L", quantity: 0, cost: 950, reference: "PO-001" }),
    /positive quantity/
  );
});
