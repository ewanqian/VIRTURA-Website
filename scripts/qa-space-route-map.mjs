#!/usr/bin/env node
// VIRTURA SpacePort route proof: deterministic source-level validation.
// Does not establish Cloudflare HTTP availability, accessibility or visual quality.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const here=process.cwd(), space=path.join(here,'space');
const source=JSON.parse(fs.readFileSync(path.join(space,'worlds.json'),'utf8'));
const read=name=>fs.readFileSync(path.join(space,name),'utf8');
const fail=msg=>{throw new Error('SPACE ROUTE GATE: '+msg)};
assert.equal(source.schemaVersion,'1.0.0');
assert.match(source.coordinateDisclaimer,/not measured geography/i);
assert.equal(source.sourceOfTruth.stationManifest,'stations/frontstage-manifest.json');
const worlds=source.worlds;
assert(worlds.length>=5 && worlds.length<=12,'small curated world set');
const ids=new Set(worlds.map(w=>w.id));
assert.equal(ids.size,worlds.length,'unique world identifiers');
assert(ids.has(source.defaultWorld),'default destination exists');
const usedCoordinates=new Set();
for(const w of worlds){
  if(!/^[a-z][a-z0-9-]*$/.test(w.id))fail('invalid id '+w.id);
  if(!/^([AF]\d\d)$/.test(w.code))fail('invalid station code '+w.code);
  if(!['prototype','web-archive','verified-interactive'].includes(w.mode))fail('invalid publication state '+w.id);
  if(!(w.x>=8 && w.x<=92 && w.y>=15 && w.y<=87))fail('off-map position '+w.id);
  const pt=w.x+'-'+w.y;
  if(usedCoordinates.has(pt))fail('identical map coordinates '+pt);
  usedCoordinates.add(pt);
  for(const lang of ['zh','en']){
    for(const prop of ['name','type','description']){
      if(!w[prop]||!w[prop][lang]||typeof w[prop][lang]!=='string')fail('missing '+prop+'.'+lang+' on '+w.id);
    }
    if(!w.secondaryLabel||!w.secondaryLabel[lang])fail('missing secondary label '+w.id);
  }
  if(!Array.isArray(w.related)||w.related.some(x=>x===w.id||!ids.has(x)))fail('broken related station '+w.id);
  if(!/^https:\/\/spaceport\.virtura\.space\//.test(w.siteUrl))fail('unapproved site origin '+w.id);
  if(!/^https:\/\/spaceport\.virtura\.space\//.test(w.secondaryUrl))fail('unapproved secondary site origin '+w.id);
  if(!w.sourcePath||!w.sourcePath.includes('/'))fail('missing source provenance '+w.id);
  const poster=path.resolve(space,w.image);
  if(!poster.startsWith(path.resolve(here,'assets')+path.sep)||!fs.existsSync(poster))fail('missing, unsafe or untracked poster '+w.image);
}
const mapHtml=read('index.html'),stationHtml=read('station.html');
for(const id of ['map-nodes','route-lines','inspect-title','station-status','enter-link','source-link','lang-switch']){
  if(!mapHtml.includes('id="'+id+'"'))fail('map UI hook missing: '+id);
}
for(const id of ['station-image','station-name','station-primary','station-secondary','return-nav','return-overlay','lang-switch']){
  if(!stationHtml.includes('id="'+id+'"'))fail('station UI hook missing: '+id);
}
if(!mapHtml.includes('noindex,nofollow')||!stationHtml.includes('noindex,nofollow'))fail('preview must not be search indexed');
if(!read('map.js').includes("history.pushState")||!read('map.js').includes("popstate"))fail('selection history missing');
if(!read('station.js').includes("'./?station='"))fail('return to selected map node missing');
execFileSync(process.execPath,['--check',path.join(space,'map.js')],{stdio:'inherit'});
execFileSync(process.execPath,['--check',path.join(space,'station.js')],{stdio:'inherit'});
console.log('PASS: '+worlds.length+' grounded SpacePort station nodes, valid asset paths, route metadata and syntax.');
console.log('NOT TESTED HERE: external HTTP, Cloudflare preview, browser layout and keyboard user journey.');
