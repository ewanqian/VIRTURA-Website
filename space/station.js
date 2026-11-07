(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const params=new URLSearchParams(location.search);
  let language=params.get('lang')==='en'?'en':'zh';
  let world=null;
  const t=data=>data && typeof data==='object' ? data[language] : String(data||'');
  function setLanguage(){
    document.documentElement.lang=language==='zh'?'zh-CN':'en';
    $('lang-switch').textContent=language==='zh'?'EN / 中':'中 / EN';
    document.querySelectorAll('[data-zh][data-en]').forEach(x=>x.textContent=x.dataset[language]);
    if(!world)return;
    $('station-name').textContent=t(world.name);
    $('station-role').textContent=t(world.type);
    $('station-description').textContent=t(world.description);
    $('station-primary').setAttribute('aria-label',(language==='zh'?'打开':'Open ')+t(world.name));
    document.title=t(world.name)+' — VIRTURA SpacePort';
    const dest='./?station='+encodeURIComponent(world.id)+'&lang='+language;
    $('return-nav').href=dest;
    $('return-overlay').href=dest;
    $('station-secondary').href=dest;
    const u=new URL(location.href);u.searchParams.set('lang',language);history.replaceState(null,'',u);
  }
  $('lang-switch').addEventListener('click',()=>{language=language==='zh'?'en':'zh';setLanguage()});
  fetch('./worlds.json',{cache:'no-cache'}).then(r=>{
    if(!r.ok)throw Error('HTTP '+r.status);return r.json();
  }).then(data=>{
    const id=params.get('id');
    world=data.worlds.find(w=>w.id===id) || data.worlds.find(w=>w.id===data.defaultWorld);
    if(!world)throw Error('No valid destination');
    $('station-image').src=world.image;
    $('station-image').alt=(language==='zh'?'站点图像：':'Station image: ')+t(world.name);
    $('station-path').textContent='SPACEPORT / '+world.code+' / '+world.id.toUpperCase();
    $('station-primary').href=world.siteUrl;
    $('station-proof').textContent=world.mode==='prototype'?'PROTOTYPE · SOURCE-BASED ROUTE':'WEB ARCHIVE · PUBLIC ROUTE NEEDS QA';
    if(world.secondaryUrl){
      const anchor=$('station-secondary');
      anchor.href=world.secondaryUrl;
      anchor.target='_blank';anchor.rel='noopener noreferrer';
      anchor.dataset.zh=world.secondaryLabel.zh;anchor.dataset.en=world.secondaryLabel.en;
      anchor.innerHTML='';
      const span=document.createElement('span');span.dataset.zh=world.secondaryLabel.zh;span.dataset.en=world.secondaryLabel.en;span.textContent=world.secondaryLabel.zh;
      const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');
      anchor.append(span,arrow);
    }
    setLanguage();
  }).catch(err=>{
    $('station-name').textContent=language==='zh'?'站点暂不可读取':'Station unavailable';
    $('station-role').textContent=language==='zh'?'仍可返回地图。':'Return to the map.';
    $('station-description').textContent='';
    $('station-primary').hidden=true;
    $('station-secondary').href='./';
    console.warn('Station registry error:',err.message);
  });
})();