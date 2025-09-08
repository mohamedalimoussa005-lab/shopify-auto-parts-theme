(function() {
  function initCarousel(section) {
    var container = section.querySelector('.promo-carousel');
    if (!container) return;
    var slides = container.querySelector('.slides');
    var dots = container.querySelectorAll('.dot');
    var intervalMs = parseInt(container.getAttribute('data-interval') || '5000', 10);
    var autoplay = container.getAttribute('data-autoplay') === 'true';
    var index = 0;

    function goTo(i) {
      index = i % dots.length;
      slides.style.transform = 'translateX(' + (-index * 100) + '%)';
      dots.forEach(function(d, di) { d.classList.toggle('active', di === index); });
    }
    dots.forEach(function(dot, i) { dot.addEventListener('click', function(){ goTo(i); }); });
    if (autoplay && dots.length > 1) {
      setInterval(function(){ goTo(index + 1); }, intervalMs);
    }
  }

  function initPartsSearch(section) {
    var form = section.querySelector('form[data-parts-search]');
    if (!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var marque = form.querySelector('[name="marque"]').value;
      var modele = form.querySelector('[name="modele"]').value;
      var annee = form.querySelector('[name="annee"]').value;
      var typePiece = form.querySelector('[name="type_piece"]').value;
      var tags = [];
      if (marque) tags.push('marque_' + slugify(marque));
      if (modele) tags.push('modele_' + slugify(modele));
      if (annee) tags.push('annee_' + slugify(annee));
      if (typePiece) tags.push('type_' + slugify(typePiece));
      var path = '/collections/all';
      if (tags.length) path += '/' + tags.join('+');
      window.location.href = path;
    });
  }

  function slugify(text) {
    return (text || '')
      .toString()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')</n+      .replace(/^-+|-+$/g, '');
  }

  function initCollectionFilters(root) {
    var container = root.querySelector('[data-collection-filters]');
    if (!container) return;
    var form = container.querySelector('form');
    if (!form) return;

    form.addEventListener('change', function(){
      var checked = Array.prototype.slice.call(form.querySelectorAll('input[type="checkbox"]:checked'));
      var tags = checked.map(function(cb){ return cb.value; });
      var base = container.getAttribute('data-collection-url') || '/collections/all';
      var path = base;
      if (tags.length) path += '/' + tags.join('+');
      window.location.href = path;
    });
  }

  function initSections(scope) {
    scope = scope || document;
    scope.querySelectorAll('[data-section-type="promo-carousel"]').forEach(initCarousel);
    scope.querySelectorAll('[data-section-type="parts-search"]').forEach(initPartsSearch);
    initCollectionFilters(scope);
  }

  document.addEventListener('DOMContentLoaded', function(){ initSections(document); });
})();

