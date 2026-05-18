import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const pagesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/pages");

const replacements = [
  ['className="max-w-[550px] max-h-[90vh] overflow-y-auto"', 'className={cn("sm:max-w-[550px]", dialog.content)}'],
  ['className="max-w-[500px] max-h-[90vh] overflow-y-auto"', 'className={cn("sm:max-w-[500px]", dialog.content)}'],
  ['className="sm:max-w-[500px] bg-white"', 'className={cn("sm:max-w-[500px]", dialog.content)}'],
  ['className="sm:max-w-[425px] bg-white"', 'className={cn("sm:max-w-[425px]", dialog.content)}'],
  ['className="sm:max-w-[450px] bg-white"', 'className={cn("sm:max-w-[450px]", dialog.content)}'],
  [
    'className="sm:max-w-[500px] bg-white border border-slate-200"',
    'className={cn("sm:max-w-[500px]", dialog.content)}',
  ],
  [
    'className="sm:max-w-[450px] bg-white border border-slate-200"',
    'className={cn("sm:max-w-[450px]", dialog.content)}',
  ],
  [
    'className="sm:max-w-[800px] bg-white border border-slate-200 max-h-[85vh] overflow-y-auto"',
    'className={cn("sm:max-w-[800px] max-h-[85vh]", dialog.content)}',
  ],
  [
    'className="max-w-[550px] bg-white border border-slate-200 max-h-[90vh] overflow-y-auto transition-none"',
    'className={cn("sm:max-w-[550px] transition-none", dialog.content)}',
  ],
  [
    'className="sm:max-w-[500px] bg-white border border-slate-200 transition-none"',
    'className={cn("sm:max-w-[500px] transition-none", dialog.content)}',
  ],
];

function ensureImports(content) {
  let c = content;
  const needsCn = c.includes("cn(") && !/import\s*\{[^}]*\bcn\b/.test(c);
  const needsDialog = c.includes("dialog.") && !/import\s*\{[^}]*\bdialog\b/.test(c);

  if (!needsCn && !needsDialog) return c;

  const importLine =
    needsCn && needsDialog
      ? 'import { cn } from "@/lib/utils";\nimport { dialog } from "@/pages/page-classes";\n'
      : needsCn
        ? 'import { cn } from "@/lib/utils";\n'
        : 'import { dialog } from "@/pages/page-classes";\n';

  const lastImport = Math.max(
    c.lastIndexOf('from "@/components/'),
    c.lastIndexOf('from "@/pages/'),
    c.lastIndexOf('from "@/lib/'),
    c.lastIndexOf('from "@/context/'),
  );
  if (lastImport === -1) return importLine + c;
  const lineEnd = c.indexOf("\n", lastImport);
  return c.slice(0, lineEnd + 1) + importLine + c.slice(lineEnd + 1);
}

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, files);
    else if (e.name.endsWith("Dialog.tsx")) files.push(p);
  }
  return files;
}

for (const f of walk(pagesDir)) {
  let c = fs.readFileSync(f, "utf8");
  const orig = c;
  for (const [from, to] of replacements) {
    c = c.split(from).join(to);
  }
  if (c !== orig) {
    c = ensureImports(c);
    fs.writeFileSync(f, c, "utf8");
    console.log("fixed:", path.relative(pagesDir, f));
  }
}

console.log("Done.");
