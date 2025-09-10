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
});

