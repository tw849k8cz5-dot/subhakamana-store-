import { ApiError } from "./errors.js";

export const defaultProducts = [
  { id: 1, name: "Red Banarasi Saree", category: "Saree", brand: "Subhakamana", variant: "M / Red / Silk", sku: "SAR-RED-M", barcode: "890100001", cost: 5200, price: 8200, stock: 7, onHand: 7, reserved: 0, committed: 0, damaged: 0, returned: 0, inTransit: 0, reorder: 3 },
  { id: 2, name: "Blue Printed Kurta", category: "Kurta", brand: "Subhakamana", variant: "L / Blue / Cotton", sku: "KUR-BLU-L", barcode: "890100002", cost: 900, price: 1650, stock: 4, onHand: 4, reserved: 0, committed: 0, damaged: 0, returned: 0, inTransit: 0, reorder: 5 },
  { id: 3, name: "Golden Silk Blouse", category: "Blouse", brand: "Heritage", variant: "S / Gold / Silk", sku: "BLO-GOL-S", barcode: "890100003", cost: 620, price: 1150, stock: 18, onHand: 18, reserved: 0, committed: 0, damaged: 0, returned: 0, inTransit: 0, reorder: 4 },
  { id: 4, name: "Maroon Net Dupatta", category: "Dupatta", brand: "Heritage", variant: "Free / Maroon / Net", sku: "DUP-MAR-F", barcode: "890100004", cost: 380, price: 750, stock: 0, onHand: 0, reserved: 0, committed: 0, damaged: 0, returned: 0, inTransit: 0, reorder: 6 },
  { id: 5, name: "Emerald Festival Kurta Set", category: "Kurta", brand: "Subhakamana", variant: "M / Emerald / Rayon", sku: "KUR-EMR-M", barcode: "890100005", cost: 1350, price: 2450, stock: 9, onHand: 9, reserved: 0, committed: 0, damaged: 0, returned: 0, inTransit: 0, reorder: 4 },
  { id: 6, name: "Ivory Embroidered Saree", category: "Saree", brand: "Subhakamana", variant: "Free / Ivory / Georgette", sku: "SAR-IVR-F", barcode: "890100006", cost: 4100, price: 6900, stock: 5, onHand: 5, reserved: 0, committed: 0, damaged: 0, returned: 0, inTransit: 0, reorder: 2 },
  { id: 7, name: "Mustard Cotton Kurta", category: "Kurta", brand: "Subhakamana", variant: "XL / Mustard / Cotton", sku: "KUR-MUS-XL", barcode: "890100007", cost: 780, price: 1450, stock: 16, onHand: 16, reserved: 0, committed: 0, damaged: 0, returned: 0, inTransit: 0, reorder: 5 },
  { id: 8, name: "Royal Violet Party Saree", category: "Saree", brand: "Subhakamana", variant: "Free / Violet / Chiffon", sku: "SAR-VIO-F", barcode: "890100008", cost: 3200, price: 5600, stock: 6, onHand: 6, reserved: 0, committed: 0, damaged: 0, returned: 0, inTransit: 0, reorder: 3 },
  { id: 9, name: "Pink Chiffon Dupatta", category: "Dupatta", brand: "Heritage", variant: "Free / Pink / Chiffon", sku: "DUP-PNK-F", barcode: "890100009", cost: 310, price: 650, stock: 22, onHand: 22, reserved: 0, committed: 0, damaged: 0, returned: 0, inTransit: 0, reorder: 8 },
  { id: 10, name: "Black Velvet Blouse", category: "Blouse", brand: "Heritage", variant: "M / Black / Velvet", sku: "BLO-BLK-M", barcode: "890100010", cost: 720, price: 1350, stock: 12, onHand: 12, reserved: 0, committed: 0, damaged: 0, returned: 0, inTransit: 0, reorder: 4 },
  { id: 11, name: "Teal Daily Wear Kurta", category: "Kurta", brand: "Subhakamana", variant: "S / Teal / Cotton", sku: "KUR-TEA-S", barcode: "890100011", cost: 680, price: 1290, stock: 3, onHand: 3, reserved: 0, committed: 0, damaged: 0, returned: 0, inTransit: 0, reorder: 5 },
  { id: 12, name: "Golden Bridal Dupatta", category: "Dupatta", brand: "Subhakamana", variant: "Free / Gold / Net", sku: "DUP-GOL-F", barcode: "890100012", cost: 980, price: 1850, stock: 7, onHand: 7, reserved: 0, committed: 0, damaged: 0, returned: 0, inTransit: 0, reorder: 3 }
];

export function createCatalogStore(seedProducts = defaultProducts) {
  return {
    products: seedProducts.map((product) => normalizeProduct(product)),
    stockMovements: []
  };
}

export function normalizeProduct(product) {
  const onHand = Number(product.onHand ?? product.stock ?? 0);
  return {
    ...product,
    id: product.id ?? Date.now(),
    cost: Number(product.cost || 0),
    price: Number(product.price || 0),
    stock: onHand,
    onHand,
    reserved: Number(product.reserved || 0),
    committed: Number(product.committed || 0),
    damaged: Number(product.damaged || 0),
    returned: Number(product.returned || 0),
    inTransit: Number(product.inTransit || 0),
    reorder: Number(product.reorder || 0)
  };
}

export function listProducts(store) {
  return store.products.map((product) => ({ ...normalizeProduct(product) }));
}

export function inventoryRows(store) {
  return listProducts(store).map((product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    barcode: product.barcode,
    category: product.category,
    brand: product.brand,
    variant: product.variant,
    cost: product.cost,
    price: product.price,
    stock: product.stock,
    onHand: product.onHand,
    reserved: product.reserved,
    committed: product.committed,
    damaged: product.damaged,
    returned: product.returned,
    inTransit: product.inTransit,
    available: Math.max(0, product.onHand - product.reserved - product.committed - product.damaged),
    reorder: product.reorder,
    status: product.onHand <= 0 ? "Out of Stock" : product.onHand <= product.reorder ? "Low Stock" : "In Stock"
  }));
}

export function createProduct(store, input) {
  const product = normalizeProduct(input || {});
  if (!product.name || !product.sku || !product.barcode) {
    throw new ApiError(400, "INVALID_PRODUCT", "Product name, SKU, and barcode are required.");
  }
  if (store.products.some((item) => String(item.sku).toLowerCase() === String(product.sku).toLowerCase())) {
    throw new ApiError(409, "DUPLICATE_SKU", "A product with this SKU already exists.");
  }
  if (store.products.some((item) => String(item.barcode) === String(product.barcode))) {
    throw new ApiError(409, "DUPLICATE_BARCODE", "A product with this barcode already exists.");
  }
  product.id = product.id || Date.now();
  store.products.push(product);
  if (product.onHand > 0) {
    store.stockMovements.unshift({
      id: `MOV-${Date.now()}`,
      sku: product.sku,
      quantity: product.onHand,
      type: "Opening Stock",
      previousOnHand: 0,
      newOnHand: product.onHand,
      reference: product.sku,
      createdAt: new Date().toISOString()
    });
  }
  return { ...product };
}

export function receiveStock(store, input) {
  const sku = String(input?.sku || "").trim();
  const qty = Number(input?.quantity || 0);
  const cost = Number(input?.cost || 0);
  const reference = String(input?.reference || "").trim();
  const supplier = String(input?.supplier || "supplier").trim();
  if (!sku || qty <= 0 || !Number.isInteger(qty) || cost < 0 || !reference) {
    throw new ApiError(400, "INVALID_RECEIVING", "SKU, positive quantity, valid cost, and reference are required.");
  }
  const product = store.products.find((item) => item.sku === sku);
  if (!product) throw new ApiError(404, "PRODUCT_NOT_FOUND", "No product found for this SKU.");
  const previousOnHand = Number(product.onHand || product.stock || 0);
  product.onHand = previousOnHand + qty;
  product.stock = product.onHand;
  product.cost = cost;
  const movement = {
    id: `MOV-${Date.now()}`,
    sku,
    quantity: qty,
    type: "Purchase Received",
    previousOnHand,
    newOnHand: product.onHand,
    reason: `${qty} received from ${supplier}.`,
    reference,
    createdAt: new Date().toISOString()
  };
  store.stockMovements.unshift(movement);
  return { product: { ...product }, movement };
}
