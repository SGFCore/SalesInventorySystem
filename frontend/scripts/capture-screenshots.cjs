/**
 * capture-screenshots.cjs
 * Playwright automation script - Navigate via React Router (no page reload)
 * so that isAuthenticated state is preserved in memory.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve(__dirname, '../../instruction');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PHONE = '0988444555';
const PASSWORD = 'hashed_mgr';

/**
 * Navigate using React Router's pushState (no full reload).
 */
async function reactNavigate(page, targetPath) {
  await page.evaluate((path) => {
    window.history.pushState({}, '', path);
    // Dispatch popstate to trigger React Router re-render
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, targetPath);
  await page.waitForTimeout(2500);
  try {
    await page.waitForLoadState('networkidle', { timeout: 8000 });
  } catch { /* ignore */ }
  await page.waitForTimeout(1000);
}

/**
 * Inject numbered annotation badges (absolute positioned, fixed layer).
 */
async function injectAnnotations(page, annotations) {
  await page.evaluate((items) => {
    const old = document.getElementById('__annotation_layer__');
    if (old) old.remove();

    const layer = document.createElement('div');
    layer.id = '__annotation_layer__';
    layer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2147483647;';
    document.body.appendChild(layer);

    items.forEach(({ selector, n, fallbackX, fallbackY }) => {
      const el = selector ? document.querySelector(selector) : null;
      const badge = document.createElement('div');

      let x = fallbackX || 16;
      let y = fallbackY || 16;

      if (el) {
        const rect = el.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
        x = Math.max(16, Math.min(x, window.innerWidth - 16));
        y = Math.max(16, Math.min(y, window.innerHeight - 16));
      }

      badge.textContent = String(n);
      badge.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 26px;
        height: 26px;
        background: #e53e3e;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 800;
        font-family: Arial, sans-serif;
        line-height: 1;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        z-index: 2147483647;
        pointer-events: none;
        transform: translate(-50%, -50%);
        border: 2px solid white;
      `;
      layer.appendChild(badge);
    });
  }, annotations);
}

async function captureAnnotated(page, annotations, outputPath) {
  await injectAnnotations(page, annotations);
  await page.waitForTimeout(600);
  await page.screenshot({ path: outputPath, fullPage: false });
  console.log(`✅ Captured: ${outputPath}`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'vi-VN',
  });
  const page = await context.newPage();

  // ─────────────────────────────────────────────
  // STEP 1: Sign In Page (before login)
  // ─────────────────────────────────────────────
  console.log('📸 Capturing Sign In page...');
  await page.goto(`${BASE_URL}/signin`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await captureAnnotated(page, [
    { n: 1, selector: '.text-blue-600.font-bold, h1, .text-3xl.font-bold' },
    { n: 2, selector: '.text-sm.text-slate-500, p.text-\\[11px\\]' },
    { n: 3, selector: '#employeeId, input[placeholder*="SĐT"]' },
    { n: 4, selector: '#password, input[type="password"]' },
    { n: 5, selector: 'button[type="button"]:last-of-type' },
    { n: 6, selector: 'button[type="submit"]' },
    { n: 7, selector: '.bg-slate-50, .text-xs.text-slate-400, .text-\\[11px\\]' },
  ], path.join(OUTPUT_DIR, 'signin.png'));

  // ─────────────────────────────────────────────
  // STEP 2: Login - fill and submit
  // ─────────────────────────────────────────────
  console.log('🔐 Logging in...');
  const phoneInput = await page.$('#employeeId, input[placeholder*="SĐT"], input[type="tel"], input[type="text"]');
  if (phoneInput) await phoneInput.fill(PHONE);
  const passInput = await page.$('#password, input[type="password"]');
  if (passInput) await passInput.fill(PASSWORD);
  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) await submitBtn.click();
  
  // Wait for redirect to home
  await page.waitForURL('**/', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(3000);
  try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}
  await page.waitForTimeout(2000);

  const currentUrl = page.url();
  console.log(`Current URL after login: ${currentUrl}`);

  if (currentUrl.includes('signin')) {
    console.error('❌ Login failed! Still on signin page.');
    await browser.close();
    process.exit(1);
  }

  // ─────────────────────────────────────────────
  // STEP 3: Home / Dashboard Page
  // ─────────────────────────────────────────────
  console.log('📸 Capturing Home (Dashboard) page...');
  await captureAnnotated(page, [
    { n: 1, selector: '.text-blue-100, [class*="SGFMS"], [class*="Dashboard"], .font-bold.text-sm' },
    { n: 2, selector: 'h1, .text-2xl.font-bold, .text-3xl.font-bold' },
    { n: 3, selector: 'h2.text-xl, h3, .text-lg.font-bold' },
    { n: 4, selector: 'input[type="date"]:first-of-type' },
    { n: 5, selector: 'input[type="date"]:last-of-type' },
    { n: 6, selector: 'button.bg-blue-600, button[class*="blue"]' },
    { n: 7, selector: '.grid > div:nth-child(1)' },
    { n: 8, selector: '.grid > div:nth-child(2)' },
    { n: 9, selector: '.grid > div:nth-child(3)' },
    { n: 10, selector: '.grid > div:nth-child(4)' },
  ], path.join(OUTPUT_DIR, 'home-dashboard.png'));

  // ─────────────────────────────────────────────
  // Use React Router navigation (no page reload) for all subsequent pages
  // ─────────────────────────────────────────────

  // Notification Management
  console.log('📸 Capturing Notification Management page...');
  await reactNavigate(page, '/notification-management');
  await captureAnnotated(page, [
    { n: 1, selector: 'h1' },
    { n: 2, selector: 'p.text-slate-500, p.text-gray-500, p[class*="unread"]' },
    { n: 3, selector: 'button:nth-of-type(1)' },
    { n: 4, selector: 'button:nth-of-type(2)' },
    { n: 5, selector: 'button:nth-of-type(3)' },
    { n: 6, selector: '[class*="divide"], [class*="notification-list"], ul, ol' },
    { n: 7, selector: 'button[title*="đọc tất"], button[title*="all"]' },
  ], path.join(OUTPUT_DIR, '0-notification-management.png'));

  // Employee Info Page
  console.log('📸 Capturing Employee Info page...');
  await reactNavigate(page, '/profile');
  await captureAnnotated(page, [
    { n: 1, selector: '.rounded-full.bg-blue, [class*="avatar"], .h-40, .h-36' },
    { n: 2, selector: 'h2, .text-3xl, .text-2xl.font-semibold' },
    { n: 3, selector: 'p.text-slate-500, p.text-gray-500' },
    { n: 4, selector: '.bg-green-600, .bg-slate-400, [class*="badge"], [class*="status"]' },
    { n: 5, selector: 'button' },
    { n: 6, selector: 'a[href^="mailto"]' },
  ], path.join(OUTPUT_DIR, '1-emp-info.png'));

  // Employee Management
  console.log('📸 Capturing Employee Management page...');
  await reactNavigate(page, '/emp-management');
  await captureAnnotated(page, [
    { n: 1, selector: 'input[type="text"], input[type="search"]' },
    { n: 2, selector: 'button.bg-blue-600, button[class*="primary"]' },
    { n: 3, selector: 'table, [role="table"]' },
    { n: 4, selector: 'tbody tr:first-child td:nth-child(1)' },
    { n: 5, selector: 'tbody tr:first-child td:nth-child(2)' },
    { n: 6, selector: 'tbody tr:first-child button:nth-child(1)' },
    { n: 7, selector: 'tbody tr:first-child button:nth-child(2)' },
    { n: 8, selector: 'tbody tr:first-child button:nth-child(3)' },
  ], path.join(OUTPUT_DIR, '2-emp-management.png'));

  // Customer Partner - Partners tab
  console.log('📸 Capturing Partner Management page...');
  await reactNavigate(page, '/customer-partner-management');
  await captureAnnotated(page, [
    { n: 1, selector: 'input[type="text"], input[type="search"]' },
    { n: 2, selector: 'button.bg-blue-600, button[class*="primary"]' },
    { n: 3, selector: 'table, [role="table"]' },
    { n: 4, selector: 'tbody tr:first-child button:nth-child(1)' },
    { n: 5, selector: 'tbody tr:first-child button:nth-child(2)' },
    { n: 6, selector: 'tbody tr:first-child button:nth-child(3)' },
  ], path.join(OUTPUT_DIR, '3-comp-management.png'));

  // Customer Management - Click customers tab
  console.log('📸 Capturing Customer Management page...');
  try {
    // Try to find and click "Khách hàng" tab
    const custTab = await page.$('button:has-text("Khách hàng"), a:has-text("Khách hàng")');
    if (custTab) await custTab.click();
    await page.waitForTimeout(2000);
  } catch {}
  await captureAnnotated(page, [
    { n: 1, selector: 'input[type="text"], input[type="search"]' },
    { n: 2, selector: 'button.bg-blue-600, button[class*="primary"]' },
    { n: 3, selector: 'table, [role="table"]' },
    { n: 4, selector: 'tbody tr:first-child button:nth-child(1)' },
    { n: 5, selector: 'tbody tr:first-child button:nth-child(2)' },
    { n: 6, selector: 'tbody tr:first-child button:nth-child(3)' },
    { n: 7, selector: 'tbody tr:first-child button:nth-child(4)' },
  ], path.join(OUTPUT_DIR, '4-customer-management.png'));

  // Product Management - Category tab
  console.log('📸 Capturing Category Management page...');
  await reactNavigate(page, '/product-management');
  await captureAnnotated(page, [
    { n: 1, selector: 'input[type="text"], input[type="search"]' },
    { n: 2, selector: 'button.bg-blue-600, button[class*="primary"]' },
    { n: 3, selector: 'table, [role="table"]' },
    { n: 4, selector: 'tbody tr:first-child button:nth-child(1)' },
    { n: 5, selector: 'tbody tr:first-child button:nth-child(2)' },
    { n: 6, selector: 'tbody tr:first-child button:nth-child(3)' },
  ], path.join(OUTPUT_DIR, '5-category-management.png'));

  // Product Management - Products tab
  console.log('📸 Capturing Product Management page...');
  try {
    const prodTab = await page.$('button:has-text("Sản phẩm"), a:has-text("Sản phẩm")');
    if (prodTab) { await prodTab.click(); await page.waitForTimeout(2000); }
  } catch {}
  await captureAnnotated(page, [
    { n: 1, selector: 'input[type="text"], input[type="search"]' },
    { n: 2, selector: 'button.bg-blue-600, button[class*="primary"]' },
    { n: 3, selector: 'table, [role="table"]' },
    { n: 4, selector: 'tbody tr:first-child td:nth-child(1)' },
    { n: 5, selector: 'tbody tr:first-child td:nth-child(3)' },
    { n: 6, selector: 'tbody tr:first-child button' },
  ], path.join(OUTPUT_DIR, '6-product-management.png'));

  // Multichannel Order - Invoices
  console.log('📸 Capturing Invoice Management page...');
  await reactNavigate(page, '/multichannel-order-management');
  // Navigate to invoices tab
  try {
    const invoiceTab = await page.$('button:has-text("Hóa đơn"), a:has-text("Hóa đơn")');
    if (invoiceTab) { await invoiceTab.click(); await page.waitForTimeout(2500); }
  } catch {}
  await captureAnnotated(page, [
    { n: 1, selector: 'input[type="text"], input[type="search"]' },
    { n: 2, selector: 'table, [role="table"]' },
    { n: 3, selector: 'tbody tr:first-child [class*="badge"], tbody tr:first-child .text-green, tbody tr:first-child .text-amber' },
    { n: 4, selector: 'tbody tr:first-child button:nth-child(1)' },
    { n: 5, selector: 'tbody tr:first-child button:nth-child(2)' },
    { n: 6, selector: 'tbody tr:first-child button:nth-child(3)' },
  ], path.join(OUTPUT_DIR, '8-invoice-management.png'));

  // Multichannel Order - Orders (tại quầy)
  console.log('📸 Capturing Order (offline) Management page...');
  await reactNavigate(page, '/multichannel-order-management');
  await captureAnnotated(page, [
    { n: 1, selector: 'input[type="text"], input[type="search"]' },
    { n: 2, selector: 'button.bg-blue-600, button[class*="primary"]' },
    { n: 3, selector: 'table, [role="table"]' },
    { n: 4, selector: 'tbody tr:first-child td:nth-child(1)' },
    { n: 5, selector: 'tbody tr:first-child td:nth-child(2)' },
    { n: 6, selector: 'tbody tr:first-child button' },
  ], path.join(OUTPUT_DIR, '8-order-management.png'));

  // Warehouse Management
  console.log('📸 Capturing Warehouse Management page...');
  await reactNavigate(page, '/warehouse-management');
  await captureAnnotated(page, [
    { n: 1, selector: 'input[type="text"], input[type="search"]' },
    { n: 2, selector: 'button.bg-blue-600, button[class*="primary"]' },
    { n: 3, selector: 'table, [role="table"]' },
    { n: 4, selector: 'tbody tr:first-child td:nth-child(1)' },
    { n: 5, selector: 'tbody tr:first-child button:nth-child(1)' },
    { n: 6, selector: 'tbody tr:first-child button:nth-child(2)' },
    { n: 7, selector: 'tbody tr:first-child button:nth-child(3)' },
  ], path.join(OUTPUT_DIR, '11-warehouse-management.png'));

  // Circulating Slips - Request management
  console.log('📸 Capturing Request Management page...');
  await reactNavigate(page, '/circulating-slips-management');
  await captureAnnotated(page, [
    { n: 1, selector: 'input[type="text"], input[type="search"]' },
    { n: 2, selector: 'button.bg-blue-600, button[class*="primary"]' },
    { n: 3, selector: 'table, [role="table"]' },
    { n: 4, selector: 'tbody tr:first-child [class*="badge"], tbody tr:first-child span.font-bold' },
    { n: 5, selector: 'tbody tr:first-child button:nth-child(1)' },
    { n: 6, selector: 'tbody tr:first-child button:nth-child(2)' },
  ], path.join(OUTPUT_DIR, '12-request-management.png'));

  // Circulating Slips - Import receipts
  console.log('📸 Capturing Import Receipt Management page...');
  try {
    const importTab = await page.$('button:has-text("nhập kho"), button:has-text("Nhập"), a:has-text("nhập kho")');
    if (importTab) { await importTab.click(); await page.waitForTimeout(2000); }
  } catch {}
  await captureAnnotated(page, [
    { n: 1, selector: 'input[type="text"], input[type="search"]' },
    { n: 2, selector: 'button.bg-blue-600, button[class*="primary"]' },
    { n: 3, selector: 'table, [role="table"]' },
    { n: 4, selector: 'tbody tr:first-child [class*="badge"], tbody tr:first-child span.font-bold' },
    { n: 5, selector: 'tbody tr:first-child button:nth-child(1)' },
    { n: 6, selector: 'tbody tr:first-child button:nth-child(2)' },
    { n: 7, selector: 'tbody tr:first-child button:nth-child(3)' },
  ], path.join(OUTPUT_DIR, '13-importreceipt-management.png'));

  // Policy Management
  console.log('📸 Capturing Policy Management page...');
  await reactNavigate(page, '/policy-management');
  await captureAnnotated(page, [
    { n: 1, selector: 'input[type="text"], input[type="search"]' },
    { n: 2, selector: 'button.bg-blue-600, button[class*="primary"]' },
    { n: 3, selector: 'table, [role="table"]' },
  ], path.join(OUTPUT_DIR, '10-policy-management.png'));

  // Shipping Management
  console.log('📸 Capturing Shipping Management page...');
  await reactNavigate(page, '/shipping-management');
  await captureAnnotated(page, [
    { n: 1, selector: 'button:has-text("Chờ giao"), button:has-text("giao vận")' },
    { n: 2, selector: 'button:has-text("tháo dỡ"), button:has-text("Hủy")' },
    { n: 3, selector: 'input[type="text"], input[type="search"]' },
    { n: 4, selector: 'table, [role="table"]' },
    { n: 5, selector: 'tbody tr:first-child td:nth-child(1)' },
    { n: 6, selector: 'tbody tr:first-child td:nth-child(2)' },
    { n: 7, selector: 'tbody tr:first-child button' },
  ], path.join(OUTPUT_DIR, '17-shipping-management.png'));

  // Report Management
  console.log('📸 Capturing Report Management page...');
  await reactNavigate(page, '/report-management');
  await captureAnnotated(page, [
    { n: 1, selector: 'input[type="date"]:first-of-type' },
    { n: 2, selector: 'input[type="date"]:last-of-type' },
    { n: 3, selector: 'button:has-text("PDF"), button:has-text("Xuất")' },
    { n: 4, selector: 'table, [role="table"]' },
  ], path.join(OUTPUT_DIR, '16-report-management.png'));

  // Accounting Management
  console.log('📸 Capturing Accounting Management page...');
  await reactNavigate(page, '/accounting-management');
  await captureAnnotated(page, [
    { n: 1, selector: 'input[type="text"], input[type="search"]' },
    { n: 2, selector: 'table, [role="table"]' },
    { n: 3, selector: 'tbody tr:first-child button:nth-child(1)' },
    { n: 4, selector: 'tbody tr:first-child button:nth-child(2)' },
  ], path.join(OUTPUT_DIR, '19-accounting-management.png'));

  await browser.close();
  console.log('\n🎉 All screenshots captured successfully!');
  console.log(`📁 Saved to: ${OUTPUT_DIR}`);
})();
