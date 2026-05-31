/**
 * capture-all-dialogs.cjs  –  v2 COMPREHENSIVE
 * Captures ALL 60+ Dialog/Modal components across the entire SGFMS app.
 * Injects red numbered badges, screenshots, then closes.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL   = 'http://localhost:5173';
const OUT_ROOT   = path.resolve(__dirname, '../../instruction');
const PHONE      = '0988444555';
const PASSWORD   = 'hashed_mgr';

// ─── Helpers ────────────────────────────────────────────────────────────────

const mkDir = (d) => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); };

async function navTo(page, route) {
  await page.evaluate((p) => {
    window.history.pushState({}, '', p);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, route);
  await page.waitForTimeout(2500);
  try { await page.waitForLoadState('networkidle', { timeout: 6000 }); } catch {}
  await page.waitForTimeout(800);
}

async function waitDialog(page, ms = 5000) {
  try { await page.waitForSelector('[role="dialog"]', { timeout: ms }); await page.waitForTimeout(800); return true; }
  catch { return false; }
}

async function closeDialog(page) {
  try {
    // prefer Hủy / Đóng / Close buttons inside dialog
    const btns = await page.$$('[role="dialog"] button');
    for (const b of btns) {
      const t = (await b.textContent() || '').trim();
      if (['Hủy','Đóng','Close','Cancel'].includes(t)) { await b.click(); await page.waitForTimeout(800); return; }
    }
    await page.keyboard.press('Escape');
    await page.waitForTimeout(800);
  } catch {}
}

async function findAndClick(page, texts) {
  for (const text of texts) {
    try {
      const btns = await page.$$('button');
      for (const b of btns) {
        const t = (await b.textContent() || '').trim();
        if (t.includes(text)) { await b.scrollIntoViewIfNeeded(); await b.click(); return true; }
      }
    } catch {}
  }
  return false;
}

async function findFirstRowBtn(page, text) {
  try {
    const rows = await page.$$('tbody tr');
    if (!rows.length) return false;
    const row = rows[0];
    const btns = await row.$$('button');
    for (const b of btns) {
      const t = (await b.textContent() || '').trim();
      if (t.includes(text)) { await b.scrollIntoViewIfNeeded(); await b.click(); return true; }
    }
  } catch {}
  return false;
}

async function findFirstRowDropdownItem(page, itemText) {
  try {
    const rows = await page.$$('tbody tr');
    if (!rows.length) return false;
    const row = rows[0];
    // find trigger button (MoreHorizontal / "..." icon)
    const triggers = await row.$$('button');
    for (const t of triggers) {
      const icon = await t.$('svg');
      if (icon) { await t.click(); await page.waitForTimeout(600); break; }
    }
    // find dropdown item
    const items = await page.$$('[role="menuitem"], [data-radix-collection-item]');
    for (const item of items) {
      const t = (await item.textContent() || '').trim();
      if (t.includes(itemText)) { await item.click(); return true; }
    }
  } catch {}
  return false;
}

async function clickTab(page, text) {
  try {
    const els = await page.$$('[role="tab"], button');
    for (const el of els) {
      const t = (await el.textContent() || '').trim();
      if (t.includes(text)) { await el.click(); await page.waitForTimeout(2000); return true; }
    }
  } catch {}
  return false;
}

async function annotate(page, items) {
  await page.evaluate((ann) => {
    const old = document.getElementById('__ann__');
    if (old) old.remove();
    const layer = document.createElement('div');
    layer.id = '__ann__';
    layer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2147483647;';
    document.body.appendChild(layer);
    ann.forEach(({ sel, n, fx, fy }) => {
      let x = fx || 400, y = fy || 300;
      if (sel) {
        let el = document.querySelector('[role="dialog"] ' + sel) || document.querySelector(sel);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.width > 0) { x = Math.min(Math.max(r.left + r.width / 2, 16), window.innerWidth - 16); y = Math.min(Math.max(r.top + r.height / 2, 16), window.innerHeight - 16); }
        }
      }
      const d = document.createElement('div');
      d.textContent = String(n);
      d.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:26px;height:26px;background:#e53e3e;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;font-family:Arial,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.5);z-index:2147483647;pointer-events:none;transform:translate(-50%,-50%);border:2px solid #fff;`;
      layer.appendChild(d);
    });
  }, items);
}

async function shot(page, ann, outPath) {
  await annotate(page, ann);
  await page.waitForTimeout(400);
  await page.screenshot({ path: outPath, fullPage: false });
  console.log('  ✅', path.basename(outPath));
}

// ─── LOGIN ───────────────────────────────────────────────────────────────────
async function login(page) {
  await page.goto(`${BASE_URL}/signin`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const ph = await page.$('#employeeId,input[type="tel"],input[placeholder*="SĐT"]');
  if (ph) await ph.fill(PHONE);
  const pw = await page.$('#password,input[type="password"]');
  if (pw) await pw.fill(PASSWORD);
  await page.click('button[type="submit"]');
  try { await page.waitForURL('**/', { timeout: 12000 }); } catch {}
  await page.waitForTimeout(2500);
  if (page.url().includes('signin')) throw new Error('Login failed');
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'vi-VN' });
  const page = await ctx.newPage();

  console.log('🔐 Logging in...');
  await login(page);
  console.log('✅ Logged in\n');

  // ══════════════════════════════════════════
  // [2] EMP-MANAGEMENT
  // ══════════════════════════════════════════
  console.log('📋 [2] emp-management');
  const d2 = path.join(OUT_ROOT, '2-emp-management'); mkDir(d2);
  await navTo(page, '/emp-management');

  // NewEmpDialog
  console.log('  → NewEmpDialog');
  await findAndClick(page, ['nhân viên mới','Thêm nhân viên']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,h3,[class*="title"]',n:1},{sel:'#fullname',n:2},{sel:'#email',n:3},
      {sel:'#phone',n:4},{sel:'#password',n:5},{sel:'[role="dialog"] [class*="grid-cols-2"]',n:6},
      {sel:'[role="dialog"] footer button:first-child',n:7},{sel:'[role="dialog"] footer button:last-child',n:8}
    ], path.join(d2,'NewEmpDialog.png'));
    await closeDialog(page);
  }

  // EditEmpDialog
  console.log('  → EditEmpDialog');
  await findFirstRowBtn(page,'Cập nhật');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,h3,[class*="title"]',n:1},{sel:'#fullname',n:2},{sel:'#email',n:3},
      {sel:'#phone',n:4},{sel:'#password',n:5},{sel:'footer button:last-child',n:6}
    ], path.join(d2,'EditEmpDialog.png'));
    await closeDialog(page);
  }

  // EditRoleDialog
  console.log('  → EditRoleDialog');
  await findFirstRowBtn(page,'Sửa quyền');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,h3,[class*="title"]',n:1},{sel:'[role="dialog"] [class*="grid"]',n:2},
      {sel:'[role="dialog"] footer button:first-child',n:3},{sel:'[role="dialog"] footer button:last-child',n:4}
    ], path.join(d2,'EditRoleDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [3] CUSTOMER-PARTNER → Partners tab
  // ══════════════════════════════════════════
  console.log('\n📋 [3] comp-management');
  const d3 = path.join(OUT_ROOT, '3-comp-management'); mkDir(d3);
  await navTo(page, '/customer-partner-management');
  await page.waitForTimeout(1000);

  console.log('  → NewCompDialog');
  await findAndClick(page, ['đối tác mới','Thêm đối tác']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'#new-shipCompanyName',n:2},{sel:'#new-supportedRegion',n:3},
      {sel:'#new-email',n:4},{sel:'#new-phone',n:5},{sel:'#new-address',n:6},
      {sel:'#new-notes',n:7},{sel:'footer button:last-child',n:8}
    ], path.join(d3,'NewCompDialog.png'));
    await closeDialog(page);
  }

  console.log('  → DetailCompDialog');
  await findFirstRowBtn(page,'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] .grid > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] .grid > div:nth-child(2)',n:3},{sel:'[role="dialog"] .grid > div:nth-child(3)',n:4},
      {sel:'[role="dialog"] .grid > div:nth-child(4)',n:5},{sel:'footer button',n:6}
    ], path.join(d3,'DetailCompDialog.png'));
    await closeDialog(page);
  }

  console.log('  → EditCompDialog');
  await findFirstRowBtn(page,'Cập nhật');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] input:nth-of-type(2)',n:3},{sel:'[role="dialog"] input:nth-of-type(3)',n:4},
      {sel:'footer button:last-child',n:5}
    ], path.join(d3,'EditCompDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [4] CUSTOMER-PARTNER → Customers tab
  // ══════════════════════════════════════════
  console.log('\n📋 [4] customer-management');
  const d4 = path.join(OUT_ROOT, '4-customer-management'); mkDir(d4);
  await clickTab(page, 'Khách hàng');

  console.log('  → NewCustomerDialog');
  await findAndClick(page, ['khách hàng mới','Thêm khách']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'#FirstName',n:2},{sel:'#LastName',n:3},{sel:'#CompanyName',n:4},
      {sel:'#Phone',n:5},{sel:'#Email',n:6},{sel:'#Address',n:7},{sel:'#TaxCode',n:8},
      {sel:'#InvoiceAddress',n:9},{sel:'#TaxRate',n:10},{sel:'footer button:last-child',n:11}
    ], path.join(d4,'NewCustomerDialog.png'));
    await closeDialog(page);
  }

  console.log('  → DetailCustomerDialog');
  await findFirstRowBtn(page,'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] .grid > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] .grid > div:nth-child(2)',n:3},{sel:'footer button',n:4}
    ], path.join(d4,'DetailCustomerDialog.png'));
    await closeDialog(page);
  }

  console.log('  → EditCustomerDialog');
  await findFirstRowBtn(page,'Cập nhật');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] input:nth-of-type(2)',n:3},{sel:'footer button:last-child',n:4}
    ], path.join(d4,'EditCustomerDialog.png'));
    await closeDialog(page);
  }

  console.log('  → OrderHistoryDialog');
  await findFirstRowBtn(page,'Lịch sử');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] table',n:2},{sel:'footer button',n:3}
    ], path.join(d4,'OrderHistoryDialog.png'));
    await closeDialog(page);
  }

  console.log('  → FeedbackDialog');
  await findFirstRowBtn(page,'Phản hồi');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] textarea,[role="dialog"] input',n:2},
      {sel:'footer button:last-child',n:3}
    ], path.join(d4,'FeedbackDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [5.1] PRODUCT-MANAGEMENT → Categories
  // ══════════════════════════════════════════
  console.log('\n📋 [5.1] category-management');
  const d5 = path.join(OUT_ROOT, '5-category-management'); mkDir(d5);
  await navTo(page, '/product-management');
  await page.waitForTimeout(1000);

  console.log('  → NewCatDialog');
  await findAndClick(page, ['Thêm mới','danh mục mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] textarea,[role="dialog"] input:nth-of-type(2)',n:3},
      {sel:'footer button:last-child',n:4}
    ], path.join(d5,'NewCatDialog.png'));
    await closeDialog(page);
  }

  console.log('  → DetailCatDialog');
  await findFirstRowBtn(page,'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] .grid > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] .grid > div:nth-child(2)',n:3},{sel:'footer button',n:4}
    ], path.join(d5,'DetailCatDialog.png'));
    await closeDialog(page);
  }

  console.log('  → EditCatDialog');
  await findFirstRowBtn(page,'Cập nhật');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'footer button:last-child',n:3}
    ], path.join(d5,'EditCatDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [5.2] PRODUCT-MANAGEMENT → Product Types
  // ══════════════════════════════════════════
  console.log('\n📋 [5.2] producttype-management');
  const d52 = path.join(OUT_ROOT, '5-producttype-management'); mkDir(d52);
  await clickTab(page, 'Loại sản phẩm');

  console.log('  → NewProductTypeDialog');
  await findAndClick(page, ['Thêm mới','loại sản phẩm mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] select,[role="dialog"] .NativeSelect',n:3},
      {sel:'footer button:last-child',n:4}
    ], path.join(d52,'NewProductTypeDialog.png'));
    await closeDialog(page);
  }

  console.log('  → EditProductTypeDialog');
  await findFirstRowBtn(page,'Cập nhật');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input',n:2},{sel:'footer button:last-child',n:3}
    ], path.join(d52,'EditProductTypeDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [6.1] PRODUCT-MANAGEMENT → Products
  // ══════════════════════════════════════════
  console.log('\n📋 [6.1] product-management');
  const d6 = path.join(OUT_ROOT, '6-product-management'); mkDir(d6);
  await clickTab(page, 'Sản phẩm');

  console.log('  → NewProductDialog');
  await findAndClick(page, ['Thêm mới','sản phẩm mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'#new-productName',n:2},{sel:'#new-productPrice',n:3},
      {sel:'#new-categoryId',n:4},{sel:'#new-productTypeId',n:5},{sel:'#new-detail',n:6},
      {sel:'#new-allowReturn',n:7},{sel:'footer button:last-child',n:8}
    ], path.join(d6,'NewProductDialog.png'));
    await closeDialog(page);
  }

  console.log('  → EditProductDialog (via dropdown)');
  await findFirstRowDropdownItem(page,'Chỉnh sửa');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] input[type="number"]',n:3},{sel:'[role="dialog"] select:nth-of-type(1)',n:4},
      {sel:'[role="dialog"] select:nth-of-type(2)',n:5},{sel:'footer button:last-child',n:6}
    ], path.join(d6,'EditProductDialog.png'));
    await closeDialog(page);
  }

  console.log('  → DetailProductDialog (via dropdown)');
  await findFirstRowDropdownItem(page,'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] [class*="grid"] > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] [class*="badge"]',n:3},{sel:'footer button',n:4}
    ], path.join(d6,'DetailProductDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [6.2] COMBO-MANAGEMENT
  // ══════════════════════════════════════════
  console.log('\n📋 [6.2] combo-management');
  const d62 = path.join(OUT_ROOT, '6-combo-management'); mkDir(d62);
  await navTo(page, '/combo-management');

  console.log('  → NewComboDialog');
  await findAndClick(page, ['Tạo Combo mới','Thêm combo','combo mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] input:nth-of-type(2)',n:3},{sel:'[role="dialog"] select',n:4},
      {sel:'footer button:last-child',n:5}
    ], path.join(d62,'NewComboDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [7.1] CUSTOMER PARTNER → Customer Types
  // ══════════════════════════════════════════
  console.log('\n📋 [7.1] customertype-management');
  const d71 = path.join(OUT_ROOT, '7-customertype-management'); mkDir(d71);
  await navTo(page, '/customer-partner-management');
  await page.waitForTimeout(1000);
  await clickTab(page, 'Loại khách hàng');

  console.log('  → NewCustomerTypeDialog');
  await findAndClick(page, ['Thêm mới','loại khách hàng mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] input:nth-of-type(2)',n:3},{sel:'footer button:last-child',n:4}
    ], path.join(d71,'NewCustomerTypeDialog.png'));
    await closeDialog(page);
  }

  console.log('  → EditCustomerTypeDialog');
  await findFirstRowBtn(page,'Cập nhật');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input',n:2},{sel:'footer button:last-child',n:3}
    ], path.join(d71,'EditCustomerTypeDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [7.2] POLICY → Discount tab
  // ══════════════════════════════════════════
  console.log('\n📋 [7.2] discount-management');
  const d72 = path.join(OUT_ROOT, '7-discount-management'); mkDir(d72);
  await navTo(page, '/policy-management');
  await page.waitForTimeout(1500);

  console.log('  → NewDiscountDialog');
  await findAndClick(page, ['Thêm mới','khuyến mãi mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'#new-name',n:2},{sel:'#new-product',n:3},{sel:'#new-value',n:4},
      {sel:'#new-cust-type',n:5},{sel:'#new-start-date',n:6},{sel:'#new-expiry-date',n:7},
      {sel:'#new-status',n:8},{sel:'#new-detail',n:9},{sel:'footer button:last-child',n:10}
    ], path.join(d72,'NewDiscountDialog.png'));
    await closeDialog(page);
  }

  console.log('  → DetailDiscountDialog');
  await findFirstRowBtn(page,'Chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] .grid > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] .grid > div:nth-child(2)',n:3},{sel:'footer button',n:4}
    ], path.join(d72,'DetailDiscountDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [7.2] POLICY → Return Policy tab
  // ══════════════════════════════════════════
  console.log('\n📋 [10] policy-management (returns)');
  const d10 = path.join(OUT_ROOT, '10-policy-management'); mkDir(d10);
  await clickTab(page, 'Chính sách đổi trả');

  console.log('  → NewPolicyDialog');
  await findAndClick(page, ['Thêm mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'#PolicyName',n:2},{sel:'#MaxReturnDays',n:3},
      {sel:'#PenaltyFeeRate',n:4},{sel:'#EffectiveDate',n:5},{sel:'#IsActive',n:6},
      {sel:'footer button:last-child',n:7}
    ], path.join(d10,'NewPolicyDialog.png'));
    await closeDialog(page);
  }

  console.log('  → EditPolicyDialog');
  await findFirstRowBtn(page,'Chỉnh sửa');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] input:nth-of-type(2)',n:3},{sel:'footer button:last-child',n:4}
    ], path.join(d10,'EditPolicyDialog.png'));
    await closeDialog(page);
  }

  console.log('  → DetailPolicyDialog');
  await findFirstRowBtn(page,'Chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] .grid > div:nth-child(1)',n:2},{sel:'footer button',n:3}
    ], path.join(d10,'DetailPolicyDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [8.1] INVOICE-MANAGEMENT
  // ══════════════════════════════════════════
  console.log('\n📋 [8.1] invoice-management');
  const d81 = path.join(OUT_ROOT, '8-invoice-management'); mkDir(d81);
  await navTo(page, '/multichannel-order-management');
  await page.waitForTimeout(1000);
  await clickTab(page, 'Hóa đơn');

  console.log('  → DetailInvoiceDialog');
  await findFirstRowBtn(page,'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] [class*="badge"]',n:2},
      {sel:'[role="dialog"] table',n:3},{sel:'footer button',n:4}
    ], path.join(d81,'DetailInvoiceDialog.png'));
    await closeDialog(page);
  }

  console.log('  → PrintInvoiceDialog');
  await findFirstRowBtn(page,'In hóa đơn');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] [class*="grid"] > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] table',n:3},{sel:'[role="dialog"] [class*="font-bold"]:last-child',n:4},
      {sel:'footer button:first-child',n:5},{sel:'footer button:last-child',n:6}
    ], path.join(d81,'PrintInvoiceDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [8.2] ORDER-MANAGEMENT
  // ══════════════════════════════════════════
  console.log('\n📋 [8.2] order-management');
  const d82 = path.join(OUT_ROOT, '8-order-management'); mkDir(d82);
  await clickTab(page, 'Đơn hàng tại quầy');

  console.log('  → NewOrderDialog (tại quầy)');
  await findAndClick(page, ['Tạo đơn mới','Thêm đơn hàng']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] select:first-of-type',n:2},
      {sel:'[role="dialog"] input[placeholder*="giao hàng"],[role="dialog"] input[placeholder*="địa chỉ"]',n:3},
      {sel:'[role="dialog"] input[placeholder*="Ghi chú"]',n:4},
      {sel:'[role="dialog"] button[class*="dashed"],[role="dialog"] button[class*="outline"]:first-of-type',n:5},
      {sel:'[role="dialog"] [class*="bg-slate"]',n:6},
      {sel:'footer button:last-child',n:7}
    ], path.join(d82,'NewOrderDialog.png'));
    await closeDialog(page);
  }

  console.log('  → DetailOrderDialog');
  await findFirstRowDropdownItem(page,'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] [class*="badge"]',n:2},
      {sel:'[role="dialog"] table',n:3},{sel:'footer button',n:4}
    ], path.join(d82,'DetailOrderDialog.png'));
    await closeDialog(page);
  }

  console.log('  → EditOrderDialog');
  await findFirstRowDropdownItem(page,'Cập nhật');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] textarea',n:3},{sel:'footer button:last-child',n:4}
    ], path.join(d82,'EditOrderDialog.png'));
    await closeDialog(page);
  }

  console.log('  → CancelReasonDialog');
  await findFirstRowDropdownItem(page,'Hủy đơn');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] textarea,[role="dialog"] input',n:2},
      {sel:'footer button:first-child',n:3},{sel:'footer button:last-child',n:4}
    ], path.join(d82,'CancelReasonDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [9] ORDER RETURN MANAGEMENT
  // ══════════════════════════════════════════
  console.log('\n📋 [9] orderreturn-management');
  const d9 = path.join(OUT_ROOT, '9-orderreturn-management'); mkDir(d9);
  await navTo(page, '/policy-management');
  await page.waitForTimeout(1000);
  await clickTab(page, 'Đổi trả');

  console.log('  → NewOrderReturnDialog');
  await findAndClick(page, ['Tạo phiếu đổi trả','Thêm mới','hoàn trả mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] input:nth-of-type(2)',n:3},{sel:'[role="dialog"] textarea',n:4},
      {sel:'[role="dialog"] select',n:5},{sel:'footer button:last-child',n:6}
    ], path.join(d9,'NewOrderReturnDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [11.1] WAREHOUSE-MANAGEMENT
  // ══════════════════════════════════════════
  console.log('\n📋 [11.1] warehouse-management');
  const d11 = path.join(OUT_ROOT, '11-warehouse-management'); mkDir(d11);
  await navTo(page, '/warehouse-management');

  console.log('  → NewWarehouseDialog');
  await findAndClick(page, ['kho hàng mới','Thêm kho']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'#WareHouseName',n:2},{sel:'#Address',n:3},
      {sel:'#ContactNumber',n:4},{sel:'#ManagerID',n:5},{sel:'#Capacity',n:6},
      {sel:'#WarehouseType',n:7},{sel:'#Status',n:8},{sel:'footer button:last-child',n:9}
    ], path.join(d11,'NewWarehouseDialog.png'));
    await closeDialog(page);
  }

  console.log('  → DetailWarehouseDialog');
  await findFirstRowBtn(page,'Xem');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] .grid > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] .grid > div:nth-child(2)',n:3},
      {sel:'[role="dialog"] table',n:4},{sel:'footer button',n:5}
    ], path.join(d11,'DetailWarehouseDialog.png'));
    await closeDialog(page);
  }

  console.log('  → EditWarehouseDialog');
  await findFirstRowBtn(page,'Cập nhật');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] input:nth-of-type(2)',n:3},{sel:'[role="dialog"] select',n:4},
      {sel:'footer button:last-child',n:5}
    ], path.join(d11,'EditWarehouseDialog.png'));
    await closeDialog(page);
  }

  console.log('  → ReportWarehouseDialog');
  await findFirstRowBtn(page,'Báo cáo thiếu hụt');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] table',n:2},{sel:'footer button',n:3}
    ], path.join(d11,'ReportWarehouseDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [11.2] REQUEST-MANAGEMENT
  // ══════════════════════════════════════════
  console.log('\n📋 [11.2] request-management');
  const d112 = path.join(OUT_ROOT, '12-request-management'); mkDir(d112);
  await navTo(page, '/circulating-slips-management');
  await page.waitForTimeout(2000);

  console.log('  → NewRequestDialog');
  await findAndClick(page, ['yêu cầu mới','Tạo yêu cầu']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] select:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] input[type="number"]',n:3},
      {sel:'[role="dialog"] button[class*="dashed"],[role="dialog"] button[class*="outline"]:first-of-type',n:4},
      {sel:'footer button:last-child',n:5}
    ], path.join(d112,'NewRequestDialog.png'));
    await closeDialog(page);
  }

  console.log('  → DetailRequestDialog');
  await findFirstRowBtn(page,'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] [class*="badge"]',n:2},
      {sel:'[role="dialog"] table,[role="dialog"] .divide-y',n:3},{sel:'footer button',n:4}
    ], path.join(d112,'DetailRequestDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [12.1] IMPORTRECEIPT-MANAGEMENT
  // ══════════════════════════════════════════
  console.log('\n📋 [12.1] importreceipt-management');
  const d121 = path.join(OUT_ROOT, '13-importreceipt-management'); mkDir(d121);
  await clickTab(page, 'Phiếu nhập kho');

  console.log('  → NewImportReceiptDialog');
  await findAndClick(page, ['Tạo phiếu nhập','phiếu nhập kho mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'#selectedRequestId',n:2},{sel:'#warehouseSelect',n:3},
      {sel:'#hasDiscrepancy',n:4},{sel:'[role="dialog"] table',n:5},
      {sel:'footer button:nth-child(2)',n:6},{sel:'footer button:last-child',n:7}
    ], path.join(d121,'NewImportReceiptDialog.png'));
    await closeDialog(page);
  }

  console.log('  → DetailImportReceiptDialog');
  await findFirstRowBtn(page,'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] [class*="badge"]',n:2},
      {sel:'[role="dialog"] table',n:3},{sel:'footer button',n:4}
    ], path.join(d121,'DetailImportReceiptDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [12.2] EXPORTRECEIPT-MANAGEMENT
  // ══════════════════════════════════════════
  console.log('\n📋 [12.2] exportreceipt-management');
  const d122 = path.join(OUT_ROOT, '14-exportreceipt-management'); mkDir(d122);
  await clickTab(page, 'Phiếu xuất kho');

  console.log('  → NewExportReceiptDialog (via checkbox select)');
  // Select first row checkbox then click create button
  try {
    const checkboxes = await page.$$('tbody tr input[type="checkbox"],tbody tr [role="checkbox"]');
    if (checkboxes.length > 0) { await checkboxes[0].click(); await page.waitForTimeout(500); }
    await findAndClick(page, ['Tạo phiếu xuất','xuất kho']);
    if (await waitDialog(page)) {
      await shot(page, [
        {sel:'h2',n:1},{sel:'[role="dialog"] table',n:2},
        {sel:'[role="dialog"] [class*="info"],[role="dialog"] .grid > div',n:3},
        {sel:'footer button:last-child',n:4}
      ], path.join(d122,'NewExportReceiptDialog.png'));
      await closeDialog(page);
    }
  } catch(e) { console.log('  ⚠ ExportReceipt skip:', e.message); }

  console.log('  → DetailExportReceiptDialog');
  await findFirstRowBtn(page,'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] table',n:2},{sel:'footer button',n:3}
    ], path.join(d122,'DetailExportReceiptDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [15] COUNTSHEET-MANAGEMENT
  // ══════════════════════════════════════════
  console.log('\n📋 [15] countsheet-management');
  const d15 = path.join(OUT_ROOT, '15-countsheet-management'); mkDir(d15);
  await clickTab(page, 'Phiếu kiểm kê');

  console.log('  → NewCountsheetDialog');
  await findAndClick(page, ['Tạo phiếu kiểm kê','phiếu kiểm kê mới','Thêm mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] select:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] table,[role="dialog"] .divide-y',n:3},
      {sel:'[role="dialog"] button[class*="dashed"],[role="dialog"] button[class*="outline"]',n:4},
      {sel:'footer button:last-child',n:5}
    ], path.join(d15,'NewCountsheetDialog.png'));
    await closeDialog(page);
  }

  console.log('  → DetailCountsheetDialog');
  await findFirstRowBtn(page,'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] table',n:2},{sel:'footer button',n:3}
    ], path.join(d15,'DetailCountsheetDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [17] SHIPPING-MANAGEMENT
  // ══════════════════════════════════════════
  console.log('\n📋 [17] shipping-management');
  const d17 = path.join(OUT_ROOT, '17-shipping-management'); mkDir(d17);
  await navTo(page, '/shipping-management');

  console.log('  → DispatchDialog (Đẩy đơn)');
  await findFirstRowBtn(page,'Đẩy đơn');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="title"]',n:1},{sel:'[role="dialog"] select',n:2},
      {sel:'[role="dialog"] p',n:3},{sel:'footer button:last-child',n:4}
    ], path.join(d17,'DispatchDialog.png'));
    await closeDialog(page);
  }

  console.log('  → CancelShipDialog (Hủy giao vận)');
  await findFirstRowBtn(page,'Hủy giao');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] textarea,[role="dialog"] input',n:2},
      {sel:'footer button:first-child',n:3},{sel:'footer button:last-child',n:4}
    ], path.join(d17,'CancelShipDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [18] TRANSFER-TICKET-MANAGEMENT
  // ══════════════════════════════════════════
  console.log('\n📋 [18] transfer-ticket-management');
  const d18 = path.join(OUT_ROOT, '18-transfer-ticket-management'); mkDir(d18);
  await navTo(page, '/circulating-slips-management');
  await page.waitForTimeout(1500);
  await clickTab(page, 'Phiếu điều chuyển');

  console.log('  → NewTransferTicketDialog');
  await findAndClick(page, ['Tạo phiếu điều chuyển','điều chuyển mới','Thêm mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] select:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] select:nth-of-type(2)',n:3},
      {sel:'[role="dialog"] select:nth-of-type(3)',n:4},
      {sel:'[role="dialog"] input[type="number"]',n:5},
      {sel:'[role="dialog"] button[class*="dashed"],[role="dialog"] button:has-text("Thêm")',n:6},
      {sel:'[role="dialog"] table',n:7},{sel:'footer button:last-child',n:8}
    ], path.join(d18,'NewTransferTicketDialog.png'));
    await closeDialog(page);
  }

  console.log('  → DetailTransferTicketDialog');
  await findFirstRowBtn(page,'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] [class*="badge"]',n:2},
      {sel:'[role="dialog"] table',n:3},{sel:'footer button',n:4}
    ], path.join(d18,'DetailTransferTicketDialog.png'));
    await closeDialog(page);
  }

  // ══════════════════════════════════════════
  // [19] ACCOUNTING
  // ══════════════════════════════════════════
  console.log('\n📋 [19] accounting-management');
  const d19 = path.join(OUT_ROOT, '19-accounting-management'); mkDir(d19);
  await navTo(page, '/accounting-management');

  console.log('  → PrintInvoiceDialog (accounting)');
  await findFirstRowBtn(page,'In hóa đơn');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},{sel:'[role="dialog"] .grid > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] table',n:3},{sel:'[role="dialog"] [class*="font-bold"]:last-child',n:4},
      {sel:'footer button:first-child',n:5},{sel:'footer button:last-child',n:6}
    ], path.join(d19,'PrintInvoiceDialog.png'));
    await closeDialog(page);
  }

  await browser.close();
  console.log('\n🎉 ALL dialog screenshots done!');
  console.log(`📁 Saved to: ${OUT_ROOT}`);
})();
