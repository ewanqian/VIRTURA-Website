#!/usr/bin/env node
// Read-only acceptance for the six biographies; never submits the inquiry form.
import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import {pathToFileURL} from 'node:url'
import {createHash} from 'node:crypto'
const {chromium}=await import(process.env.QA_PLAYWRIGHT?pathToFileURL(process.env.QA_PLAYWRIGHT).href:'playwright')
const origin=(process.env.QA_ORIGIN||'http://127.0.0.1:4174').replace(/\/$/,'')
const dir=path.resolve(process.env.QA_ARTIFACT_DIR||'qa-artifacts/team-preview')
fs.mkdirSync(dir,{recursive:true})
const report={at:new Date().toISOString(),origin,commit:process.env.GITHUB_SHA,samples:[],passed:false,limitations:['Chromium only','No form submission or mailbox receipt test','Screenshots require visual review']}
let browser
try{
 browser=await chromium.launch({headless:true})
 for(const lang of ['zh','en'])for(const width of [375,768,1440]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'})
  await context.addInitScript(l=>localStorage.setItem('virtura-language',l),lang)
  const page=await context.newPage();page.setDefaultTimeout(25000)
  const errors=[];page.on('pageerror',e=>errors.push(e.message))
  const response=await page.goto(origin+'/?team-release='+encodeURIComponent(process.env.GITHUB_SHA||'local')+'#people',{waitUntil:'networkidle'})
  assert.equal(response.status(),200)
  await page.locator('#people .person').first().waitFor()
  assert.equal(await page.locator('#people .person').count(),6)
  assert.equal(await page.locator('.project-grid .project').count(),7)
  const text=await page.locator('#people').innerText()
  assert.ok(!/合作艺术家|Collaborating Artist|分别署名|separately credited/.test(text),'remove relationship disclaimers from biographies')
  assert.match(text,lang==='zh'?/媒体艺术 \/ 交互设计/:/Media Art \/ Interaction Design/)
  assert.match(text,lang==='zh'?/数字影像 \/ 沉浸式艺术/:/Digital Moving Image \/ Immersive Art/)
  assert.equal(await page.locator('#sihui-xu .person-name a').getAttribute('href'),'https://xusihui.com/')
  assert.equal(await page.locator('#xiaoyao-ma .person-name a').getAttribute('href'),'https://xiaoyaoma.com/')
  await page.locator('#people img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'))
  const images=await page.locator('#people .person img').evaluateAll(async imgs=>Promise.all(imgs.map(async img=>{await img.decode();return{src:img.currentSrc,width:img.naturalWidth,height:img.naturalHeight}})))
  assert.equal(images.length,6);assert.ok(images.every(i=>i.width>0&&i.height>0))
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2)
  assert.equal(overflow,false,'horizontal overflow '+width+' '+lang)
  const cards=await page.locator('#people .person').evaluateAll(els=>els.map(e=>({id:e.id,width:e.clientWidth,scrollWidth:e.scrollWidth})))
  assert.ok(cards.every(c=>c.scrollWidth<=c.width+2),'card content overflow '+JSON.stringify(cards))
  await page.locator('#people').screenshot({path:path.join(dir,`team-${lang}-${width}.png`),animations:'disabled'})
  const other=lang==='zh'?'en':'zh'
  await page.locator(`[data-set-lang="${other}"]`).click()
  await page.waitForFunction(l=>document.documentElement.lang===(l==='zh'?'zh-CN':'en'),other)
  assert.match(await page.locator('#sihui-xu').innerText(),other==='zh'?/媒体艺术家/:/media artist/i)
  assert.deepEqual(errors,[])
  report.samples.push({lang,width,images,cards,errors,passed:true})
  console.log('TEAM SAMPLE PASS',lang,width)
  await context.close()
 }
 // Byte comparison confirms the supplied portrait is actually served, not a broken fallback.
 const bytes=Buffer.from(await(await fetch(origin+'/assets/people/xiaoyao-ma.jpg')).arrayBuffer())
 const source=fs.readFileSync('assets/people/xiaoyao-ma.jpg')
 const hash=b=>createHash('sha256').update(b).digest('hex')
 assert.equal(hash(bytes),hash(source),'portrait delivery must match repository asset')
 report.portrait={bytes:bytes.length,sha256:hash(bytes),matched:true}
 report.passed=true
 console.log('TEAM ACCEPTANCE PASS',JSON.stringify({samples:report.samples.length,portraits:6,portraitSha256:report.portrait.sha256}))
}catch(e){report.error=e.stack||String(e);console.error(report.error);process.exitCode=1}
finally{fs.writeFileSync(path.join(dir,'report.json'),JSON.stringify(report,null,2)+'\n');await browser?.close()}
