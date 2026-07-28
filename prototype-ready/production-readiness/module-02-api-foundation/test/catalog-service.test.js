import test from "node:test";
import assert from "node:assert/strict";
import { createCatalogStore, createProduct, inventoryRows, listProducts, receiveStock } from "../src/catalog-service.js";

test("first: ERP Product List reads products from backend service", () => {
  const store = createCatalogStore();
  const products = listProducts(store);
  assert.equal(products.length >= 4, true);
  assert.equal(products[0].sku, "SAR-RED-M");
});

test("then: Add Product creates a product through backend service", () => {
  const store = createCatalogStore();
  const product = createProduct(store, {
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
  assert.equal(listProducts(store).some((item) => item.sku === "KUR-GRN-M"), true);
});

test("then: Inventory View reads stock rows from backend service", () => {
  const store = createCatalogStore();
  const rows = inventoryRows(store);
  const lowStock = rows.find((row) => row.sku === "KUR-BLU-L");
  assert.equal(lowStock.status, "Low Stock");
  assert.equal(lowStock.available, 4);
});

test("then: Receive Stock updates backend inventory and movement record", () => {
  const store = createCatalogStore();
  const result = receiveStock(store, {
    sku: "KUR-BLU-L",
    quantity: 5,
    cost: 950,
    reference: "PO-TEST-001",
    supplier: "Kathmandu Textile House"
  });
  assert.equal(result.product.onHand, 9);
  assert.equal(result.product.cost, 950);
  assert.equal(result.movement.previousOnHand, 4);
  assert.equal(result.movement.newOnHand, 9);
  assert.equal(inventoryRows(store).find((row) => row.sku === "KUR-BLU-L").status, "In Stock");
});

test("backend service rejects duplicate SKU and invalid receiving", () => {
  const store = createCatalogStore();
  assert.throws(() => createProduct(store, { name: "Duplicate", sku: "SAR-RED-M", barcode: "999", stock: 1 }), /SKU/);
  assert.throws(() => receiveStock(store, { sku: "SAR-RED-M", quantity: 0, cost: 10, reference: "BAD" }), /positive quantity/);
});
