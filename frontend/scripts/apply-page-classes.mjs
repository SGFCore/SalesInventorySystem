import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, "../src/pages");

const replacements = [
  ['className="p-5 max-w-6xl mx-auto min-h-full"', "className={page.shell}"],
  ['className="flex items-center justify-between gap-4 mb-5"', "className={page.header}"],
  ['className="flex w-full max-w-sm items-center space-x-2"', "className={page.searchWrap}"],
  [
    'className="max-w-sm border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0"',
    "className={input.search}",
  ],
  [
    'className="border border-slate-200 rounded-md overflow-hidden bg-card"',
    "className={page.tableWrap}",
  ],
  ['className="hover:bg-slate-50 border-b border-slate-100"', "className={page.tableRow}"],
  [
    'className="flex items-center justify-between px-4 py-4 bg-white border-t border-slate-100"',
    "className={page.pagination}",
  ],
  [
    'className="flex items-center justify-between px-4 py-4 border-t border-slate-200"',
    "className={page.pagination}",
  ],
  [
    'className="flex items-center justify-between px-4 py-4"',
    "className={page.pagination}",
  ],
  [
    'className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 py-3"',
    "className={page.pagination}",
  ],
  ['className="text-sm text-slate-500"', "className={page.paginationText}"],
  ['className="bg-blue-600 hover:bg-blue-700 text-white"', "className={btn.primary}"],
  [
    'className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"',
    "className={btn.actionPrimary}",
  ],
  [
    'className="text-blue-600 border-blue-200 hover:bg-blue-50"',
    "className={btn.actionPrimary}",
  ],
  ['className="text-blue-600 border-blue-200"', "className={btn.actionPrimary}"],
  [
    'className="text-slate-600 border-slate-200 hover:bg-slate-50 w-full"',
    'className={cn(btn.actionSecondary, "w-full")}',
  ],
  [
    'className="text-slate-600 border-slate-200 hover:bg-slate-50"',
    "className={btn.actionSecondary}",
  ],
  [
    'className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"',
    "className={btn.actionDestructive}",
  ],
  [
    'className="text-red-600 border-red-200 hover:bg-red-50"',
    "className={btn.actionDestructive}",
  ],
  [
    'className="text-red-500 hover:bg-red-100 hover:text-red-600 border-red-200"',
    "className={btn.actionDestructive}",
  ],
  ['className="h-8 w-8 p-0"', "className={btn.paginationNav}"],
  [
    'className="text-lg font-semibold text-slate-900"',
    "className={dialog.title}",
  ],
  ['className="grid gap-4 py-4"', "className={dialog.body}"],
  [
    'className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0"',
    "className={dialog.input}",
  ],
  ['className="w-20 font-medium text-slate-500"', 'className={cn("w-20", entity.id)}'],
  [
    'className="w-20 font-mono text-xs text-slate-500 tabular-nums"',
    'className={cn("w-20", entity.id)}',
  ],
  [
    'className="font-semibold text-left"',
    'className={cn("text-left", entity.name)}',
  ],
  [
    'className="text-left text-sm font-semibold text-slate-900"',
    'className={cn("text-left", entity.name)}',
  ],
  ['className="flex items-center gap-1.5 text-xs text-slate-500 mb-0.5"', "className={entity.rowMeta}"],
  ['className="font-mono text-slate-500 tabular-nums"', "className={entity.id}"],
  ['className="text-slate-300 select-none"', "className={entity.separator}"],
  ['className="font-semibold text-blue-600 mt-0.5"', "className={cn(entity.price, 'mt-0.5')}"],
  ['className="font-medium text-xs text-slate-500"', "className={entity.cellMeta}"],
  [
    'className="text-yellow-600 border-yellow-200 bg-yellow-50"',
    "className={cn(badge.base, badge.pending)}",
  ],
  [
    'className="text-green-600 border-green-200 bg-green-50"',
    "className={cn(badge.base, badge.success)}",
  ],
  [
    'className="text-blue-600 border-blue-200 bg-blue-50"',
    "className={cn(badge.base, badge.info)}",
  ],
  [
    'className="text-slate-600 border-slate-200 bg-slate-50"',
    "className={cn(badge.base, badge.neutral)}",
  ],
  [
    'className="text-red-600 border-red-200 bg-red-50"',
    "className={cn(badge.base, badge.danger)}",
  ],
  ['className="mx-auto max-w-6xl p-5"', "className={page.shell}"],
  [
    'className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-600"',
    "className={cn(btn.actionPrimary, 'flex items-center gap-2')}",
  ],
  [
    'className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 w-full"',
    'className={cn(btn.actionPrimary, "w-full")}',
  ],
];

const statusTextReplacements = [
  [
    /className=\{cn\(\s*"text-xs",\s*(\w+)\.Status === 1 \? "text-green-600" : "text-slate-300",?\s*\)\}/g,
    "className={cn($1.Status === 1 ? entity.statusActive : entity.statusInactive)}",
  ],
  [
    /className=\{cn\(\s*"text-xs",\s*(\w+)\.ProductStatus === 1\s*\?\s*"text-green-600"\s*:\s*"text-slate-300",?\s*\)\}/g,
    "className={cn($1.ProductStatus === 1 ? entity.statusActive : entity.statusInactive)}",
  ],
];

const paginationCnPatterns = [
  [
    /className=\{cn\(\s*"h-8 w-8 p-0(?: text-white)?",\s*currentPage === page \? "bg-blue-600(?: hover:bg-blue-700)?(?: text-white)?(?: border-blue-600)?" : "text-slate-600(?: border-slate-200)?",?\s*\)\}/g,
    "className={cn(currentPage === page ? btn.paginationActive : btn.paginationInactive)}",
  ],
  [
    /className=\{cn\(\s*"h-8 w-8 p-0 transition-none",\s*currentPage === page\s*\?\s*"bg-blue-600 hover:bg-blue-700 text-white border-blue-600"\s*:\s*"text-slate-600 border-slate-200",?\s*\)\}/g,
    "className={cn(currentPage === page ? btn.paginationActive : btn.paginationInactive)}",
  ],
  [
    /className=\{cn\(\s*"h-8 w-8 p-0",\s*currentPage === page \? "bg-blue-600" : "text-slate-600",?\s*\)\}/g,
    "className={cn(currentPage === page ? btn.paginationActive : btn.paginationInactive)}",
  ],
];

function needsImport(content, symbol) {
  return content.includes(`${symbol}.`) || content.includes(`{${symbol}`) || content.includes(`, ${symbol}`);
}

function detectImports(content) {
  const symbols = new Set();
  if (content.includes("page.")) symbols.add("page");
  if (content.includes("input.")) symbols.add("input");
  if (content.includes("btn.")) symbols.add("btn");
  if (content.includes("entity.")) symbols.add("entity");
  if (content.includes("badge.")) symbols.add("badge");
  if (content.includes("dialog.")) symbols.add("dialog");
  if (content.includes("cn(") && !content.includes('from "@/lib/utils"')) symbols.add("__cn__");
  return symbols;
}

function addImports(content, symbols) {
  if (symbols.size === 0) return content;
  if (content.includes('from "@/pages/page-classes"')) {
    return content;
  }

  const pageSymbols = ["page", "input", "btn", "entity", "badge", "dialog"].filter((s) =>
    symbols.has(s),
  );
  if (pageSymbols.length === 0) return content;

  const importLine = `import { ${pageSymbols.join(", ")} } from "@/pages/page-classes";\n`;

  const lastComponentImport = content.lastIndexOf('@/components/');
  const lastPagesImport = content.lastIndexOf('@/pages/');
  const lastLibImport = content.lastIndexOf('@/lib/');
  const lastDataImport = content.lastIndexOf('@/data/');
  const lastContextImport = content.lastIndexOf('@/context/');

  const insertAt = Math.max(
    lastComponentImport,
    lastPagesImport,
    lastLibImport,
    lastDataImport,
    lastContextImport,
  );

  if (insertAt === -1) {
    return importLine + content;
  }

  const lineEnd = content.indexOf("\n", insertAt);
  return content.slice(0, lineEnd + 1) + importLine + content.slice(lineEnd + 1);
}

function ensureCnImport(content) {
  if (!content.includes("cn(")) return content;
  if (content.includes('from "@/lib/utils"')) return content;
  const importLine = 'import { cn } from "@/lib/utils";\n';
  const reactImport = content.indexOf('import ');
  if (reactImport === -1) return importLine + content;
  const lineEnd = content.indexOf("\n", reactImport);
  return content.slice(0, lineEnd + 1) + importLine + content.slice(lineEnd + 1);
}

function fixDialogContent(content) {
  return content.replace(
    /<DialogContent className="(sm:max-w-\[[^\]]+\])(?:\s+bg-white)?(?:\s+border-none)?(?:\s+border border-slate-200)?\s*max-h-\[90vh\]\s*overflow-y-auto(?:\s+rounded-none)?">/g,
    '<DialogContent className={cn("$1", dialog.content)}>',
  );
}

function fixDialogContentSimple(content) {
  return content.replace(
    /<DialogContent className="(sm:max-w-\[[^\]]+\])\s*max-h-\[90vh\]\s*overflow-y-auto">/g,
    '<DialogContent className={cn("$1", dialog.content)}>',
  );
}

function fixDialogFooterButtons(content) {
  let result = content;
  result = result.replace(
    /<Button variant="outline" onClick=\{(\(\) => [^}]+\})\}>/g,
    '<Button variant="outline" className={dialog.cancel} onClick={$1}>',
  );
  result = result.replace(
    /<Button variant="outline" onClick=\{(\(\) => onOpenChange\(false\))\}>/g,
    '<Button variant="outline" className={dialog.cancel} onClick={$1}>',
  );
  result = result.replace(
    /<Button\n\s+className=\{btn\.primary\}\n\s+onClick=\{handleSubmit\}/g,
    "<Button className={dialog.submit} onClick={handleSubmit}",
  );
  return result;
}

function processFile(filePath) {
  if (filePath.endsWith("page-classes.ts")) return false;

  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  for (const [from, to] of replacements) {
    content = content.split(from).join(to);
  }

  for (const [pattern, replacement] of paginationCnPatterns) {
    content = content.replace(pattern, replacement);
  }

  for (const [pattern, replacement] of statusTextReplacements) {
    content = content.replace(pattern, replacement);
  }

  content = content.replace(
    /className=\{cn\(\s*"font-bold(?: text-sm)?",\s*(\w+)\.Status === 1 && "text-black",?\s*\)\}/g,
    "className={cn(entity.name, $1.Status === 0 && entity.nameInactive)}",
  );
  content = content.replace(
    /className=\{cn\(\s*"font-bold text-sm",\s*(\w+)\.ProductStatus === 1 && "text-black",?\s*\)\}/g,
    "className={cn(entity.name, $1.ProductStatus === 0 && entity.nameInactive)}",
  );

  content = fixDialogContent(content);
  content = fixDialogContentSimple(content);
  content = fixDialogFooterButtons(content);

  const symbols = detectImports(content);
  if (symbols.has("__cn__")) symbols.delete("__cn__");
  content = addImports(content, symbols);
  content = ensureCnImport(content);

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    return true;
  }
  return false;
}

function walk(dir) {
  let changed = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      changed += walk(full);
    } else if (entry.name.endsWith(".tsx")) {
      if (processFile(full)) {
        console.log("updated:", path.relative(pagesDir, full));
        changed++;
      }
    }
  }
  return changed;
}

const count = walk(pagesDir);
console.log(`\nDone. ${count} files updated.`);
