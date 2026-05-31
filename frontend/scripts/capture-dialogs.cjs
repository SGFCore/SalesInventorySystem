/**
 * capture-dialogs.cjs
 * Playwright script: Capture all Dialog/Modal hidden components
 * - Login, navigate via pushState, click buttons to open dialogs
 * - Inject red numbered badges on dialog elements
 * - Screenshot with dialog open, then close and continue
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:5173';
const INSTRUCTION_DIR = path.resolve(__dirname, '../../instruction');
const PHONE = '0988444555';
const PASSWORD = 'hashed_mgr';

// ─── Helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function reactNavigate(page, targetPath) {
  await page.evaluate((p) => {
    window.history.pushState({}, '', p);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, targetPath);
  await page.waitForTimeout(3000);
  try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}
  await page.waitForTimeout(1000);
}

async function clickTab(page, tabText) {
  try {
    const btns = await page.$$('button, [role="tab"]');
    for (const btn of btns) {
      const txt = await btn.textContent();
      if (txt && txt.trim().includes(tabText)) {
        await btn.click();
        await page.waitForTimeout(2000);
        return true;
      }
    }
  } catch {}
  return false;
}

async function injectAnnotations(page, containerSelector, annotations) {
  await page.evaluate(({ containerSel, items }) => {
    const old = document.getElementById('__dlg_ann__');
    if (old) old.remove();
    const layer = document.createElement('div');
    layer.id = '__dlg_ann__';
    layer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2147483647;';
    document.body.appendChild(layer);

    const container = containerSel ? document.querySelector(containerSel) : null;

    items.forEach(({ selector, n, fallbackX, fallbackY }) => {
      let el = null;
      if (selector) {
        // Try within container first, then global
        if (container) el = container.querySelector(selector);
        if (!el) el = document.querySelector(selector);
      }
      let x = fallbackX || 700, y = fallbackY || 300;
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          x = Math.max(16, Math.min(rect.left + rect.width / 2, window.innerWidth - 16));
          y = Math.max(16, Math.min(rect.top + rect.height / 2, window.innerHeight - 16));
        }
      }
      const b = document.createElement('div');
      b.textContent = String(n);
      b.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:26px;height:26px;background:#e53e3e;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;font-family:Arial,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,0.5);z-index:2147483647;pointer-events:none;transform:translate(-50%,-50%);border:2px solid white;`;
      layer.appendChild(b);
    });
  }, { containerSel: containerSelector, items: annotations });
}

async function captureDialog(page, annotations, outputPath, containerSel = '[role="dialog"]') {
  await injectAnnotations(page, containerSel, annotations);
  await page.waitForTimeout(500);
  await page.screenshot({ path: outputPath, fullPage: false });
  const fname = path.basename(outputPath);
  console.log(`  ✅ ${fname}`);
}

async function tryClose(page) {
  // Try Hủy button first, then X close button
  try {
    const btns = await page.$$('[role="dialog"] button');
    for (const btn of btns) {
      const txt = await btn.textContent();
      if (txt && (txt.trim() === 'Hủy' || txt.trim() === 'Đóng' || txt.trim() === 'Close')) {
        await btn.click();
        await page.waitForTimeout(1000);
        return;
      }
    }
    // If no cancel button, press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);
  } catch {}
}

async function waitForDialog(page, timeout = 5000) {
  try {
    await page.waitForSelector('[role="dialog"]', { timeout });
    await page.waitForTimeout(1000);
    return true;
  } catch {
    return false;
  }
}

async function clickButtonWithText(page, text) {
  try {
    const btns = await page.$$('button');
    for (const btn of btns) {
      const txt = await btn.textContent();
      if (txt && txt.trim().includes(text)) {
        await btn.scrollIntoViewIfNeeded();
        await btn.click();
        return true;
      }
    }
  } catch {}
  return false;
}

async function clickFirstRowButton(page, buttonText) {
  try {
    const rows = await page.$$('tbody tr, .divide-y > div');
    if (rows.length === 0) return false;
    const firstRow = rows[0];
    const btns = await firstRow.$$('button');
    for (const btn of btns) {
      const txt = await btn.textContent();
      if (txt && txt.trim().includes(buttonText)) {
        await btn.scrollIntoViewIfNeeded();
        await btn.click();
        return true;
      }
    }
  } catch {}
  return false;
}

// ─── Main ────────────────────────────────────────────────────────────────────

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'vi-VN' });
  const page = await context.newPage();

  // ── LOGIN ──
  console.log('🔐 Logging in...');
  await page.goto(`${BASE_URL}/signin`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const phoneInput = await page.$('#employeeId, input[placeholder*="SĐT"]');
  if (phoneInput) await phoneInput.fill(PHONE);
  const passInput = await page.$('#password, input[type="password"]');
  if (passInput) await passInput.fill(PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(3000);
  if (page.url().includes('signin')) { console.error('❌ Login failed!'); await browser.close(); return; }
  console.log('✅ Logged in\n');

  // ═══════════════════════════════════════════════════════════════
  // PAGE 1: EMP-MANAGEMENT
  // ═══════════════════════════════════════════════════════════════
  console.log('📋 [2] Quản lý nhân viên');
  const empDir = path.join(INSTRUCTION_DIR, '2-emp-management');
  ensureDir(empDir);
  await reactNavigate(page, '/emp-management');

  // NewEmpDialog
  console.log('  → NewEmpDialog');
  await clickButtonWithText(page, 'nhân viên mới');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2, [role="dialog"] [class*="title"]' },
      { n: 2, selector: '#fullname' },
      { n: 3, selector: '#email' },
      { n: 4, selector: '#phone' },
      { n: 5, selector: '#password' },
      { n: 6, selector: '[role="dialog"] [class*="grid-cols-2"]' },
      { n: 7, selector: '[role="dialog"] button[variant="outline"], [role="dialog"] button:last-of-type' },
      { n: 8, selector: '[role="dialog"] button[class*="primary"], [role="dialog"] footer button:last-child' },
    ], path.join(empDir, 'NewEmpDialog.png'));
    await tryClose(page);
  }

  // EditEmpDialog (Cập nhật)
  console.log('  → EditEmpDialog');
  await clickFirstRowButton(page, 'Cập nhật');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2, [role="dialog"] [class*="title"]' },
      { n: 2, selector: '#fullname, [id*="fullname"]' },
      { n: 3, selector: '#email, [id*="email"]' },
      { n: 4, selector: '#phone, [id*="phone"]' },
      { n: 5, selector: '[role="dialog"] button:last-child' },
    ], path.join(empDir, 'EditEmpDialog.png'));
    await tryClose(page);
  }

  // EditRoleDialog (Sửa quyền)
  console.log('  → EditRoleDialog');
  await clickFirstRowButton(page, 'Sửa quyền');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2, [role="dialog"] [class*="title"]' },
      { n: 2, selector: '[role="dialog"] [class*="grid-cols-2"]' },
      { n: 3, selector: '[role="dialog"] [id*="role-2"]' },
      { n: 4, selector: '[role="dialog"] [id*="role-3"]' },
      { n: 5, selector: '[role="dialog"] [id*="role-4"]' },
      { n: 6, selector: '[role="dialog"] button:last-child' },
    ], path.join(empDir, 'EditRoleDialog.png'));
    await tryClose(page);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE 2: CUSTOMER-PARTNER-MANAGEMENT → Đối tác
  // ═══════════════════════════════════════════════════════════════
  console.log('\n📋 [3] Quản lý đối tác');
  const compDir = path.join(INSTRUCTION_DIR, '3-comp-management');
  ensureDir(compDir);
  await reactNavigate(page, '/customer-partner-management');
  await page.waitForTimeout(1000);

  // NewCompDialog
  console.log('  → NewCompDialog');
  await clickButtonWithText(page, 'đối tác mới');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '#new-shipCompanyName' },
      { n: 3, selector: '#new-supportedRegion' },
      { n: 4, selector: '#new-email' },
      { n: 5, selector: '#new-phone' },
      { n: 6, selector: '#new-address' },
      { n: 7, selector: '#new-notes' },
      { n: 8, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(compDir, 'NewCompDialog.png'));
    await tryClose(page);
  }

  // DetailCompDialog
  console.log('  → DetailCompDialog');
  await clickFirstRowButton(page, 'chi tiết');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] [class*="grid"] > div:nth-child(1)' },
      { n: 3, selector: '[role="dialog"] [class*="grid"] > div:nth-child(2)' },
      { n: 4, selector: '[role="dialog"] [class*="grid"] > div:nth-child(3)' },
      { n: 5, selector: '[role="dialog"] footer button' },
    ], path.join(compDir, 'DetailCompDialog.png'));
    await tryClose(page);
  }

  // EditCompDialog
  console.log('  → EditCompDialog');
  await clickFirstRowButton(page, 'Cập nhật');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] input:nth-of-type(1)' },
      { n: 3, selector: '[role="dialog"] input:nth-of-type(2)' },
      { n: 4, selector: '[role="dialog"] input:nth-of-type(3)' },
      { n: 5, selector: '[role="dialog"] input:nth-of-type(4)' },
      { n: 6, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(compDir, 'EditCompDialog.png'));
    await tryClose(page);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE 3: CUSTOMER-PARTNER → Khách hàng tab
  // ═══════════════════════════════════════════════════════════════
  console.log('\n📋 [4] Quản lý khách hàng');
  const custDir = path.join(INSTRUCTION_DIR, '4-customer-management');
  ensureDir(custDir);
  await clickTab(page, 'Khách hàng');

  // NewCustomerDialog
  console.log('  → NewCustomerDialog');
  await clickButtonWithText(page, 'khách hàng mới');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '#FirstName' },
      { n: 3, selector: '#LastName' },
      { n: 4, selector: '#CompanyName' },
      { n: 5, selector: '#Phone' },
      { n: 6, selector: '#Email' },
      { n: 7, selector: '#Address' },
      { n: 8, selector: '#TaxCode' },
      { n: 9, selector: '#InvoiceAddress' },
      { n: 10, selector: '#TaxRate' },
      { n: 11, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(custDir, 'NewCustomerDialog.png'));
    await tryClose(page);
  }

  // DetailCustomerDialog
  console.log('  → DetailCustomerDialog');
  await clickFirstRowButton(page, 'Chi tiết');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] [class*="grid"] > div:nth-child(1)' },
      { n: 3, selector: '[role="dialog"] [class*="grid"] > div:nth-child(2)' },
      { n: 4, selector: '[role="dialog"] [class*="grid"] > div:nth-child(3)' },
      { n: 5, selector: '[role="dialog"] footer button' },
    ], path.join(custDir, 'DetailCustomerDialog.png'));
    await tryClose(page);
  }

  // OrderHistoryDialog
  console.log('  → OrderHistoryDialog');
  await clickFirstRowButton(page, 'Lịch sử');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] table, [role="dialog"] [class*="divide"]' },
      { n: 3, selector: '[role="dialog"] footer button' },
    ], path.join(custDir, 'OrderHistoryDialog.png'));
    await tryClose(page);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE 4: PRODUCT-MANAGEMENT → Danh mục
  // ═══════════════════════════════════════════════════════════════
  console.log('\n📋 [5] Quản lý danh mục sản phẩm');
  const catDir = path.join(INSTRUCTION_DIR, '5-category-management');
  ensureDir(catDir);
  await reactNavigate(page, '/product-management');
  await page.waitForTimeout(1000);

  // NewCatDialog
  console.log('  → NewCatDialog');
  await clickButtonWithText(page, 'Thêm mới');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] input:first-of-type' },
      { n: 3, selector: '[role="dialog"] textarea, [role="dialog"] input:nth-of-type(2)' },
      { n: 4, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(catDir, 'NewCatDialog.png'));
    await tryClose(page);
  }

  // EditCatDialog
  console.log('  → EditCatDialog');
  await clickFirstRowButton(page, 'Chỉnh sửa');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] input:first-of-type' },
      { n: 3, selector: '[role="dialog"] textarea, [role="dialog"] input:nth-of-type(2)' },
      { n: 4, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(catDir, 'EditCatDialog.png'));
    await tryClose(page);
  }

  // DetailCatDialog
  console.log('  → DetailCatDialog');
  await clickFirstRowButton(page, 'Chi tiết');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] [class*="grid"] > div:nth-child(1)' },
      { n: 3, selector: '[role="dialog"] [class*="grid"] > div:nth-child(2)' },
      { n: 4, selector: '[role="dialog"] footer button' },
    ], path.join(catDir, 'DetailCatDialog.png'));
    await tryClose(page);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE 5: PRODUCT-MANAGEMENT → Sản phẩm tab
  // ═══════════════════════════════════════════════════════════════
  console.log('\n📋 [6] Quản lý sản phẩm');
  const prodDir = path.join(INSTRUCTION_DIR, '6-product-management');
  ensureDir(prodDir);
  await clickTab(page, 'Sản phẩm');

  // NewProductDialog
  console.log('  → NewProductDialog');
  await clickButtonWithText(page, 'Thêm mới');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '#new-productName' },
      { n: 3, selector: '#new-productPrice' },
      { n: 4, selector: '#new-categoryId' },
      { n: 5, selector: '#new-productTypeId' },
      { n: 6, selector: '#new-detail' },
      { n: 7, selector: '#new-allowReturn' },
      { n: 8, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(prodDir, 'NewProductDialog.png'));
    await tryClose(page);
  }

  // EditProductDialog
  console.log('  → EditProductDialog');
  await clickFirstRowButton(page, 'Chỉnh sửa');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] input:first-of-type' },
      { n: 3, selector: '[role="dialog"] input[type="number"]' },
      { n: 4, selector: '[role="dialog"] select:first-of-type' },
      { n: 5, selector: '[role="dialog"] select:last-of-type' },
      { n: 6, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(prodDir, 'EditProductDialog.png'));
    await tryClose(page);
  }

  // DetailProductDialog
  console.log('  → DetailProductDialog');
  await clickFirstRowButton(page, 'Chi tiết');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] [class*="grid"] > div:nth-child(1)' },
      { n: 3, selector: '[role="dialog"] [class*="grid"] > div:nth-child(2)' },
      { n: 4, selector: '[role="dialog"] [class*="badge"], [role="dialog"] span[class*="green"]' },
      { n: 5, selector: '[role="dialog"] footer button' },
    ], path.join(prodDir, 'DetailProductDialog.png'));
    await tryClose(page);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE 6: MULTICHANNEL-ORDER → Đơn hàng tại quầy
  // ═══════════════════════════════════════════════════════════════
  console.log('\n📋 [8] Quản lý đơn hàng');
  const orderDir = path.join(INSTRUCTION_DIR, '8-order-management');
  ensureDir(orderDir);
  await reactNavigate(page, '/multichannel-order-management');
  await page.waitForTimeout(1000);

  // NewOrderDialog (tại quầy - default tab)
  console.log('  → NewOrderDialog (tại quầy)');
  await clickButtonWithText(page, 'Tạo đơn mới');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] select:first-of-type, [role="dialog"] [class*="NativeSelect"]:first-of-type' },
      { n: 3, selector: '[role="dialog"] input[placeholder*="địa chỉ"]' },
      { n: 4, selector: '[role="dialog"] input[placeholder*="Ghi chú"]' },
      { n: 5, selector: '[role="dialog"] [class*="NativeSelect"]' },
      { n: 6, selector: '[role="dialog"] input[type="number"]:first-of-type' },
      { n: 7, selector: '[role="dialog"] button[class*="dashed"]' },
      { n: 8, selector: '[role="dialog"] [class*="bg-slate-50"] [class*="TỔNG"]' },
      { n: 9, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(orderDir, 'NewOrderDialog.png'));
    await tryClose(page);
  }

  // DetailOrderDialog
  console.log('  → DetailOrderDialog');
  await clickFirstRowButton(page, 'Chi tiết');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] [class*="badge"], [role="dialog"] span[class*="green"], [role="dialog"] span[class*="amber"]' },
      { n: 3, selector: '[role="dialog"] table, [role="dialog"] [class*="divide"]' },
      { n: 4, selector: '[role="dialog"] [class*="total"], [role="dialog"] [class*="font-bold"]:last-child' },
      { n: 5, selector: '[role="dialog"] footer button' },
    ], path.join(orderDir, 'DetailOrderDialog.png'));
    await tryClose(page);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE 7: MULTICHANNEL-ORDER → Hóa đơn tab
  // ═══════════════════════════════════════════════════════════════
  console.log('\n📋 [8.1] Quản lý hóa đơn');
  const invDir = path.join(INSTRUCTION_DIR, '8-invoice-management');
  ensureDir(invDir);
  await clickTab(page, 'Hóa đơn');

  // NewInvoiceDialog
  console.log('  → NewInvoiceDialog');
  await clickButtonWithText(page, 'Thêm mới');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] select:first-of-type' },
      { n: 3, selector: '[role="dialog"] select:nth-of-type(2)' },
      { n: 4, selector: '[role="dialog"] input:first-of-type' },
      { n: 5, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(invDir, 'NewInvoiceDialog.png'));
    await tryClose(page);
  }

  // DetailInvoiceDialog
  console.log('  → DetailInvoiceDialog');
  await clickFirstRowButton(page, 'Chi tiết');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] [class*="badge"]' },
      { n: 3, selector: '[role="dialog"] table' },
      { n: 4, selector: '[role="dialog"] footer button' },
    ], path.join(invDir, 'DetailInvoiceDialog.png'));
    await tryClose(page);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE 8: POLICY-MANAGEMENT → Chính sách giảm giá
  // ═══════════════════════════════════════════════════════════════
  console.log('\n📋 [10] Quản lý chính sách / khuyến mãi');
  const policyDir = path.join(INSTRUCTION_DIR, '10-policy-management');
  ensureDir(policyDir);
  await reactNavigate(page, '/policy-management');
  await page.waitForTimeout(2000);

  // NewDiscountDialog (default tab = promotions)
  console.log('  → NewDiscountDialog');
  await clickButtonWithText(page, 'Thêm mới');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] input:nth-of-type(1)' },
      { n: 3, selector: '[role="dialog"] input:nth-of-type(2)' },
      { n: 4, selector: '[role="dialog"] input[type="date"]:first-of-type' },
      { n: 5, selector: '[role="dialog"] input[type="date"]:last-of-type' },
      { n: 6, selector: '[role="dialog"] select' },
      { n: 7, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(policyDir, 'NewDiscountDialog.png'));
    await tryClose(page);
  }

  // DetailDiscountDialog
  console.log('  → DetailDiscountDialog');
  await clickFirstRowButton(page, 'Chi tiết');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] [class*="grid"] > div:nth-child(1)' },
      { n: 3, selector: '[role="dialog"] [class*="grid"] > div:nth-child(2)' },
      { n: 4, selector: '[role="dialog"] footer button' },
    ], path.join(policyDir, 'DetailDiscountDialog.png'));
    await tryClose(page);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE 9: WAREHOUSE-MANAGEMENT
  // ═══════════════════════════════════════════════════════════════
  console.log('\n📋 [11] Quản lý kho');
  const whDir = path.join(INSTRUCTION_DIR, '11-warehouse-management');
  ensureDir(whDir);
  await reactNavigate(page, '/warehouse-management');

  // NewWarehouseDialog
  console.log('  → NewWarehouseDialog');
  await clickButtonWithText(page, 'kho hàng mới');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '#WareHouseName' },
      { n: 3, selector: '#Address' },
      { n: 4, selector: '#ContactNumber' },
      { n: 5, selector: '#ManagerID' },
      { n: 6, selector: '#Capacity' },
      { n: 7, selector: '#WarehouseType' },
      { n: 8, selector: '#Status' },
      { n: 9, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(whDir, 'NewWarehouseDialog.png'));
    await tryClose(page);
  }

  // DetailWarehouseDialog
  console.log('  → DetailWarehouseDialog');
  await clickFirstRowButton(page, 'Xem');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] [class*="grid"] > div:nth-child(1)' },
      { n: 3, selector: '[role="dialog"] [class*="grid"] > div:nth-child(2)' },
      { n: 4, selector: '[role="dialog"] table, [role="dialog"] [class*="divide"]' },
      { n: 5, selector: '[role="dialog"] footer button' },
    ], path.join(whDir, 'DetailWarehouseDialog.png'));
    await tryClose(page);
  }

  // EditWarehouseDialog
  console.log('  → EditWarehouseDialog');
  await clickFirstRowButton(page, 'Cập nhật');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] input:first-of-type' },
      { n: 3, selector: '[role="dialog"] input:nth-of-type(2)' },
      { n: 4, selector: '[role="dialog"] input:nth-of-type(3)' },
      { n: 5, selector: '[role="dialog"] select' },
      { n: 6, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(whDir, 'EditWarehouseDialog.png'));
    await tryClose(page);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE 10: CIRCULATING-SLIPS → Yêu cầu bổ sung
  // ═══════════════════════════════════════════════════════════════
  console.log('\n📋 [12] Quản lý phiếu lưu hành - Yêu cầu bổ sung');
  const reqDir = path.join(INSTRUCTION_DIR, '12-request-management');
  ensureDir(reqDir);
  await reactNavigate(page, '/circulating-slips-management');
  await page.waitForTimeout(2000);

  // NewRequestDialog
  console.log('  → NewRequestDialog');
  await clickButtonWithText(page, 'yêu cầu mới');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] select' },
      { n: 3, selector: '[role="dialog"] input[type="number"]' },
      { n: 4, selector: '[role="dialog"] button[class*="dashed"], [role="dialog"] button[class*="outline"]' },
      { n: 5, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(reqDir, 'NewRequestDialog.png'));
    await tryClose(page);
  }

  // DetailRequestDialog
  console.log('  → DetailRequestDialog');
  await clickFirstRowButton(page, 'Chi tiết');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] [class*="badge"]' },
      { n: 3, selector: '[role="dialog"] table, [role="dialog"] [class*="divide"]' },
      { n: 4, selector: '[role="dialog"] footer button' },
    ], path.join(reqDir, 'DetailRequestDialog.png'));
    await tryClose(page);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE 11: CIRCULATING-SLIPS → Phiếu nhập kho tab
  // ═══════════════════════════════════════════════════════════════
  console.log('\n📋 [13] Phiếu nhập kho');
  const impDir = path.join(INSTRUCTION_DIR, '13-importreceipt-management');
  ensureDir(impDir);
  await clickTab(page, 'nhập kho');

  // NewImportReceiptDialog
  console.log('  → NewImportReceiptDialog');
  await clickButtonWithText(page, 'Tạo phiếu nhập');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '#selectedRequestId' },
      { n: 3, selector: '#warehouseSelect' },
      { n: 4, selector: '#hasDiscrepancy' },
      { n: 5, selector: '[role="dialog"] [class*="divide"] > div:first-child, [role="dialog"] [class*="grid"] > div:first-child' },
      { n: 6, selector: '[role="dialog"] footer button[class*="amber"]' },
      { n: 7, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(impDir, 'NewImportReceiptDialog.png'));
    await tryClose(page);
  }

  // DetailImportReceiptDialog
  console.log('  → DetailImportReceiptDialog');
  await clickFirstRowButton(page, 'Chi tiết');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] [class*="badge"]' },
      { n: 3, selector: '[role="dialog"] table, [role="dialog"] [class*="divide"]' },
      { n: 4, selector: '[role="dialog"] footer button' },
    ], path.join(impDir, 'DetailImportReceiptDialog.png'));
    await tryClose(page);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE 12: SHIPPING-MANAGEMENT → DispatchDialog
  // ═══════════════════════════════════════════════════════════════
  console.log('\n📋 [17] Quản lý giao vận - Điều phối');
  const shipDir = path.join(INSTRUCTION_DIR, '17-shipping-management');
  ensureDir(shipDir);
  await reactNavigate(page, '/shipping-management');

  // DispatchDialog (Hủy giao vận button)
  console.log('  → DispatchDialog (Hủy giao vận)');
  await clickFirstRowButton(page, 'Hủy giao');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] p, [role="dialog"] [class*="text-slate"]' },
      { n: 3, selector: '[role="dialog"] footer button:first-child' },
      { n: 4, selector: '[role="dialog"] footer button:last-child' },
    ], path.join(shipDir, 'CancelShipDialog.png'));
    await tryClose(page);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE 13: ACCOUNTING → PrintInvoiceDialog
  // ═══════════════════════════════════════════════════════════════
  console.log('\n📋 [19] Xử lý hóa đơn và thanh toán');
  const accDir = path.join(INSTRUCTION_DIR, '19-accounting-management');
  ensureDir(accDir);
  await reactNavigate(page, '/accounting-management');

  // PrintInvoiceDialog
  console.log('  → PrintInvoiceDialog');
  await clickFirstRowButton(page, 'In hóa đơn');
  if (await waitForDialog(page)) {
    await captureDialog(page, [
      { n: 1, selector: '[role="dialog"] h2' },
      { n: 2, selector: '[role="dialog"] [class*="invoice"], [role="dialog"] [class*="grid"] > div:nth-child(1)' },
      { n: 3, selector: '[role="dialog"] table' },
      { n: 4, selector: '[role="dialog"] [class*="total"], [role="dialog"] [class*="font-bold"]:last-of-type' },
      { n: 5, selector: '[role="dialog"] footer button' },
    ], path.join(accDir, 'PrintInvoiceDialog.png'));
    await tryClose(page);
  }

  // ─── Done ────────────────────────────────────────────────────
  await browser.close();
  console.log('\n🎉 All dialog screenshots captured!');
  console.log(`📁 Saved to: ${INSTRUCTION_DIR}`);
})();
