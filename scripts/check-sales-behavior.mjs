import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function storage() {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}
function loadModule(file, dependencies, browser) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const exports = {};
  const context = { exports, require: id => { assert.ok(id in dependencies, `Unexpected import ${id}`); return dependencies[id]; }, URLSearchParams, ...browser };
  vm.runInNewContext(code, context, { filename: file });
  return exports;
}
const localStorage = storage();
const sessionStorage = storage();
const window = { location: { search: '?utm_source=instagram&utm_medium=paid_social&utm_campaign=hydra&lid=ad42', pathname: '/courses/hydra-facial', href: 'http://localhost/courses/hydra-facial' } };
const lid = loadModule('lib/lid.ts', {}, { window, localStorage, sessionStorage });
assert.equal(lid.storeUrlAttribution().isAdLanding, true);
window.location.search = '';
assert.equal(lid.isAdLandingSession(), true, 'Paid session survives internal navigation');
assert.equal(lid.getUtmParams().utm_campaign, 'hydra');
assert.equal(lid.getStoredLid(), 'ad42');
const whatsapp = loadModule('lib/whatsapp.ts', { '@/content/site': { siteConfig: { whatsappNumber: '919017643392' } }, '@/lib/lid': lid }, { window });
const href = new URL(whatsapp.getWhatsAppUrl('question', 'Please share course details'));
assert.equal(href.hostname, 'wa.me');
assert.equal(href.pathname, '/919017643392');
assert.equal(href.searchParams.get('text'), 'Please share course details Ref: ad42');
assert.ok(!whatsapp.getWhatsAppUrl('oneday_enrol').includes('%5B'), 'No placeholder name in one-day enquiry');

const timers = [];
const listeners = new Map();
const scripts = [];
const appended = [];
const document = { createElement: () => ({}), getElementsByTagName: () => [{ parentNode: { insertBefore: node => scripts.push(node) } }], head: { appendChild: node => appended.push(node) } };
const analyticsWindow = { ...window, addEventListener: (key, handler) => listeners.set(key, handler), removeEventListener: key => listeners.delete(key) };
const tracking = loadModule('lib/tracking.ts', { '@/lib/lid': lid }, { window: analyticsWindow, document, process: { env: { NEXT_PUBLIC_META_PIXEL_ID: 'test-pixel', NEXT_PUBLIC_GA4_ID: 'G-TEST' } }, setTimeout: handler => timers.push(handler) });
tracking.trackEvent('ViewContent', { content_ids: ['hydra-facial'] }, 'view-1');
tracking.initAnalytics();
tracking.initAnalytics();
assert.equal(timers.length, 1, 'Initialisation schedules only one loader');
timers[0]();
assert.equal(scripts.length, 1);
assert.equal(appended.length, 1);
const queuedMeta = analyticsWindow.fbq.queue.map(args => Array.from(args));
assert.ok(queuedMeta.some(args => args[1] === 'ViewContent' && args[3]?.eventID === 'view-1'), 'Early course view is retained with its event ID');
assert.equal(queuedMeta.filter(args => args[1] === 'ViewContent').length, 1);
assert.ok(analyticsWindow.dataLayer.some(args => args[0] === 'event' && args[1] === 'ViewContent'), 'Early course view reaches GA queue');
console.log('Passed: Instagram attribution, internal navigation, correct WhatsApp number/message/reference, placeholder-free enquiries, single analytics initialisation and deferred-event delivery.');
