import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const pagesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/pages");

for (const file of fs.readdirSync(pagesDir, { recursive: true })) {
  if (!file.endsWith("ManagementPage.tsx")) continue;
  const full = path.join(pagesDir, file);
  let c = fs.readFileSync(full, "utf8");
  if (!c.includes("(page) =>")) continue;
  const orig = c;
  c = c.replace(/\(\s*page\s*\)\s*=>/g, "(pageNum) =>");
  c = c.replace(/currentPage === page\b/g, "currentPage === pageNum");
  c = c.replace(/setCurrentPage\(page\)/g, "setCurrentPage(pageNum)");
  c = c.replace(/key=\{page\}/g, "key={pageNum}");
  c = c.replace(/\{page\}\s*<\/Button>/g, "{pageNum}</Button>");
  if (c !== orig) {
    fs.writeFileSync(full, c, "utf8");
    console.log("fixed:", file);
  }
}
