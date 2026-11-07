#!/usr/bin/env node
// Minimal deterministic gate for the VIRTURA Website's current static setup.
// This verifies source consistency, not public Cloudflare deployment or rendered UX.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
let errors = 0, warnings = 0;
const err = message => { console.error('FAIL:', message); errors++; };
const warn = message => { console.warn('WARN:', message); warnings++; };
const check = (condition, description) => condition ? console.log('PASS:', description) : err(description);
const present = p => fs.existsSync(path.join(root,p));
const text = p => fs.readFileSync(path.join(root,p),'utf8');
const json = p => JSON.parse(text(p));

const required = [
  'CNAME','index.html','apps/index.html','apps/store.html','apps/my-space.html',
  'apps/catalog.html','apps/store-registry.json','data/space-asset-inventory-2026.json',
  'apps/sdk/virtura-app.schema.json','docs/pm/tasks.json','AGENTS.md',
];
for(const f of required) check(present(f), 'required file: '+f);
if(errors) process.exit(1);

check(text('CNAME').trim()==='virtura.space','canonical CNAME remains virtura.space');

const home=text('index.html');
for(const id of ['top','universes','capabilities','work','delivery','workflow','studio','people','project-inquiry']){
  check(home.includes('id="'+id+'"'),'preserve homepage anchor #'+id);
}
check(home.includes('href="apps/"'),'homepage retains Space route');
check(home.includes('id="sihui-xu"'),'homepage keeps Sihui Xu entry');

const atlas=json('data/space-asset-inventory-2026.json');
const store=json('apps/store-registry.json');
const queue=json('docs/pm/tasks.json');

function duplicates(ids){return ids.filter((x,i)=>ids.indexOf(x)!==i)}
check(Array.isArray(atlas.items)&&atlas.items.length>0,'asset inventory nonempty');
check(Array.isArray(store.apps)&&store.apps.length>0,'curated app registry nonempty');
check(!duplicates(atlas.items.map(a=>a.id)).length,'asset inventory IDs unique');
check(!duplicates(store.apps.map(a=>a.id)).length,'curated app IDs unique');
const https=url=>typeof url==='string'&&url.startsWith('https://');
check(atlas.items.every(a=>a.id&&a.title&&https(a.url)&&a.repository),'all asset records have ID/title/HTTPS URL/repository');
check(store.apps.every(a=>a.id&&a.title&&https(a.url)&&a.kind&&a.repo),'all curated apps have ID/title/HTTPS URL/category/repository');
check(atlas.items.every(a=>a.liveVerified!==true||a.verificationEvidence),'liveVerified requires evidence URI');
check(store.apps.every(a=>a.deviceVerified!==true||a.deviceTestEvidence),'deviceVerified requires real evidence URI');
check(text('apps/index.html').includes('href="store.html"'),'legacy Space entry still leads to curated store');
check(text('apps/index.html').includes('href="catalog.html"'),'legacy Space entry still leads to Atlas');
check(text('apps/store.html').includes("fetch('store-registry.json'"),'store consumes curated registry');
check(text('apps/my-space.html').includes("fetch('store-registry.json'"),'My Space consumes curated registry');
check(text('apps/store.html').includes('virtura.spaces.saved.v1')&&text('apps/my-space.html').includes('virtura.spaces.saved.v1'),'local save key consistent across store and My Space');

check(Array.isArray(queue.tasks)&&queue.tasks.length===10,'task manifest contains 10 program research tracks');
check(!duplicates(queue.tasks.map(t=>t.id)).length,'task IDs unique');
const taskIds=new Set(queue.tasks.map(t=>t.id));
check(queue.tasks.every(t=>Array.isArray(t.dependencies)&&t.dependencies.every(id=>taskIds.has(id))),'all dependencies refer to known tasks');
check(queue.tasks.every(t=>['QUEUED','READY','IN_PROGRESS','IN_REVIEW','BLOCKED','DONE'].includes(t.status)),'task statuses from controlled vocabulary');
check(queue.tasks.every(t=>t.status!=='READY'||t.dependencies.every(id=>queue.tasks.find(z=>z.id===id).status==='DONE')),'READY tasks have completed prerequisites');
check(queue.tasks.every(t=>t.status!=='DONE'||(Array.isArray(t.evidenceLinks)&&t.evidenceLinks.length>0)),'DONE tasks link actual evidence');

for(const p of ['index.html','apps/index.html','apps/store.html','apps/my-space.html','apps/catalog.html']){
  const html=text(p), srcs=[...html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/g)].map(x=>x[1]);
  for(const src of srcs){
    if(/^(https?:|data:|\/\/)/.test(src))continue;
    let normalized=decodeURIComponent(src.split(/[?#]/)[0]);
    if(normalized.startsWith('/')) normalized=normalized.slice(1);
    else normalized=path.posix.normalize(path.posix.join(path.posix.dirname(p),normalized));
    if(!present(normalized))warn('unresolved referenced image: '+p+' → '+src+' ('+normalized+')');
  }
}
console.log('\nStatic source gate:', errors, 'errors;', warnings, 'media warnings.');
console.log('Browser visual QA, external app runtime, Cloudflare deployment and device XR checks are separate required release gates.');
process.exit(errors?1:0);
