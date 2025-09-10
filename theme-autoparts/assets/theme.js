// Predictive search (basic)
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('#predictive-search-input');
  const results = document.querySelector('#predictive-results');
  if (searchInput && results) {
    let controller;
    const renderResults = (items) => {
      results.innerHTML = items
        .map(({ title, url }) => `<a class="result-item" href="${url}">${title}</a>`) // eslint-disable-line max-len
        .join('');
      results.classList.toggle('active', items.length > 0);
    };
    const fetchResults = async (q) => {
      try {
        if (controller) controller.abort();
        controller = new AbortController();
        const resp = await fetch(`/search/suggest.json?q=${encodeURIComponent(q)}&resources[type]=product,collection,article&page_limit=4`, { signal: controller.signal });
        const data = await resp.json();
        const items = [];
        if (data.resources) {
          ['results', 'products', 'collections', 'articles', 'pages'].forEach((key) => {
            const res = data.resources[key] || data[key];
            if (res && Array.isArray(res)) {
              res.slice(0, 4).forEach((r) => items.push({ title: r.title || r.name, url: r.url }));
            }
          });
        }
        renderResults(items);
      } catch (e) {
        // Silent fail (offline dev or API disabled)
        results.classList.remove('active');
      }
    };
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      if (q.length < 2) { results.classList.remove('active'); results.innerHTML = ''; return; }
      fetchResults(q);
    });
    document.addEventListener('click', (e) => {
      if (!results.contains(e.target) && e.target !== searchInput) {
        results.classList.remove('active');
      }
    });
  }

  // Floating chat toggle
  const chatToggle = document.querySelector('.chat-toggle');
  const chatPanel = document.querySelector('#chat-panel');
  if (chatToggle && chatPanel) {
    chatToggle.addEventListener('click', () => {
      const expanded = chatToggle.getAttribute('aria-expanded') === 'true';
      chatToggle.setAttribute('aria-expanded', String(!expanded));
      chatPanel.hidden = expanded;
    });
  }

  // Simple client-side product filtering (vendor/type/price/rating)
  const filterRoot = document.querySelector('[data-filters-root]');
  if (filterRoot) {
    const productCards = Array.from(document.querySelectorAll('[data-product-card]'));
    const matchers = {
      vendors: () => Array.from(filterRoot.querySelectorAll('[name="vendor"]:checked')).map(i => i.value),
      types: () => Array.from(filterRoot.querySelectorAll('[name="type"]:checked')).map(i => i.value),
      price: () => Number(filterRoot.querySelector('#price-range')?.value || 0),
      rating: () => Number(filterRoot.querySelector('#rating-min')?.value || 0)
    };
    const applyFilters = () => {
      const vendors = matchers.vendors();
      const types = matchers.types();
      const maxPrice = matchers.price();
      const minRating = matchers.rating();
      productCards.forEach(card => {
        const vendor = card.getAttribute('data-vendor');
        const type = card.getAttribute('data-type');
        const price = Number(card.getAttribute('data-price'));
        const rating = Number(card.getAttribute('data-rating'));
        const vendorOk = vendors.length === 0 || vendors.includes(vendor);
        const typeOk = types.length === 0 || types.includes(type);
        const priceOk = maxPrice === 0 || price <= maxPrice;
        const ratingOk = rating >= minRating;
        const visible = vendorOk && typeOk && priceOk && ratingOk;
        card.style.display = visible ? '' : 'none';
      });
    };
    filterRoot.addEventListener('change', applyFilters);
    applyFilters();
  }

  // Init extras
  initCarousel();
  initWishlist();
  initFitment();
});

// Wishlist (localStorage)
const Wishlist = {
  key: 'ap_wishlist',
  get() { try { return JSON.parse(localStorage.getItem(this.key) || '[]'); } catch(e){ return []; } },
  set(list) { localStorage.setItem(this.key, JSON.stringify(list)); },
  has(handle) { return this.get().includes(handle); },
  toggle(handle) { const list = this.get(); const i = list.indexOf(handle); if (i>-1) list.splice(i,1); else list.push(handle); this.set(list); document.dispatchEvent(new CustomEvent('wishlist:update')); }
};

function initWishlist(){
  document.querySelectorAll('[data-wishlist]')?.forEach(btn=>{
    const handle = btn.getAttribute('data-handle');
    const set = ()=> btn.classList.toggle('active', Wishlist.has(handle));
    set();
    btn.addEventListener('click', (e)=>{ e.preventDefault(); Wishlist.toggle(handle); set(); });
  });
  const grid = document.querySelector('#WishlistGrid');
  if (grid){
    const handles = Wishlist.get();
    if (handles.length === 0){ grid.innerHTML = '<p>Votre liste est vide.</p>'; return; }
    Promise.all(handles.map(h=>fetch(`/products/${h}.js`).then(r=>r.json()))).then(products=>{
      grid.innerHTML = products.map(p=>`
        <article class="card">
          <a class="media" href="/products/${p.handle}"><img src="${p.images[0] || ''}" alt="${p.title}"></a>
          <div style="font-weight:600">${p.title}</div>
          <div class="price">${(p.price/100).toLocaleString('fr-FR',{style:'currency',currency:'EUR'})}</div>
          <div class="quick-actions"><button class="icon-btn active" data-wishlist data-handle="${p.handle}">❤</button></div>
        </article>`).join('');
      initWishlist();
    });
  }
}

function initCarousel(){
  document.querySelectorAll('.carousel').forEach(carousel=>{
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    if(!track || slides.length < 2) return;
    let i = 0;
    const go = (n)=>{ i = (n+slides.length) % slides.length; track.style.transform = `translateX(-${i*100}%)`; };
    setInterval(()=>go(i+1), 6000);
  });
}

// Fitment (Make/Model/Year)
function initFitment(){
  const data = (window.__FITMENT__ && window.__FITMENT__.data) || null;
  const form = document.querySelector('#fitment-form');
  if(!form || !data) return;
  const selMake = document.querySelector('#fitment-make');
  const selModel = document.querySelector('#fitment-model');
  const selYear = document.querySelector('#fitment-year');
  const applyBtn = document.querySelector('#fitment-apply');
  selMake.addEventListener('change', ()=>{
    const make = selMake.value; selModel.innerHTML = '<option value="">Sélectionner</option>'; selModel.disabled = !make; selYear.disabled = true; selYear.innerHTML = '<option value="">—</option>';
    if(make){ Object.keys(data[make]||{}).forEach(m=>{ const o=document.createElement('option'); o.value=m; o.textContent=m; selModel.appendChild(o); }); }
  });
  selModel.addEventListener('change', ()=>{
    const make = selMake.value; const model = selModel.value; selYear.innerHTML = '<option value="">Sélectionner</option>'; selYear.disabled = !model;
    if(model){ (data[make]?.[model]||[]).forEach(y=>{ const o=document.createElement('option'); o.value=y; o.textContent=y; selYear.appendChild(o); }); }
  });
  selYear.addEventListener('change', ()=>{ applyBtn.disabled = !(selMake.value && selModel.value && selYear.value); });
  applyBtn.addEventListener('click', ()=>{
    const query = `${selMake.value}|${selModel.value}|${selYear.value}`.toLowerCase();
    document.querySelectorAll('[data-product-card]')?.forEach(card=>{
      const fit = (card.getAttribute('data-fitment')||'').toLowerCase();
      card.style.display = fit.includes(query) ? '' : 'none';
    });
  });
}

