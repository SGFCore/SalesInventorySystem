/**
 * capture-missing.cjs — Chụp các dialog còn thiếu
 * Xử lý các dialog cần điều hướng đặc biệt:
 * - Category dialogs (tab chuyên biệt)
 * - Policy dialogs (tab Return Policy)
 * - Order Return, Shipping dialogs
 * - Transfer Ticket, Accounting
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:5173';
const OUT_ROOT = path.resolve(__dirname, '../../instruction');
const PHONE    = '0988444555';
const PASSWORD = 'hashed_mgr';

const mkDir = d => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); };

async function navTo(page, route) {
  await page.evaluate(p => {
    window.history.pushState({}, '', p);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, route);
  await page.waitForTimeout(3000);
  try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}
  await page.waitForTimeout(1000);
}

async function waitDialog(page, ms = 7000) {
  try { await page.waitForSelector('[role="dialog"]', { timeout: ms }); await page.waitForTimeout(1000); return true; }
  catch { return false; }
}

async function closeDialog(page) {
  try {
    const btns = await page.$$('[role="dialog"] button');
    for (const b of btns) {
      const t = (await b.textContent() || '').trim();
      if (['Hủy','Đóng','Close','Cancel','Không'].includes(t)) { await b.click(); await page.waitForTimeout(1000); return; }
    }
    await page.keyboard.press('Escape'); await page.waitForTimeout(1000);
  } catch {}
}

async function clickTab(page, text, waitMs = 2500) {
  const all = await page.$$('[role="tab"], [role="tablist"] button, .tabs button, nav button, [class*="tab"] button');
  for (const el of all) {
    const t = (await el.textContent() || '').trim();
    if (t.includes(text)) { await el.click(); await page.waitForTimeout(waitMs); return true; }
  }
  // Also try generic buttons
  const btns = await page.$$('button');
  for (const b of btns) {
    const t = (await b.textContent() || '').trim();
    if (t.includes(text)) { await b.click(); await page.waitForTimeout(waitMs); return true; }
  }
  return false;
}

async function findAndClick(page, texts) {
  for (const text of texts) {
    const btns = await page.$$('button');
    for (const b of btns) {
      const t = (await b.textContent() || '').trim();
      if (t.includes(text)) { try { await b.scrollIntoViewIfNeeded(); await b.click(); return true; } catch {} }
    }
  }
  return false;
}

async function firstRowBtn(page, text) {
  try {
    const rows = await page.$$('tbody tr');
    if (!rows.length) return false;
    const btns = await rows[0].$$('button');
    for (const b of btns) {
      const t = (await b.textContent() || '').trim();
      if (t.includes(text)) { await b.scrollIntoViewIfNeeded(); await b.click(); return true; }
    }
  } catch {}
  return false;
}

async function dropdownAction(page, actionText) {
  try {
    const rows = await page.$$('tbody tr');
    if (!rows.length) return false;
    // Click the 3-dot / more button
    const triggers = await rows[0].$$('button');
    // Find button with no/icon text
    let triggered = false;
    for (const t of triggers) {
      const txt = (await t.textContent() || '').trim();
      if (txt === '' || txt.length < 3) { await t.click(); triggered = true; await page.waitForTimeout(700); break; }
    }
    if (!triggered && triggers.length > 0) { await triggers[triggers.length - 1].click(); await page.waitForTimeout(700); }
    // Find menu item
    const items = await page.$$('[role="menuitem"],[data-radix-collection-item],[class*="dropdown"] button, [class*="DropdownMenuContent"] div[class*="item"]');
    for (const item of items) {
      const t = (await item.textContent() || '').trim();
      if (t.includes(actionText)) { await item.click(); return true; }
    }
  } catch {}
  return false;
}

async function annotate(page, items) {
  await page.evaluate(ann => {
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
          if (r.width > 0) {
            x = Math.min(Math.max(r.left + r.width / 2, 16), window.innerWidth - 16);
            y = Math.min(Math.max(r.top + r.height / 2, 16), window.innerHeight - 16);
          }
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
  await page.waitForTimeout(500);
  await page.screenshot({ path: outPath, fullPage: false });
  console.log('  ✅', path.relative(OUT_ROOT, outPath));
}

async function login(page) {
  await page.goto(`${BASE_URL}/signin`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  const ph = await page.$('input[type="tel"],#employeeId,input[placeholder*="SĐT"]');
  if (ph) await ph.fill(PHONE);
  const pw = await page.$('input[type="password"],#password');
  if (pw) await pw.fill(PASSWORD);
  await page.click('button[type="submit"]');
  try { await page.waitForURL('**/', { timeout: 15000 }); } catch {}
  await page.waitForTimeout(3000);
  if (page.url().includes('signin')) throw new Error('Login failed');
}

// ═══════════════════════════════════════════
(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'vi-VN' });
  const page = await ctx.newPage();

  console.log('🔐 Logging in...');
  await login(page);
  console.log('✅ Logged in\n');

  // ──────────────────────────────────────────
  // [5.1] CATEGORY — navigate via product-management tab
  // ──────────────────────────────────────────
  console.log('📋 [5.1] category-management — Tab "Danh mục"');
  const d5 = path.join(OUT_ROOT, '5-category-management'); mkDir(d5);
  await navTo(page, '/product-management');

  // Click Danh mục tab
  await clickTab(page, 'Danh mục', 2000);

  console.log('  → NewCatDialog');
  await findAndClick(page, ['Thêm danh mục','Thêm mới','danh mục mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'input:nth-of-type(1)',n:2},
      {sel:'input:nth-of-type(2),textarea',n:3},
      {sel:'footer button:first-child',n:4},
      {sel:'footer button:last-child',n:5}
    ], path.join(d5, 'NewCatDialog.png'));
    await closeDialog(page);
    await page.waitForTimeout(1000);
  }

  console.log('  → EditCatDialog');
  await firstRowBtn(page, 'Cập nhật');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'input:nth-of-type(1)',n:2},
      {sel:'input:nth-of-type(2),textarea',n:3},
      {sel:'footer button:last-child',n:4}
    ], path.join(d5, 'EditCatDialog.png'));
    await closeDialog(page);
    await page.waitForTimeout(1000);
  }

  console.log('  → DetailCatDialog');
  await firstRowBtn(page, 'Chi tiết');
  if (!(await waitDialog(page, 3000))) await firstRowBtn(page, 'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'[role="dialog"] .grid > div:nth-child(1),[role="dialog"] dl > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] .grid > div:nth-child(2),[role="dialog"] dl > div:nth-child(2)',n:3},
      {sel:'footer button',n:4}
    ], path.join(d5, 'DetailCatDialog.png'));
    await closeDialog(page);
  }

  // ──────────────────────────────────────────
  // [7.1] CUSTOMER TYPE — tab within CustomerPartner
  // ──────────────────────────────────────────
  console.log('\n📋 [7.1] customertype-management');
  const d71 = path.join(OUT_ROOT, '7-customertype-management'); mkDir(d71);
  await navTo(page, '/customer-partner-management');
  await clickTab(page, 'Loại khách hàng', 2500);
  await page.waitForTimeout(1000);

  console.log('  → NewCustomerTypeDialog');
  await findAndClick(page, ['Thêm nhóm','Thêm mới','loại khách hàng']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'#customertypename,input:nth-of-type(1)',n:2},
      {sel:'#discount,input[name="discount"]',n:3},
      {sel:'#spendinglimit,input[name="spendinglimit"]',n:4},
      {sel:'#detail,input[name="detail"]',n:5},
      {sel:'footer button:first-child',n:6},
      {sel:'footer button:last-child',n:7}
    ], path.join(d71, 'NewCustomerTypeDialog.png'));
    await closeDialog(page);
    await page.waitForTimeout(1000);
  }

  console.log('  → DetailCustomerTypeDialog');
  await firstRowBtn(page, 'Chi tiết');
  if (!(await waitDialog(page, 3000))) await firstRowBtn(page, 'Xem');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2',n:1},
      {sel:'[role="dialog"] .grid > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] .grid > div:nth-child(2)',n:3},
      {sel:'footer button',n:4}
    ], path.join(d71, 'DetailCustomerTypeDialog.png'));
    await closeDialog(page);
  }

  // ──────────────────────────────────────────
  // [10] POLICY — return policy tab
  // ──────────────────────────────────────────
  console.log('\n📋 [10] policy-management — Return Policy tab');
  const d10 = path.join(OUT_ROOT, '10-policy-management'); mkDir(d10);
  await navTo(page, '/policy-management');
  await page.waitForTimeout(1000);

  // Try to click "Chính sách đổi trả" tab
  let policyTabClicked = await clickTab(page, 'Chính sách đổi trả', 2500);
  if (!policyTabClicked) policyTabClicked = await clickTab(page, 'đổi trả', 2500);
  if (!policyTabClicked) policyTabClicked = await clickTab(page, 'Chính sách', 2500);
  await page.waitForTimeout(1500);

  console.log('  → NewPolicyDialog');
  await findAndClick(page, ['Thêm chính sách','Thêm mới','policy mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'#PolicyName',n:2},
      {sel:'#MaxReturnDays',n:3},
      {sel:'#PenaltyFeeRate',n:4},
      {sel:'#EffectiveDate',n:5},
      {sel:'#IsActive',n:6},
      {sel:'footer button:first-child',n:7},
      {sel:'footer button:last-child',n:8}
    ], path.join(d10, 'NewPolicyDialog.png'));
    await closeDialog(page);
    await page.waitForTimeout(1000);
  }

  console.log('  → EditPolicyDialog');
  await firstRowBtn(page, 'Chỉnh sửa');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] input:nth-of-type(2)',n:3},
      {sel:'[role="dialog"] input[type="date"]',n:4},
      {sel:'[role="dialog"] select',n:5},
      {sel:'footer button:last-child',n:6}
    ], path.join(d10, 'EditPolicyDialog.png'));
    await closeDialog(page);
    await page.waitForTimeout(1000);
  }

  console.log('  → DetailPolicyDialog');
  await firstRowBtn(page, 'Chi tiết');
  if (!(await waitDialog(page, 3000))) await firstRowBtn(page, 'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'[role="dialog"] .grid > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] .grid > div:nth-child(2)',n:3},
      {sel:'[role="dialog"] [class*="badge"]',n:4},
      {sel:'footer button',n:5}
    ], path.join(d10, 'DetailPolicyDialog.png'));
    await closeDialog(page);
  }

  // ──────────────────────────────────────────
  // [7.2] DISCOUNT — Detail dialog
  // ──────────────────────────────────────────
  console.log('\n📋 [7.2] discount — DetailDiscountDialog');
  const d72 = path.join(OUT_ROOT, '7-discount-management'); mkDir(d72);
  await navTo(page, '/policy-management');
  await clickTab(page, 'Khuyến mãi', 2000);

  console.log('  → DetailDiscountDialog');
  await firstRowBtn(page, 'Chi tiết');
  if (!(await waitDialog(page, 3000))) await firstRowBtn(page, 'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'[role="dialog"] .grid > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] .grid > div:nth-child(2)',n:3},
      {sel:'[role="dialog"] [class*="badge"]',n:4},
      {sel:'footer button',n:5}
    ], path.join(d72, 'DetailDiscountDialog.png'));
    await closeDialog(page);
  }

  // ──────────────────────────────────────────
  // [9] ORDER RETURN — standalone route
  // ──────────────────────────────────────────
  console.log('\n📋 [9] orderreturn-management');
  const d9 = path.join(OUT_ROOT, '9-orderreturn-management'); mkDir(d9);

  // Try different routes
  await navTo(page, '/multichannel-order-management');
  // Look for a Returns tab
  let returnTabFound = await clickTab(page, 'Đổi/Trả', 2000);
  if (!returnTabFound) returnTabFound = await clickTab(page, 'Hoàn trả', 2000);
  if (!returnTabFound) returnTabFound = await clickTab(page, 'Đổi trả', 2000);
  await page.waitForTimeout(1500);

  console.log('  → NewOrderReturnDialog');
  await findAndClick(page, ['Tạo phiếu đổi trả', 'Thêm phiếu', 'đổi trả mới', 'Tạo mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'[role="dialog"] input:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] input:nth-of-type(2)',n:3},
      {sel:'[role="dialog"] input:nth-of-type(3)',n:4},
      {sel:'[role="dialog"] textarea',n:5},
      {sel:'[role="dialog"] input[type="number"]',n:6},
      {sel:'[role="dialog"] table,[role="dialog"] .divide-y',n:7},
      {sel:'footer button:last-child',n:8}
    ], path.join(d9, 'NewOrderReturnDialog.png'));
    await closeDialog(page);
  }

  // ──────────────────────────────────────────
  // [8.2] ORDER — CancelReason dialog
  // ──────────────────────────────────────────
  console.log('\n📋 [8.2] order-management — CancelReasonDialog');
  const d82 = path.join(OUT_ROOT, '8-order-management'); mkDir(d82);
  await navTo(page, '/multichannel-order-management');
  await clickTab(page, 'Đơn hàng tại quầy', 2000);

  console.log('  → CancelReasonDialog (via dropdown Hủy đơn)');
  await dropdownAction(page, 'Hủy đơn');
  if (!(await waitDialog(page, 4000))) {
    // Try via first row button
    await firstRowBtn(page, 'Hủy đơn');
  }
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'[role="dialog"] [class*="text-amber"],[role="dialog"] [class*="text-red"],[role="dialog"] [class*="warning"]',n:2},
      {sel:'[role="dialog"] textarea,[role="dialog"] input[type="text"]',n:3},
      {sel:'footer button:first-child',n:4},
      {sel:'footer button:last-child',n:5}
    ], path.join(d82, 'CancelReasonDialog.png'));
    await closeDialog(page);
  }

  // ──────────────────────────────────────────
  // [17] SHIPPING — DispatchDialog & CancelShip
  // ──────────────────────────────────────────
  console.log('\n📋 [17] shipping-management');
  const d17 = path.join(OUT_ROOT, '17-shipping-management'); mkDir(d17);
  await navTo(page, '/shipping-management');
  await page.waitForTimeout(2000);

  // Try to find "Đẩy đơn" button in shipping list
  console.log('  → DispatchDialog');
  let dispatchOk = false;

  // Try each tab within shipping management
  const shippingTabs = ['Chờ giao', 'Chờ đẩy đơn', 'Cần điều phối', 'Tất cả', 'Đang giao'];
  for (const tab of shippingTabs) {
    await clickTab(page, tab, 1500);
    if (await firstRowBtn(page, 'Đẩy đơn')) {
      if (await waitDialog(page)) {
        await shot(page, [
          {sel:'h2,[class*="DialogTitle"]',n:1},
          {sel:'[role="dialog"] select,native-select',n:2},
          {sel:'[role="dialog"] p',n:3},
          {sel:'footer button:first-child',n:4},
          {sel:'footer button:last-child',n:5}
        ], path.join(d17, 'DispatchDialog.png'));
        await closeDialog(page);
        dispatchOk = true;
        break;
      }
    }
  }
  if (!dispatchOk) console.log('  ⚠ DispatchDialog: nút Đẩy đơn không tìm thấy (cần đơn đã đóng gói)');

  console.log('  → CancelShipDialog');
  let cancelShipOk = false;
  for (const tab of ['Đang giao', 'Tất cả', 'Chờ giao']) {
    await clickTab(page, tab, 1500);
    if (await firstRowBtn(page, 'Hủy giao')) {
      if (await waitDialog(page)) {
        await shot(page, [
          {sel:'h2,[class*="DialogTitle"]',n:1},
          {sel:'[role="dialog"] [class*="text-red"],[role="dialog"] [class*="warning"]',n:2},
          {sel:'[role="dialog"] textarea,[role="dialog"] input',n:3},
          {sel:'footer button:first-child',n:4},
          {sel:'footer button:last-child',n:5}
        ], path.join(d17, 'CancelShipDialog.png'));
        await closeDialog(page);
        cancelShipOk = true;
        break;
      }
    }
  }
  if (!cancelShipOk) console.log('  ⚠ CancelShipDialog: nút Hủy giao không tìm thấy');

  // ──────────────────────────────────────────
  // [18] TRANSFER TICKET
  // ──────────────────────────────────────────
  console.log('\n📋 [18] transfer-ticket-management');
  const d18 = path.join(OUT_ROOT, '18-transfer-ticket-management'); mkDir(d18);
  await navTo(page, '/circulating-slips-management');
  await page.waitForTimeout(2000);

  // Try tab for transfer tickets
  const ttTabs = ['Phiếu điều chuyển', 'Điều chuyển', 'Transfer'];
  for (const tab of ttTabs) {
    if (await clickTab(page, tab, 2000)) break;
  }
  await page.waitForTimeout(1500);

  console.log('  → NewTransferTicketDialog');
  await findAndClick(page, ['Tạo phiếu điều chuyển', 'Thêm phiếu', 'điều chuyển mới', 'Thêm mới', 'Tạo mới']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'[role="dialog"] select:nth-of-type(1)',n:2},
      {sel:'[role="dialog"] select:nth-of-type(2)',n:3},
      {sel:'[role="dialog"] select:nth-of-type(3)',n:4},
      {sel:'[role="dialog"] input[type="number"]',n:5},
      {sel:'[role="dialog"] button:has-text("Thêm"),[role="dialog"] button[class*="outline"]',n:6},
      {sel:'[role="dialog"] table',n:7},
      {sel:'footer button:last-child',n:8}
    ], path.join(d18, 'NewTransferTicketDialog.png'));
    await closeDialog(page);
  }

  // ──────────────────────────────────────────
  // [12.2] EXPORT RECEIPT — via checkbox
  // ──────────────────────────────────────────
  console.log('\n📋 [12.2] exportreceipt-management');
  const d122 = path.join(OUT_ROOT, '14-exportreceipt-management'); mkDir(d122);
  await navTo(page, '/circulating-slips-management');
  await page.waitForTimeout(2000);

  const exportTabs = ['Phiếu xuất kho', 'Xuất kho'];
  for (const tab of exportTabs) {
    if (await clickTab(page, tab, 2000)) break;
  }
  await page.waitForTimeout(1500);

  console.log('  → NewExportReceiptDialog (select rows first)');
  // Click first row checkbox
  try {
    const cbs = await page.$$('tbody tr input[type="checkbox"],tbody tr [role="checkbox"]');
    if (cbs.length > 0) { await cbs[0].click(); await page.waitForTimeout(600); }
    if (cbs.length > 1) { await cbs[1].click(); await page.waitForTimeout(600); }
  } catch {}
  // Now find the create button
  await findAndClick(page, ['Tạo phiếu xuất', 'xuất kho', 'Tạo phiếu']);
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'[role="dialog"] [class*="info"],[role="dialog"] .grid > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] table',n:3},
      {sel:'[role="dialog"] [class*="summary"],[role="dialog"] .grid > div:nth-child(3)',n:4},
      {sel:'footer button:last-child',n:5}
    ], path.join(d122, 'NewExportReceiptDialog.png'));
    await closeDialog(page);
  }

  // ──────────────────────────────────────────
  // [19] ACCOUNTING — PrintInvoiceDialog
  // ──────────────────────────────────────────
  console.log('\n📋 [19] accounting-management — PrintInvoiceDialog');
  const d19 = path.join(OUT_ROOT, '19-accounting-management'); mkDir(d19);
  await navTo(page, '/accounting-management');
  await page.waitForTimeout(2000);

  // Try various tab names for accounting
  for (const tab of ['Hóa đơn', 'Tra cứu', 'Danh sách']) {
    if (await clickTab(page, tab, 1500)) break;
  }

  console.log('  → PrintInvoiceDialog');
  await firstRowBtn(page, 'In hóa đơn');
  if (!(await waitDialog(page, 4000))) {
    await firstRowBtn(page, 'In');
  }
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'[role="dialog"] .grid > div:nth-child(1)',n:2},
      {sel:'[role="dialog"] table',n:3},
      {sel:'[role="dialog"] [class*="font-bold"]:last-child,[role="dialog"] [class*="total"]',n:4},
      {sel:'footer button:first-child',n:5},
      {sel:'footer button:last-child',n:6}
    ], path.join(d19, 'PrintInvoiceDialog.png'));
    await closeDialog(page);
  }

  // ──────────────────────────────────────────
  // [6.2] COMBO — DetailComboDialog
  // ──────────────────────────────────────────
  console.log('\n📋 [6.2] combo — DetailComboDialog');
  const d62 = path.join(OUT_ROOT, '6-combo-management'); mkDir(d62);
  await navTo(page, '/combo-management');
  await page.waitForTimeout(2000);

  console.log('  → DetailComboDialog');
  await firstRowBtn(page, 'Chi tiết');
  if (!(await waitDialog(page, 3000))) await firstRowBtn(page, 'Xem chi tiết');
  if (await waitDialog(page)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'[role="dialog"] [class*="badge"],[role="dialog"] [class*="status"]',n:2},
      {sel:'[role="dialog"] table',n:3},
      {sel:'footer button',n:4}
    ], path.join(d62, 'DetailComboDialog.png'));
    await closeDialog(page);
  }

  // ──────────────────────────────────────────
  // [4] CUSTOMER — FeedbackDialog
  // ──────────────────────────────────────────
  console.log('\n📋 [4] customer — FeedbackDialog');
  const d4 = path.join(OUT_ROOT, '4-customer-management'); mkDir(d4);
  await navTo(page, '/customer-partner-management');
  await clickTab(page, 'Khách hàng', 2000);
  await page.waitForTimeout(1000);

  console.log('  → FeedbackDialog');
  // Find first row with enabled Feedback button
  try {
    const rows = await page.$$('tbody tr');
    let found = false;
    for (const row of rows) {
      const btns = await row.$$('button');
      for (const b of btns) {
        const t = (await b.textContent() || '').trim();
        const disabled = await b.getAttribute('disabled');
        if ((t.includes('Phản hồi') || t.includes('Feedback')) && !disabled) {
          await b.scrollIntoViewIfNeeded();
          await b.click();
          found = true;
          break;
        }
      }
      if (found) break;
    }
  } catch {}
  if (await waitDialog(page, 4000)) {
    await shot(page, [
      {sel:'h2,[class*="DialogTitle"]',n:1},
      {sel:'[role="dialog"] [class*="star"],[role="dialog"] button[class*="star"]',n:2},
      {sel:'[role="dialog"] textarea,[role="dialog"] input[type="text"]',n:3},
      {sel:'footer button:first-child',n:4},
      {sel:'footer button:last-child',n:5}
    ], path.join(d4, 'FeedbackDialog.png'));
    await closeDialog(page);
  } else {
    console.log('  ⚠ FeedbackDialog: không có KH nào có đơn giao thành công');
  }

  await browser.close();
  console.log('\n🎉 Capture missing dialogs DONE!');
  console.log(`📁 Saved to: ${OUT_ROOT}`);
})();
