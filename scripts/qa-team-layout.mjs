// Collect diagnostics before assertions so a failed layout remains inspectable.
import fs from 'node:fs'
import {pathToFileURL} from 'node:url'
const {chromium}=await import(pathToFileURL(process.env.QA_PLAYWRIGHT).href)
const dir='qa-artifacts/team-layout';fs.mkdirSync(dir,{recursive:true})
const browser=await chromium.launch({headless:true})
const results=[]
try{
 for(const lang of ['zh','en'])for(const width of [375,768,1440]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'})
  await context.addInitScript(l=>localStorage.setItem('virtura-language',l),lang)
  const page=await context.newPage()
  await page.goto('http://127.0.0.1:4174/#people',{waitUntil:'networkidle'})
  await page.locator('#people img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'))
  await page.locator('#people .person img').evaluateAll(async imgs=>Promise.all(imgs.map(i=>i.decode())))
  const layout=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,elements:[...document.querySelectorAll('body *')].map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {tag:e.tagName,id:e.id,class:e.className,text:e.innerText?.slice(0,70),left:r.left,right:r.right,width:r.width,overflow:s.overflowX,display:s.display}}).filter(e=>e.display!=='none'&&(e.right>innerWidth+2||e.left< -2)).slice(0,100)}))
  results.push({lang,width,...layout})
  await page.locator('#people').screenshot({path:`${dir}/team-${lang}-${width}.png`,animations:'disabled'})
  await page.screenshot({path:`${dir}/viewport-${lang}-${width}.png`,animations:'disabled'})
  await context.close()
 }
}finally{fs.writeFileSync(`${dir}/diagnostics.json`,JSON.stringify(results,null,2));await browser.close()}
