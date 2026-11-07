(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const root = $('map-nodes');
  const lines = $('route-lines');
  const langButton = $('lang-switch');
  let worlds = [];
  let language = 'zh';
  let selected = 'arrival';
  const NS = 'http://www.w3.org/2000/svg';
  const labels = {
    zh: {prototype:'灰盒原型', 'web-archive':'网页档案', warning:'站点地址已归档，实际上线待验证',
      unavailable:'地图资料暂不可读取。', unavailableAction:'访问原 SpacePort'},
    en: {prototype:'PROTOTYPE','web-archive':'WEB ARCHIVE',warning:'Routes are from source; public availability requires QA.',
      unavailable:'Map registry could not be loaded.',unavailableAction:'Open original SpacePort'}
  };
  const name = w => w.name[language];
  const text = value => value && typeof value === 'object' ? value[language] : String(value || '');

  function updateLanguage() {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    langButton.textContent = language === 'zh' ? 'EN / 中' : '中 / EN';
    document.querySelectorAll('[data-zh][data-en]').forEach(el => {
      el.textContent = el.dataset[language];
    });
    for (const w of worlds) {
      const btn = root.querySelector('[data-id="'+w.id+'"]');
      if (!btn) continue;
      btn.querySelector('.node-name').textContent = name(w);
      btn.setAttribute('aria-label', language === 'zh' ? ('选择'+name(w)+'，'+text(w.type)) : ('Select '+name(w)+', '+text(w.type)));
    }
    drawSelection(false);
  }

  function addSVG(name, attrs, parent) {
    const element = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, String(value)));
    parent.appendChild(element);
    return element;
  }

  // Routes are curated from station-manifest relationships, NOT geographic coordinates.
  // Visual positions are normalized editorial diagram coordinates.
  function drawRoutes(activeId) {
    lines.replaceChildren();
    const unique = new Set();
    const byId = new Map(worlds.map(w => [w.id,w]));
    for (const w of worlds) {
      for (const target of w.related) {
        const v = byId.get(target);
        if (!v) continue;
        const key = [w.id,v.id].sort().join('~');
        if (unique.has(key)) continue;
        unique.add(key);
        const midx=(w.x+v.x)/2, midy=(w.y+v.y)/2;
        const bend=(Math.abs(w.x-v.x)>18 ? -4 : 3);
        const path = addSVG('path', {
          d:'M '+w.x+' '+w.y+' Q '+midx+' '+(midy+bend)+' '+v.x+' '+v.y,
          class:'route'+((w.id===activeId||v.id===activeId)?' is-active':'')
        },lines);
        path.setAttribute('aria-hidden','true');
      }
    }
  }

  function makeButton(world, index) {
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='node';
    btn.dataset.id=world.id;
    btn.dataset.size=world.size || 'standard';
    btn.style.setProperty('--x',world.x+'%');
    btn.style.setProperty('--y',world.y+'%');
    btn.setAttribute('aria-pressed','false');
    const disc=document.createElement('span');disc.className='node-disc';disc.setAttribute('aria-hidden','true');
    const code=document.createElement('span');code.className='node-core';code.textContent=world.code;disc.appendChild(code);
    const title=document.createElement('span');title.className='node-name';title.textContent=name(world);
    btn.append(disc,title);
    btn.setAttribute('aria-label','选择'+name(world)+'，'+world.type.zh);
    btn.addEventListener('click',()=>select(world.id,true));
    btn.addEventListener('keydown',e=>{
      if(!['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(e.key))return;
      e.preventDefault();
      let next=index;
      if(e.key==='Home')next=0;
      else if(e.key==='End')next=worlds.length-1;
      else next=(index + (e.key==='ArrowRight'||e.key==='ArrowDown'?1:-1)+worlds.length)%worlds.length;
      root.querySelector('[data-id="'+worlds[next].id+'"]')?.focus();
    });
    return btn;
  }

  function drawSelection(updateHistory) {
    const world=worlds.find(w=>w.id===selected);
    if (!world) return;
    root.querySelectorAll('.node').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.id===selected)));
    drawRoutes(selected);
    $('inspect-title').textContent = name(world);
    $('station-type').textContent = text(world.type);
    $('station-copy').textContent = text(world.description);
    $('station-code').textContent = world.code+' / SPACEPORT';
    $('station-status').textContent = labels[language][world.mode] || world.mode;
    $('inspect-img').src = world.image;
    $('inspect-img').alt = language==='zh' ? name(world)+' 的现有项目图像' : 'Existing visual for '+name(world);
    $('photo-label').textContent=world.code+' / '+world.id.toUpperCase();
    $('enter-link').href='./station.html?id='+encodeURIComponent(selected)+'&lang='+language;
    $('source-link').href=world.siteUrl;
    $('source-link').setAttribute('aria-label',language==='zh'?'打开'+name(world)+'的已有站点网页':'Open existing site for '+name(world));
    $('status-foot').textContent=labels[language].warning;
    if(updateHistory){
      const url=new URL(location.href);url.searchParams.set('station',selected);url.searchParams.set('lang',language);
      history.pushState({station:selected},'',url);
    }
  }

  function select(id,record) {
    if(!worlds.some(w=>w.id===id))return;
    selected=id;
    drawSelection(record);
  }

  langButton.addEventListener('click',()=>{
    language=language==='zh'?'en':'zh';updateLanguage();
    const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState({station:selected},'',url);
  });
  window.addEventListener('popstate',()=>{
    const params=new URLSearchParams(location.search);
    selected=worlds.some(w=>w.id===params.get('station'))?params.get('station'):'arrival';
    if(params.get('lang')==='en'||params.get('lang')==='zh')language=params.get('lang');
    updateLanguage();
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape' && worlds.length && selected!=='arrival'){
      select('arrival',true);
      root.querySelector('[data-id="arrival"]')?.focus();
    }
  });

  fetch('./worlds.json',{cache:'no-cache'}).then(r=>{
    if(!r.ok)throw Error('HTTP '+r.status);
    return r.json();
  }).then(data=>{
    if(!data || !Array.isArray(data.worlds) || !data.worlds.length)throw Error('Empty world registry');
    worlds=data.worlds;
    const params=new URLSearchParams(location.search);
    if(params.get('lang')==='en')language='en';
    selected=worlds.some(w=>w.id===params.get('station'))?params.get('station'):(data.defaultWorld||'arrival');
    root.replaceChildren(...worlds.map(makeButton));
    $('station-count').textContent=String(worlds.length).padStart(2,'0');
    updateLanguage();
  }).catch(err=>{
    root.innerHTML=''; // no dynamic user HTML; error text is inserted below
    const fallback=document.createElement('div');fallback.className='error';
    const p=document.createElement('p');p.textContent=labels[language].unavailable;
    const a=document.createElement('a');a.href='https://spaceport.virtura.space/';a.textContent=labels[language].unavailableAction;
    a.style.textDecoration='underline';fallback.append(p,a);root.append(fallback);
    console.warn('SpacePort map data error:',err.message);
  });
})();
