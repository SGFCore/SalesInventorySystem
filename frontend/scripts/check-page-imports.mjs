import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const pagesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/pages");

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, files);
    else if (e.name.endsWith(".tsx")) files.push(p);
  }
  return files;
}

const issues = [];
for (const f of walk(pagesDir)) {
  if (f.endsWith("page-classes.ts")) continue;
  const c = fs.readFileSync(f, "utf8");
  const rel = path.relative(pagesDir, f);
  const checks = [
    ["entity", /\bentity\./, /import\s*\{[^}]*\bentity\b[^}]*\}\s*from\s*"@\/pages\/page-classes"/],
    ["cn", /\bcn\(/, /import\s*\{[^}]*\bcn\b[^}]*\}\s*from\s*"@\/lib\/utils"/],
    ["dialog", /\bdialog\./, /import\s*\{[^}]*\bdialog\b[^}]*\}\s*from\s*"@\/pages\/page-classes"/],
    ["badge", /\bbadge\./, /import\s*\{[^}]*\bbadge\b[^}]*\}\s*from\s*"@\/pages\/page-classes"/],
    ["input", /\binput\./, /import\s*\{[^}]*\binput\b[^}]*\}\s*from\s*"@\/pages\/page-classes"/],
  ];
  for (const [name, useRe, importRe] of checks) {
    if (useRe.test(c) && !importRe.test(c)) {
      issues.push(`${rel}: missing ${name} import`);
    }
  }
}
console.log(issues.length ? issues.join("\n") : "No import issues");
