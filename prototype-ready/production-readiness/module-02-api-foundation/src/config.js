export function loadConfig(env = process.env) {
  const nodeEnv = env.NODE_ENV || "development";
  const port = Number(env.PORT || 4000);
  const allowedOrigins = String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return {
    nodeEnv,
    port,
    databaseUrl: env.DATABASE_URL || "",
    sessionSecret: env.SESSION_SECRET || "",
    allowedOrigins,
    isProduction: nodeEnv === "production"
  };
}

export function validateProductionConfig(config) {
  const missing = [];
  if (!config.databaseUrl) missing.push("DATABASE_URL");
  if (!config.sessionSecret || config.sessionSecret.length < 32) missing.push("SESSION_SECRET");
  if (!config.allowedOrigins.length) missing.push("ALLOWED_ORIGINS");
  return missing;
}
