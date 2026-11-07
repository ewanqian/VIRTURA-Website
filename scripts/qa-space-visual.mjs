#!/usr/bin/env node
// Browser QA: local static server + Playwright. Run only with a real installed browser.
// Screenshots are CI artifacts; do not add large screenshot files to Git history.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
const origin=process.env.SPACE_TEST_ORIGIN || 'http://127.0.0.1:8844';
const out=process.env.SPACE_QA_ARTIFACTS || 'artifacts/space-map';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
try {
  for(const [width,height] of [[375,812],[768,1024],[1440,900]]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',err=>errors.push('pageerror '+err.message));
    page.on('console',msg=>{if(msg.type()==='error')errors.push('console '+msg.text())});
    const nav=await page.goto(origin+'/space/',{waitUntil:'networkidle'});
    assert.equal(nav.status(),200,'map should be served');
    await page.locator('.node[data-id="balloon"]').waitFor({state:'visible'});
    assert.equal(await page.locator('.node').count(),6,'six space nodes rendered');
    const nodes=await page.locator('.node').allTextContents();
    assert(nodes.some(t=>t.includes('太空气球')),'Balloon must have a descriptive Chinese label');
    await page.screenshot({path:out+'/map-'+width+'.png',fullPage:true});

    // Visitor journey: select → inspect → enter → return with selected context.
    await page.locator('.node[data-id="balloon"]').click();
    assert.match(await page.locator('#inspect-title').textContent(),/太空气球/);
    assert.match(await page.locator('#station-type').textContent(),/视听展演/);
    assert.equal(await page.locator('.node[data-id="balloon"]').getAttribute('aria-pressed'),'true');
    assert.match(await page.locator('#source-link').getAttribute('href'),/\/stations\/balloon-live-space\/index\.html$/);
    await page.screenshot({path:out+'/selected-balloon-'+width+'.png',fullPage:true});

    await page.locator('#enter-link').click();
    await page.waitForURL('**/space/station.html?id=balloon*');
    assert.match(await page.locator('#station-name').textContent(),/太空气球/);
    assert.match(await page.locator('#station-role').textContent(),/视听展演/);
    await page.screenshot({path:out+'/station-balloon-'+width+'.png',fullPage:true});
    await page.locator('#return-overlay').click();
    await page.locator('.node[data-id="balloon"]').waitFor({state:'visible'});
    assert.equal(await page.locator('.node[data-id="balloon"]').getAttribute('aria-pressed'),'true','return retains selected node');

    // Language and keyboard control are part of the shared route shell.
    await page.locator('#lang-switch').click();
    assert.match(await page.locator('#inspect-title').textContent(),/Balloon Live Space/);
    assert.match(await page.locator('#station-type').textContent(),/Live audiovisual performance/);
    const a=page.locator('.node[data-id="balloon"]');
    await a.focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.evaluate(()=>document.activeElement?.dataset?.id),'teahouse','arrow moves focus in node order');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.node[data-id="arrival"]').getAttribute('aria-pressed'),'true','escape returns to arrival');
    const metrics=await page.evaluate(()=>({
      docWidth:document.documentElement.scrollWidth,
      viewport:window.innerWidth,
      readyImg:document.getElementById('inspect-img')?.naturalWidth>0
    }));
    assert(metrics.docWidth<=metrics.viewport+2,'no horizontal overflow at '+width+'px, got '+JSON.stringify(metrics));
    assert(metrics.readyImg,'station poster image decoded');
    assert.equal(errors.length,0,'no browser runtime errors: '+errors.join('; '));
    results.push({width,height,paths:'map → select Balloon → station → map',locale:'zh/en',result:'PASS',posters:'decoded',overflow:false});
    await page.close();
  }
  console.log(JSON.stringify(results,null,2));
} finally {
  await browser.close();
}
