import { ApiError } from "./errors.js";

export const permissions = {
  POS_CREATE_SALE: "pos.sale.create",
  POS_APPLY_DISCOUNT: "pos.discount.apply",
  PAYMENTS_VERIFY: "payments.verify",
  RETURNS_CREATE: "returns.create",
  RETURNS_APPROVE: "returns.approve",
  INVENTORY_READ: "inventory.read",
  INVENTORY_RECEIVE: "inventory.receive",
  INVENTORY_ADJUST: "inventory.adjust",
  PRODUCTS_WRITE: "products.write",
  REPORTS_READ: "reports.read",
  USERS_MANAGE: "users.manage"
};

export const rolePermissions = {
  SUPER_ADMIN: Object.values(permissions),
  ADMIN: [
    permissions.POS_CREATE_SALE,
    permissions.POS_APPLY_DISCOUNT,
    permissions.PAYMENTS_VERIFY,
    permissions.RETURNS_CREATE,
    permissions.RETURNS_APPROVE,
    permissions.INVENTORY_READ,
    permissions.INVENTORY_RECEIVE,
    permissions.INVENTORY_ADJUST,
    permissions.PRODUCTS_WRITE,
    permissions.REPORTS_READ
  ],
  MANAGER: [
    permissions.POS_CREATE_SALE,
    permissions.POS_APPLY_DISCOUNT,
    permissions.PAYMENTS_VERIFY,
    permissions.RETURNS_CREATE,
    permissions.RETURNS_APPROVE,
    permissions.INVENTORY_READ,
    permissions.INVENTORY_RECEIVE,
    permissions.INVENTORY_ADJUST,
    permissions.REPORTS_READ
  ],
  CASHIER: [
    permissions.POS_CREATE_SALE,
    permissions.POS_APPLY_DISCOUNT,
    permissions.RETURNS_CREATE,
    permissions.INVENTORY_READ
  ],
  INVENTORY_STAFF: [
    permissions.INVENTORY_READ,
    permissions.INVENTORY_RECEIVE,
    permissions.PRODUCTS_WRITE
  ],
  REPORTS_VIEWER: [permissions.REPORTS_READ]
};

export function hasPermission(role, permission) {
  return Boolean(rolePermissions[role]?.includes(permission));
}

export function assertPermission(role, permission) {
  if (!hasPermission(role, permission)) {
    throw new ApiError(403, "FORBIDDEN", "This role is not allowed to perform this action.", { role, permission });
  }
  return true;
}

export function permissionsFromUser(user) {
  if (!user) return [];
  if (Array.isArray(user.permissions)) return user.permissions;
  if (Array.isArray(user.role?.permissions)) {
    return user.role.permissions
      .map((entry) => entry?.permission?.code || entry?.code)
      .filter(Boolean);
  }
  return rolePermissions[user.role?.name || user.role] || [];
}

export function assertUserPermission(user, permission) {
  const allowed = permissionsFromUser(user);
  if (!allowed.includes(permission)) {
    throw new ApiError(403, "FORBIDDEN", "This user is not allowed to perform this action.", {
      userId: user?.id,
      role: user?.role?.name || user?.role,
      permission
    });
  }
  return true;
}
