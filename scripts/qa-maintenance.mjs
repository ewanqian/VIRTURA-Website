#!/usr/bin/env node
// Verify the isolated maintenance artifact. Optional live checks verify routing;
// local source checks alone do not establish a Cloudflare deployment.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'maintenance');
const allowed = ['404.html', '_headers', '_redirects', 'index.html'].sort();
const marker = 'data-maintenance="2026-11-18"';
const message = '本轮更新预计持续约一个月，重新开放时间将另行公布。';
const report = (label) => console.log('PASS:', label);

const entries = fs.readdirSync(output).sort();
assert.deepEqual(entries, allowed, 'Maintenance output must contain only its four allowed files');
for (const entry of entries) {
  assert(fs.lstatSync(path.join(output, entry)).isFile(), `Output must not include directories or symlinks: ${entry}`);
}
report('Isolated output contains only index, 404, redirects and headers');

const page = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
assert.equal(fs.readFileSync(path.join(output, '404.html'), 'utf8'), page, '404 must match the maintenance page');
assert(page.includes(marker) && page.includes(message), 'Maintenance copy and release marker must be present');
assert(page.includes('Under maintenance.') && page.includes('data-language="en"'), 'English copy and language control must be present');
report('Index and 404 are identical, with the correct bilingual maintenance copy');

assert(!/<(?:a|form|iframe|audio|video|source)\b/i.test(page), 'Maintenance page must not expose navigation, forms or embedded services');
for (const match of page.matchAll(/\b(?:src|href|action)\s*=\s*["']([^"']*)["']/gi)) {
  assert(match[1].startsWith('data:'), `Only embedded resources are allowed: ${match[1]}`);
}
assert(!/@import|url\s*\(\s*["']?(?:https?:|\/\/)|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(|sendBeacon\s*\(/i.test(page), 'Maintenance HTML must not load external CSS or call network services');
report('Maintenance page has no navigation, forms, external resources or network calls');

const logo = page.match(/src="data:image\/png;base64,([A-Za-z0-9+/=]+)"/);
assert(logo, 'Maintenance page must embed the original PNG logo');
assert(Buffer.from(logo[1], 'base64').equals(fs.readFileSync(path.join(root, 'assets/virtura-logo-white.png'))), 'Embedded logo must preserve the original image bytes');
report('Original VIRTURA logo is embedded unchanged');

const config = fs.readFileSync(path.join(root, 'wrangler.toml'), 'utf8');
assert(/^name\s*=\s*"virtura-website"\s*$/m.test(config), 'Wrangler must target the existing Pages project name');
assert(/^pages_build_output_dir\s*=\s*"\.\/maintenance"\s*$/m.test(config), 'Wrangler output must be ./maintenance');
assert.equal(fs.readFileSync(path.join(output, '_redirects'), 'utf8').trim(), '/* /index.html 200', 'All legacy paths must rewrite to maintenance');
assert(/^\/\*\s*\n\s+Cache-Control:\s*no-store\s*$/i.test(fs.readFileSync(path.join(output, '_headers'), 'utf8').trim()), 'All maintenance responses must use no-store');
assert(!fs.existsSync(path.join(root, '_worker.js')) && !fs.existsSync(path.join(output, '_worker.js')), 'Maintenance must not depend on a Worker or its request quota');
report('Wrangler isolates deployment; all paths rewrite to maintenance with no-store');

const origin = process.env.MAINTENANCE_ORIGIN;
if (!origin) {
  console.log('NOT RUN: live Cloudflare routing. Set MAINTENANCE_ORIGIN to a preview or production origin.');
} else {
  const base = new URL(origin);
  assert(['http:', 'https:'].includes(base.protocol) && !base.username && !base.password && !base.search && !base.hash && base.pathname === '/', 'MAINTENANCE_ORIGIN must be an HTTP(S) origin without credentials, path, query or fragment');
  const paths = ['/', '/index.html', '/apps/', '/apps/store.html', '/apps/my-space.html', '/apps/catalog.html', '/apps/store-registry.json', '/data/space-asset-inventory-2026.json', '/docs/pm/tasks.json', '/work/titan.html', '/assets/people/xiaoyao-ma.jpg', '/upgrade.html', '/maintenance-route-check/not-found'];
  for (const route of paths) {
    const response = await fetch(new URL(route, base), { cache: 'no-store', signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 200, `Expected maintenance status for ${route}`);
    assert.equal(new URL(response.url).origin, base.origin, `Must not redirect ${route} to another origin`);
    assert(/text\/html/i.test(response.headers.get('content-type') || ''), `Expected HTML for ${route}`);
    assert(/\bno-store\b/i.test(response.headers.get('cache-control') || ''), `Expected no-store for ${route}`);
    const body = await response.text();
    assert(body.includes(marker) && body.includes(message), `Maintenance page missing at ${route}`);
    assert(!/<(?:a|form|iframe)\b/i.test(body), `Old navigation or forms exposed at ${route}`);
    report(`Live maintenance response: ${route}`);
  }
  const head = await fetch(new URL('/apps/store.html', base), { method: 'HEAD', cache: 'no-store', signal: AbortSignal.timeout(15000) });
  assert.equal(head.status, 200, 'HEAD must return the maintenance status');
  assert.equal(await head.text(), '', 'HEAD must have no response body');
  assert(/\bno-store\b/i.test(head.headers.get('cache-control') || ''), 'HEAD must have no-store');
  report('Live HEAD response has no body and is not cached');
}

console.log('Maintenance artifact checks completed. Browser layout and production reopening remain separate gates.');
