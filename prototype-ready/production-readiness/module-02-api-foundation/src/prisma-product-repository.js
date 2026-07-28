import { ApiError } from "./errors.js";

export function createPrismaProductRepository(prisma) {
  return {
    async listProducts() {
      const variants = await prisma.productVariant.findMany({
        where: { deletedAt: null },
        orderBy: [{ createdAt: "desc" }],
        include: productVariantInclude()
      });
      return variants.map(mapVariantRecord);
    },

    async createProduct(input) {
      const product = normalizeProductInput(input);
      return runInTransaction(prisma, async (tx) => {
        await assertUniqueVariant(tx, product);
        const created = await tx.product.create({
        data: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          material: product.material,
          showOnWebsite: product.showOnWebsite,
          isFeatured: product.isFeatured,
          isNewArrival: product.isNewArrival,
          category: product.category
            ? { connectOrCreate: { where: { slug: slugify(product.category) }, create: { name: product.category, slug: slugify(product.category) } } }
            : undefined,
          brand: product.brand
            ? { connectOrCreate: { where: { name: product.brand }, create: { name: product.brand } } }
            : undefined,
          variants: {
            create: [{
              sku: product.sku,
              barcode: product.barcode,
              size: product.size,
              color: product.color,
              fabric: product.fabric,
              costPrice: product.cost,
              sellingPrice: product.price,
              originalPrice: product.originalPrice,
              reorderLevel: product.reorder,
              inventory: {
                create: {
                  onHand: product.onHand,
                  reserved: 0,
                  committed: 0,
                  damaged: 0,
                  returned: 0,
                  inTransit: 0
                }
              }
            }]
          }
        },
        include: {
          variants: {
            include: productVariantInclude()
          }
        }
      });
        const variant = created.variants[0];
        if (product.onHand > 0) {
          await tx.inventoryMovement.create({
            data: {
              variantId: variant.id,
              movementType: "MANUAL_CORRECTION",
              quantity: product.onHand,
              referenceType: "opening_inventory",
              referenceId: created.id,
              previousOnHand: 0,
              newOnHand: product.onHand,
              reason: "Opening inventory created with product."
            }
          });
        }
        return mapVariantRecord(variant);
      });
    }
  };
}

export function mapVariantRecord(variant) {
  const product = variant.product || {};
  const inventory = variant.inventory || {};
  return {
    id: variant.id,
    productId: variant.productId,
    name: product.name,
    category: product.category?.name || "",
    brand: product.brand?.name || "",
    variant: [variant.size, variant.color, variant.fabric].filter(Boolean).join(" / "),
    sku: variant.sku,
    barcode: variant.barcode,
    cost: Number(variant.costPrice || 0),
    price: Number(variant.sellingPrice || 0),
    originalPrice: variant.originalPrice == null ? null : Number(variant.originalPrice),
    stock: Number(inventory.onHand || 0),
    onHand: Number(inventory.onHand || 0),
    reserved: Number(inventory.reserved || 0),
    committed: Number(inventory.committed || 0),
    damaged: Number(inventory.damaged || 0),
    returned: Number(inventory.returned || 0),
    inTransit: Number(inventory.inTransit || 0),
    reorder: Number(variant.reorderLevel || 0),
    showOnWebsite: Boolean(product.showOnWebsite),
    isFeatured: Boolean(product.isFeatured),
    isNewArrival: Boolean(product.isNewArrival),
    status: variant.status || product.status || "ACTIVE"
  };
}

function productVariantInclude() {
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

async function assertUniqueVariant(prisma, product) {
  const duplicateSku = await prisma.productVariant.findUnique({ where: { sku: product.sku } });
  if (duplicateSku) throw new ApiError(409, "DUPLICATE_SKU", "A product variant with this SKU already exists.");
  if (product.barcode) {
    const duplicateBarcode = await prisma.productVariant.findUnique({ where: { barcode: product.barcode } });
    if (duplicateBarcode) throw new ApiError(409, "DUPLICATE_BARCODE", "A product variant with this barcode already exists.");
  }
}

function runInTransaction(prisma, callback) {
  if (typeof prisma.$transaction === "function") return prisma.$transaction(callback);
  return callback(prisma);
}

function normalizeProductInput(input = {}) {
  const name = String(input.name || "").trim();
  const sku = String(input.sku || "").trim();
  const barcode = String(input.barcode || "").trim();
  if (!name || !sku || !barcode) {
    throw new ApiError(400, "INVALID_PRODUCT", "Product name, SKU, and barcode are required.");
  }
  const variantParts = parseVariant(input.variant);
  return {
    name,
    slug: input.slug ? slugify(input.slug) : slugify(`${name}-${sku}`),
    description: input.description || null,
    material: input.material || input.fabric || variantParts.fabric || null,
    category: input.category ? String(input.category).trim() : "",
    brand: input.brand ? String(input.brand).trim() : "",
    sku,
    barcode,
    size: input.size || variantParts.size || null,
    color: input.color || variantParts.color || null,
    fabric: input.fabric || variantParts.fabric || null,
    cost: Number(input.cost ?? input.costPrice ?? 0),
    price: Number(input.price ?? input.sellingPrice ?? 0),
    originalPrice: input.originalPrice == null ? null : Number(input.originalPrice),
    reorder: Number(input.reorder ?? input.reorderLevel ?? 0),
    onHand: Number(input.onHand ?? input.stock ?? 0),
    showOnWebsite: input.showOnWebsite !== false,
    isFeatured: Boolean(input.isFeatured),
    isNewArrival: Boolean(input.isNewArrival)
  };
}

function parseVariant(variant = "") {
  const [size, color, fabric] = String(variant).split("/").map((part) => part.trim());
  return { size: size || null, color: color || null, fabric: fabric || null };
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 220);
}
