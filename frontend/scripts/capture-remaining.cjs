/**
 * capture-remaining.cjs
 * Fix: Only capture Shipping, Report, Accounting pages which failed
 * Remove :has-text() selectors (not valid in browser querySelector)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve(__dirname, '../../instruction');

const PHONE = '0988444555';
const PASSWORD = 'hashed_mgr';

async function reactNavigate(page, targetPath) {
  await page.evaluate((p) => {
    window.history.pushState({}, '', p);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, targetPath);
  await page.waitForTimeout(3000);
  try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}
  await page.waitForTimeout(1000);
}

async function injectAnnotations(page, annotations) {
  await page.evaluate((items) => {
    const old = document.getElementById('__ann__');
    if (old) old.remove();
    const layer = document.createElement('div');
    layer.id = '__ann__';
    layer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2147483647;';
    document.body.appendChild(layer);

    items.forEach(({ selector, n, fallbackX, fallbackY }) => {
      const el = selector ? document.querySelector(selector) : null;
      let x = fallbackX || 16, y = fallbackY || 16;
      if (el) {
        const rect = el.getBoundingClientRect();
        x = Math.max(16, Math.min(rect.left + rect.width/2, window.innerWidth - 16));
        y = Math.max(16, Math.min(rect.top + rect.height/2, window.innerHeight - 16));
      }
      const b = document.createElement('div');
      b.textContent = String(n);
      b.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:26px;height:26px;background:#e53e3e;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;font-family:Arial,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,0.5);z-index:2147483647;pointer-events:none;transform:translate(-50%,-50%);border:2px solid white;`;
      layer.appendChild(b);
    });
  }, annotations);
}

async function capture(page, annotations, outputPath) {
  await injectAnnotations(page, annotations);
  await page.waitForTimeout(600);
  await page.screenshot({ path: outputPath, fullPage: false });
  console.log(`✅ Captured: ${outputPath}`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'vi-VN' });
  const page = await context.newPage();

  // Sign in
  console.log('🔐 Signing in...');
  await page.goto(`${BASE_URL}/signin`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  
  const phoneInput = await page.$('#employeeId, input[placeholder*="SĐT"]');
  if (phoneInput) await phoneInput.fill(PHONE);
  const passInput = await page.$('#password, input[type="password"]');
  if (passInput) await passInput.fill(PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(3000);
  
  console.log('Login URL:', page.url());
  if (page.url().includes('signin')) { console.error('Login failed!'); await browser.close(); return; }

  // ─── Shipping Management ───
  console.log('📸 Shipping Management...');
  await reactNavigate(page, '/shipping-management');
  // Get tab buttons text
  const tabBtns = await page.$$('button');
  let firstTabSel = 'button:first-of-type';
  for (const btn of tabBtns) {
    const txt = await btn.textContent();
    if (txt && txt.includes('giao vận')) { firstTabSel = null; break; }
  }
  await capture(page, [
    { n: 1, fallbackX: 400, fallbackY: 50 },    // tab Chờ giao vận
    { n: 2, fallbackX: 520, fallbackY: 50 },    // tab Hủy chờ tháo dỡ
    { n: 3, selector: 'input[type="text"]' },   // search
    { n: 4, selector: 'table' },                // table
    { n: 5, selector: 'tbody tr:first-child td:nth-child(1)' },
    { n: 6, selector: 'tbody tr:first-child td:nth-child(3)' },
    { n: 7, selector: 'tbody tr:first-child td:last-child button' },
  ], path.join(OUTPUT_DIR, '17-shipping-management.png'));

  // ─── Report Management ───
  console.log('📸 Report Management...');
  await reactNavigate(page, '/report-management');
  await capture(page, [
    { n: 1, selector: 'input[type="date"]:first-of-type' },
    { n: 2, selector: 'input[type="date"]:last-of-type' },
    { n: 3, selector: 'button[class*="outline"]' },
    { n: 4, selector: 'table' },
    { n: 5, selector: 'tbody tr:first-child td:first-child' },
    { n: 6, selector: 'tbody tr:first-child td:last-child' },
  ], path.join(OUTPUT_DIR, '16-report-management.png'));

  // ─── Accounting Management ───
  console.log('📸 Accounting Management...');
  await reactNavigate(page, '/accounting-management');
  await capture(page, [
    { n: 1, selector: 'input[type="text"]' },
    { n: 2, selector: 'table' },
    { n: 3, selector: 'tbody tr:first-child button:first-child' },
    { n: 4, selector: 'tbody tr:first-child button:last-child' },
  ], path.join(OUTPUT_DIR, '19-accounting-management.png'));

  await browser.close();
  console.log('\n🎉 Remaining screenshots captured!');
})();
