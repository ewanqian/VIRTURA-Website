(() => {
  const root = document.documentElement;
  const storageKey = 'virtura-language';
  const valid = new Set(['zh', 'en']);
  // Shared static-site bootstrap. The stylesheet is scoped to homepage IDs.
  const scriptUrl = document.currentScript?.src;
  if (scriptUrl && !document.querySelector('link[data-home-responsive]')) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = new URL('home-responsive-fixes.css', scriptUrl).href;
    stylesheet.dataset.homeResponsive = '';
    document.head.append(stylesheet);
  }
  const readStored = () => {
    try { return localStorage.getItem(storageKey); } catch (_) { return null; }
  };
  const writeStored = (value) => {
    try { localStorage.setItem(storageKey, value); } catch (_) {}
  };
  const stored = readStored();
  const initial = valid.has(stored) ? stored : 'zh';
  function applyLanguage(lang) {
    const next = valid.has(lang) ? lang : 'zh';
    root.dataset.lang = next;
    root.lang = next === 'zh' ? 'zh-CN' : 'en';
    writeStored(next);
    document.querySelectorAll('[data-set-lang]').forEach((button) => {
      const active = button.dataset.setLang === next;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    const title = root.dataset[next === 'zh' ? 'titleZh' : 'titleEn'];
    const description = root.dataset[next === 'zh' ? 'descriptionZh' : 'descriptionEn'];
    if (title) document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
  }
  applyLanguage(initial);
  document.querySelectorAll('[data-set-lang]').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.setLang));
  });
})();
