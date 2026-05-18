/** Shared Tailwind class strings for management pages & dialogs. */
export const page = {
  shell: "p-5 max-w-6xl mx-auto min-h-full",
  header: "flex items-center justify-between gap-4 mb-5",
  searchWrap: "flex w-full max-w-sm items-center",
  tableWrap: "border border-slate-200 rounded-md overflow-hidden bg-card",
  tableRow: "hover:bg-slate-50 border-b border-slate-100",
  pagination: "flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50",
  paginationText: "text-sm text-slate-500",
  textMuted: "text-sm text-slate-500",
} as const;

export const input = {
  search: "max-w-sm border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0",
} as const;

export const btn = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white focus-visible:ring-blue-600",
  actionPrimary:
    "text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-blue-600",
  actionSecondary:
    "text-slate-600 border-slate-200 hover:bg-slate-50 focus-visible:ring-slate-400",
  actionDestructive:
    "text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:ring-red-500",
  paginationNav: "h-8 w-8 p-0 border-slate-200",
  paginationActive: "h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 text-white border-blue-600",
  paginationInactive: "h-8 w-8 p-0 text-slate-600 border-slate-200 hover:bg-slate-50",
} as const;

export const entity = {
  rowMeta: "flex items-center gap-1.5 text-xs mb-0.5",
  id: "font-mono text-slate-500 tabular-nums",
  idInactive: "font-mono text-slate-400 tabular-nums",
  separator: "text-slate-300 select-none",
  name: "font-semibold text-sm text-slate-900",
  nameInactive: "font-semibold text-sm text-slate-400",
  statusActive: "text-xs font-medium text-green-600",
  statusInactive: "text-xs text-slate-400",
  cellMeta: "text-xs text-slate-500",
  cellValue: "text-sm text-slate-900",
  cellValueInactive: "text-sm text-slate-400",
  price: "font-semibold text-blue-600",
} as const;

export const badge = {
  base: "font-medium",
  pending: "text-yellow-700 border-yellow-200 bg-yellow-50",
  success: "text-green-700 border-green-200 bg-green-50",
  info: "text-blue-700 border-blue-200 bg-blue-50",
  neutral: "text-slate-600 border-slate-200 bg-slate-50",
  danger: "text-red-700 border-red-200 bg-red-50",
} as const;

export const dialog = {
  content:
    "bg-white border border-slate-200 text-slate-900 shadow-md max-h-[90vh] overflow-y-auto",
  title: "text-lg font-semibold text-slate-900",
  label: "text-slate-700",
  input: "border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0",
  body: "grid gap-4 py-4",
  footer: "border-0 bg-white p-4 pt-0 shadow-none",
  cancel: "border-slate-200 text-slate-700 hover:bg-slate-50",
  submit: "bg-blue-600 hover:bg-blue-700 text-white focus-visible:ring-blue-600",
} as const;
