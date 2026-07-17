import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";

const targets = [
  "production-readiness/module-02-api-foundation/src/auth.js",
  "production-readiness/module-02-api-foundation/src/catalog-service.js",
  "production-readiness/module-02-api-foundation/src/config.js",
  "production-readiness/module-02-api-foundation/src/errors.js",
  "production-readiness/module-02-api-foundation/src/idempotency.js",
  "production-readiness/module-02-api-foundation/src/inventory-rules.js",
  "production-readiness/module-02-api-foundation/src/password.js",
  "production-readiness/module-02-api-foundation/src/prisma-inventory-repository.js",
  "production-readiness/module-02-api-foundation/src/prisma-product-repository.js",
  "production-readiness/module-02-api-foundation/src/prisma-session-repository.js",
  "production-readiness/module-02-api-foundation/src/prisma-user-repository.js",
  "production-readiness/module-02-api-foundation/src/rbac-middleware.js",
  "production-readiness/module-02-api-foundation/src/rbac.js",
  "production-readiness/module-02-api-foundation/src/server.js",
  "production-readiness/module-02-api-foundation/src/session.js",
  "production-readiness/module-01-database/prisma/seed.js",
  "production-readiness/module-01-database/scripts/verify-database-module.js"
];

const htmlTargets = [
  "subhakamana-store-final-erp-platform.html",
  "subhakamana-store-ecommerce.html",
  "subhakamana-store-physical-pos.html"
];

function resolveProjectFile(relativePath) {
  const candidates = [
    relativePath,
    `prototype-ready/${relativePath}`,
    `outputs/SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17/${relativePath}`
  ];
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) throw new Error(`Missing validation target. Checked: ${candidates.join(", ")}`);
  return found;
}

function checkJavaScript(file) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (result.status !== 0) {
    process.stderr.write(result.stdout || "");
    process.stderr.write(result.stderr || "");
    throw new Error(`JavaScript syntax check failed: ${file}`);
  }
  console.log(`OK ${file}`);
}

function extractInlineScript(file) {
  const html = readFileSync(file, "utf8");
  const match = html.match(/<script>([\s\S]*?)<\/script>/);
  if (!match) return "";
  return match[1];
}

const tmp = mkdtempSync(join(tmpdir(), "subhakamana-static-"));

try {
  for (const target of targets) checkJavaScript(resolveProjectFile(target));

  for (const target of htmlTargets) {
    const file = resolveProjectFile(target);
    const script = extractInlineScript(file);
    if (!script.trim()) {
      console.log(`SKIP ${file} has no inline script`);
      continue;
    }
    const tempFile = join(tmp, `${basename(file)}.js`);
    writeFileSync(tempFile, script, "utf8");
    checkJavaScript(tempFile);
    console.log(`OK inline script ${file}`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
