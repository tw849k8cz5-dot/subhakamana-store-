import { ApiError } from "./errors.js";

export function availableStock(inventory) {
  const onHand = Number(inventory?.onHand || 0);
  const reserved = Number(inventory?.reserved || 0);
  const committed = Number(inventory?.committed || 0);
  const damaged = Number(inventory?.damaged || 0);
  return Math.max(0, onHand - reserved - committed - damaged);
}

export function assertCanCommitStock(inventory, quantity) {
  const requested = Number(quantity || 0);
  if (!Number.isInteger(requested) || requested <= 0) {
    throw new ApiError(400, "INVALID_QUANTITY", "Quantity must be a positive whole number.");
  }
  const available = availableStock(inventory);
  if (requested > available) {
    throw new ApiError(409, "INSUFFICIENT_STOCK", "Not enough stock is available for this transaction.", {
      requested,
      available
    });
  }
}

export function nextInventoryVersion(inventory) {
  return Number(inventory?.version || 0) + 1;
}
