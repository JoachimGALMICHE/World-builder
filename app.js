/* ============================================================
   CODEX — moteur de rendu partagé (chargé après shared/data.js)
   ============================================================ */

function esc(str) {
  return String(str == null ? '' : str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function icon(name, size, cls) {
  return `<i data-lucide="${name}" class="${cls || ''}" style="width:${size}px;height:${size}px"></i>`;
}
function refreshIcons() { if (window.lucide) window.lucide.createIcons(); }

const State = { category: null, geoPath: [], selectedId: null, linkSearch: '', query: '', chronoView: 'frise' };

function isGeoEntity(e) { return !!e.geoLevel; }
function levelOf(e) { return GEO_LEVELS[e.geoLevel]; }

function summaryOf(entity) {
  return entity.fields.description || entity.fields.type || Object.values(entity.fields).find(Boolean) || '';
}

function chronoSortValue(node) {
  const f = node.fields;
  const raw = node.geoLevel === 'epoque' ? f.date_debut : node.geoLevel === 'evenement' ? f.date : f.naissance;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
}

/* ---------------- Cartes ---------------- */

function cardHtml(entity) {
  const cat = catOf(entity.category);
  const geo = isGeoEntity(entity);
  const level = geo ? levelOf(entity) : null;
  const iconName = geo ? level.icon : cat.icon;
  const c = COLOR_MAP[cat.color];
  const summary = summaryOf(entity);
  return `
    <button data-open="${entity.id}" class="text-left w-full bg-[#3d1e17] hover:bg-[#2a1310] border border-[#5c2e22] border-l-4 ${c.left} rounded-r-lg rounded-l-sm p-4 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400/50">
      <div class="flex items-center gap-2 mb-1.5">
        ${icon(iconName, 14, c.text)}
        <h3 class="font-display text-base text-[#f5e6d3] truncate">${esc(entity.name || 'Sans nom')}</h3>
      </div>
      ${geo ? `<span class="text-xs font-mono uppercase tracking-wide text-[#9c7452]">${esc(level.label)}</span>` : ''}
      <p class="text-sm text-[#b8916a] truncate mt-0.5">${esc(summary || 'Aucune description.')}</p>
      ${entity.links.length ? `<div class="flex items-center gap-1 mt-3 text-xs text-[#9c7452]">${icon('link-2', 12)}<span class="font-mono">${entity.links.length} lien${entity.links.length > 1 ? 's' : ''}</span></div>` : ''}
    </button>`;
}

function geoCardHtml(node, navigable, color) {
  const level = levelOf(node);
  const summary = summaryOf(node);
  const thumb = node.fields.image;
  return `
    <button data-${navigable ? 'navigate' : 'open'}="${node.id}" class="text-left w-full bg-[#3d1e17] hover:bg-[#2a1310] border border-[#5c2e22] border-l-4 ${color.left} rounded-r-lg rounded-l-sm p-4 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400/50 flex items-start gap-3">
      ${thumb ? `<img src="${thumb}" class="w-10 h-10 rounded object-cover shrink-0" />` : `<div class="mt-0.5 ${color.text} shrink-0">${icon(level.icon, 16)}</div>`}
      <div class="flex-1 min-w-0">
        <span class="text-xs uppercase tracking-wide ${color.text} font-mono">${esc(level.label)}</span>
        <h3 class="font-display text-base text-[#f5e6d3] truncate">${esc(node.name)}</h3>
        <p class="text-sm text-[#b8916a] truncate mt-0.5">${esc(summary || 'Aucune description.')}</p>
      </div>
      ${navigable ? `<div class="text-[#9c7452] mt-1 shrink-0">${icon('chevron-right', 16)}</div>` : ''}
    </button>`;
}

function geoHeaderHtml(node, color) {
  const level = levelOf(node);
  return `
    <div class="mb-5 bg-[#2a1310] border border-[#5c2e22] rounded-lg p-4 flex items-start gap-3">
      ${node.fields.image ? `<img src="${node.fields.image}" class="w-12 h-12 rounded object-cover shrink-0" />` : `<div class="${color.text} mt-0.5 shrink-0">${icon(level.icon, 20)}</div>`}
      <div class="flex-1 min-w-0">
        <span class="text-xs uppercase tracking-wide ${color.text} font-mono">${esc(level.label)}</span>
        <h2 class="font-display text-xl text-[#f5e6d3]">${esc(node.name)}</h2>
        ${node.fields.description ? `<p class="text-sm text-[#cda87e] mt-1">${esc(node.fields.description)}</p>` : ''}
      </div>
      <button data-open="${node.id}" class="shrink-0 flex items-center gap-1 text-xs text-[#b8916a] hover:text-[#f0dcc4] bg-[#3d1e17] border border-[#6b3529] hover:border-[#8a4433] rounded-md px-2 py-1.5 transition-colors">
        ${icon('pencil', 12)} Éditer
      </button>
    </div>`;
}

function addChildBarHtml(childTypes, color) {
  if (!childTypes.length) return '';
  return `<div class="flex flex-wrap gap-2 mb-5">${childTypes.map((ct) => `
    <button data-add-child="${ct}" class="btn-flame flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md">
      ${icon('plus', 12)} ${esc(GEO_ADD_LABEL[ct])}
    </button>`).join('')}</div>`;
}

function timelineChainHtml(items, color) {
  return `<div class="flex flex-wrap items-center gap-x-1.5 gap-y-3">${items.map((node, idx) => {
    const level = levelOf(node);
    const dateLabel = node.geoLevel === 'epoque'
      ? [node.fields.date_debut, node.fields.date_fin].filter(Boolean).join(' – ')
      : node.geoLevel === 'evenement' ? node.fields.date : node.fields.naissance;
    const navigable = level.childTypes.length > 0;
    return `${idx > 0 ? `<div class="text-amber-300 shrink-0">${icon('arrow-right', 16)}</div>` : ''}
      <button data-${navigable ? 'navigate' : 'open'}="${node.id}" class="flex items-center gap-2 bg-[#3d1e17] border border-[#5c2e22] hover:${color.border} rounded-lg px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400/50">
        <div class="${color.text} shrink-0">${icon(level.icon, 14)}</div>
        <span class="flex flex-col items-start min-w-0">
          ${dateLabel ? `<span class="text-xs font-mono ${color.text}">${esc(dateLabel)}</span>` : ''}
          <span class="font-display text-sm text-[#f5e6d3] truncate max-w-xs">${esc(node.name)}</span>
        </span>
      </button>`;
  }).join('')}</div>`;
}

function emptyStateHtml(text) {
  return `<div class="flex flex-col items-center justify-center text-center py-24 text-[#9c7452]">${icon('compass', 28, 'mb-3 text-amber-300')}<p class="text-sm max-w-xs">${esc(text)}</p></div>`;
}

/* ---------------- Page principale (catégorie) ---------------- */

function renderSidebarCounts() {
  const counts = {};
  CATEGORIES.forEach((c) => (counts[c.key] = 0));
  Store.entities.forEach((e) => (counts[e.category] = (counts[e.category] || 0) + 1));
  document.querySelectorAll('[data-count-for]').forEach((el) => {
    el.textContent = counts[el.getAttribute('data-count-for')] || 0;
  });
}

function initCategoryPage(categoryKey) {
  State.category = categoryKey;
  const cat = catOf(categoryKey);
  const color = COLOR_MAP[cat.color];

  const searchInput = document.getElementById('search-input');
  const content = document.getElementById('content');
  const addBtn = document.getElementById('add-fiche-btn');
  const chronoToggle = document.getElementById('chrono-toggle');
  const isHier = !!HIERARCHY_ROOT[categoryKey];

  content.innerHTML = `<div class="text-sm text-[#b8916a] py-10 text-center">Connexion à Firestore…</div>`;

  if (isHier && addBtn) addBtn.classList.add('hidden');
  if (categoryKey === 'chronologie' && chronoToggle) chronoToggle.classList.remove('hidden');

  function filteredByCategory() { return Store.entities.filter((e) => e.category === categoryKey); }

  function searchResults() {
    if (!State.query.trim()) return null;
    const q = State.query.toLowerCase();
    return Store.entities.filter((e) => e.name.toLowerCase().includes(q) || Object.values(e.fields).some((v) => String(v).toLowerCase().includes(q)));
  }

  function render() {
    refreshIcons();
    const results = searchResults();
    if (results) {
      content.innerHTML = results.length === 0
        ? emptyStateHtml(`Aucun résultat pour « ${State.query} ».`)
        : `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">${results.map(cardHtml).join('')}</div>`;
      refreshIcons();
      return;
    }

    if (isHier) {
      const rootLevel = HIERARCHY_ROOT[categoryKey];
      const parentId = State.geoPath.length ? State.geoPath[State.geoPath.length - 1] : null;
      const currentNode = parentId ? Store.entities.find((e) => e.id === parentId) : null;
      const children = Store.entities.filter((e) => e.category === categoryKey && (e.parentId || null) === parentId);
      const allowedChildTypes = currentNode ? GEO_LEVELS[currentNode.geoLevel].childTypes : [rootLevel];

      let breadcrumb = `<div class="flex items-center flex-wrap gap-1 text-xs text-[#b8916a] mb-4">
        <button data-crumb="-1" class="hover:text-[#f0dcc4] ${State.geoPath.length === 0 ? color.text : ''}">${esc(HIERARCHY_ROOT_LABEL[categoryKey])}</button>`;
      State.geoPath.forEach((id, idx) => {
        const node = Store.entities.find((e) => e.id === id);
        if (!node) return;
        breadcrumb += `<div class="text-amber-300">${icon('chevron-right', 12)}</div><button data-crumb="${idx}" class="hover:text-[#f0dcc4] ${idx === State.geoPath.length - 1 ? color.text : ''}">${esc(node.name)}</button>`;
      });
      breadcrumb += `</div>`;

      let body = '';
      if (children.length === 0) {
        body = emptyStateHtml("Rien ici pour l'instant. Ajoute un élément avec les boutons ci-dessus.");
      } else if (categoryKey === 'chronologie' && State.chronoView === 'frise') {
        const sorted = [...children].sort((a, b) => chronoSortValue(a) - chronoSortValue(b));
        body = timelineChainHtml(sorted, color);
      } else {
        body = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">${children.map((n) => geoCardHtml(n, GEO_LEVELS[n.geoLevel].childTypes.length > 0, color)).join('')}</div>`;
      }

      content.innerHTML = breadcrumb + (currentNode ? geoHeaderHtml(currentNode, color) : '') + addChildBarHtml(allowedChildTypes, color) + body;
    } else {
      const items = filteredByCategory();
      content.innerHTML = items.length === 0
        ? emptyStateHtml(`Aucune fiche dans « ${cat.label} » pour l'instant.`)
        : `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">${items.map(cardHtml).join('')}</div>`;
    }
    refreshIcons();
  }

  window.__rerenderMain = render;

  content.addEventListener('click', (e) => {
    const openId = e.target.closest('[data-open]');
    const navId = e.target.closest('[data-navigate]');
    const crumb = e.target.closest('[data-crumb]');
    const addChild = e.target.closest('[data-add-child]');
    if (openId) { openDrawer(openId.getAttribute('data-open')); return; }
    if (navId) { State.geoPath = [...State.geoPath, navId.getAttribute('data-navigate')]; render(); return; }
    if (crumb) { const idx = parseInt(crumb.getAttribute('data-crumb'), 10); State.geoPath = idx < 0 ? [] : State.geoPath.slice(0, idx + 1); render(); return; }
    if (addChild) {
      const node = Store.createGeoNode(categoryKey, addChild.getAttribute('data-add-child'), State.geoPath.length ? State.geoPath[State.geoPath.length - 1] : null);
      renderSidebarCounts();
      openDrawer(node.id);
      render();
    }
  });

  if (searchInput) searchInput.addEventListener('input', (e) => { State.query = e.target.value; render(); });
  if (addBtn) addBtn.addEventListener('click', () => { const e = Store.createEntity(categoryKey); renderSidebarCounts(); openDrawer(e.id); render(); });
  if (chronoToggle) {
    chronoToggle.querySelectorAll('[data-chrono-view]').forEach((btn) => {
      btn.addEventListener('click', () => {
        State.chronoView = btn.getAttribute('data-chrono-view');
        chronoToggle.querySelectorAll('[data-chrono-view]').forEach((b) => b.classList.toggle('bg-[#5c2e1f]', b === btn));
        render();
      });
    });
  }
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) exportBtn.addEventListener('click', () => Store.exportJSON());

  Store.init(() => {
    renderSidebarCounts();
    render();
  });
}

/* ---------------- Champ générique ---------------- */

function fieldHtml(field, value, color) {
  const common = `w-full bg-[#2a1310] border border-[#6b3529] rounded-md px-3 py-2 text-sm text-[#f0dcc4] placeholder-[#7a5a42] outline-none transition-colors ${color.ring} focus:ring-2 focus:ring-orange-500/40`;
  let control;
  if (field.image) {
    control = value
      ? `<div class="relative inline-block">
           <img src="${value}" class="max-h-40 rounded-md border border-[#6b3529] object-cover" />
           <button type="button" data-image-clear="${field.key}" class="absolute -top-2 -right-2 bg-[#3d1e17] border border-[#6b3529] rounded-full p-0.5 text-[#b8916a] hover:text-red-400">${icon('x', 12)}</button>
         </div>`
      : `<label class="flex items-center justify-center gap-2 border border-dashed border-[#6b3529] rounded-md py-4 text-xs text-[#9c7452] cursor-pointer hover:border-[#8a4433] hover:text-[#cda87e] transition-colors">
           ${icon('image', 14)} Ajouter une image
           <input type="file" accept="image/*" class="hidden" data-image-input="${field.key}" />
         </label>`;
  } else if (field.select) {
    control = `<select data-field="${field.key}" class="${common}"><option value="">—</option>${field.select.map((opt) => `<option value="${esc(opt)}" ${value === opt ? 'selected' : ''}>${esc(opt)}</option>`).join('')}</select>`;
  } else if (field.area) {
    control = `<textarea rows="3" data-field="${field.key}" class="${common}" placeholder="—">${esc(value)}</textarea>`;
  } else {
    control = `<input type="text" data-field="${field.key}" class="${common}" placeholder="—" value="${esc(value)}" />`;
  }
  return `<div><label class="block text-xs font-mono uppercase tracking-wide text-[#b8916a] mb-1.5">${esc(field.label)}</label>${control}</div>`;
}

/* ---------------- Relations (Politique) ---------------- */

function relationValueClass(value) {
  if (value > 20) return 'text-emerald-300 bg-emerald-900/40 border-emerald-700/50';
  if (value < -20) return 'text-red-300 bg-rose-900/40 border-rose-700/50';
  return 'text-[#cda87e] bg-[#4a2318] border-[#6b3529]';
}

function relationsSectionHtml(entity) {
  const relations = entity.relations || [];
  const rows = relations.map((r) => {
    const target = Store.entities.find((e) => e.id === r.targetId);
    return `<div class="border border-[#5c2e22] rounded-md p-2.5 bg-[#2a1310] space-y-2" data-relation-row="${r.id}">
      <div class="flex items-center justify-between gap-2">
        <span class="text-sm font-display text-[#f5e6d3] truncate">${esc(target ? target.name : '—')}</span>
        <button data-remove-relation="${r.id}" class="text-[#9c7452] hover:text-red-400 shrink-0">${icon('x', 13)}</button>
      </div>
      <div class="flex items-center gap-2">
        <select data-relation-type="${r.id}" class="flex-1 bg-[#3d1e17] border border-[#6b3529] rounded-md px-2 py-1 text-xs text-[#f0dcc4] outline-none focus:ring-2 focus:ring-orange-500/40">
          ${RELATION_TYPES.map((t) => `<option value="${t}" ${r.type === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
        <span class="text-xs font-mono px-1.5 py-0.5 rounded border shrink-0 ${relationValueClass(r.value)}">${r.value > 0 ? '+' : ''}${r.value}</span>
      </div>
      <input type="range" min="-100" max="100" value="${r.value}" data-relation-value="${r.id}" class="w-full accent-red-700" />
    </div>`;
  }).join('');
  return `<div class="pt-2" data-section="relations">
    <label class="block text-xs font-mono uppercase tracking-wide text-[#b8916a] mb-2">Relations diplomatiques</label>
    ${relations.length ? `<div class="space-y-2 mb-3">${rows}</div>` : ''}
    <input id="relation-search" placeholder="Lier à une autre faction…" class="w-full bg-[#2a1310] border border-[#6b3529] rounded-md px-3 py-2 text-sm placeholder-[#7a5a42] outline-none focus:ring-2 focus:ring-orange-500/40" />
    <div id="relation-candidates" class="mt-2"></div>
  </div>`;
}

/* ---------------- Variantes (Bestiaire / Créature) ---------------- */

function variantsSectionHtml(creature) {
  const variants = Store.entities.filter((e) => e.category === 'bestiaire' && e.geoLevel === 'variante' && e.parentId === creature.id);
  const color = COLOR_MAP[catOf('bestiaire').color];
  return `<div class="pt-2" data-section="variantes">
    <div class="flex items-center justify-between mb-2">
      <label class="text-xs font-mono uppercase tracking-wide text-[#b8916a]">Variantes</label>
      <button id="add-variant-btn" class="btn-flame flex items-center gap-1 text-xs px-2 py-1 rounded-full">${icon('plus', 12)} Ajouter</button>
    </div>
    ${variants.length === 0 ? `<p class="text-xs text-[#9c7452]">Aucune variante. Ajoute un jeune, un alpha, une variante régionale…</p>` :
      `<div class="grid grid-cols-2 gap-2">${variants.map((v) => geoCardHtml(v, false, color)).join('')}</div>`}
  </div>`;
}

/* ---------------- Chronologie personnelle (Personnages) ---------------- */

function personalTimelineSectionHtml(entity) {
  const entries = [...(entity.timeline || [])].sort((a, b) => (parseFloat(a.date) || 0) - (parseFloat(b.date) || 0));
  return `<div class="pt-2" data-section="timeline">
    <div class="flex items-center justify-between mb-2">
      <label class="text-xs font-mono uppercase tracking-wide text-[#b8916a]">📜 Chronologie personnelle</label>
      <button id="add-timeline-btn" class="btn-flame flex items-center gap-1 text-xs px-2 py-1 rounded-full">${icon('plus', 12)} Ajouter</button>
    </div>
    ${entries.length === 0 ? `<p class="text-xs text-[#9c7452]">Aucun événement personnel. Ajoute une naissance, une rencontre, un tournant du destin…</p>` :
      `<div class="space-y-2">${entries.map((t) => `
        <div class="border border-[#5c2e22] rounded-md p-2.5 bg-[#2a1310] space-y-1.5" data-timeline-row="${t.id}">
          <div class="flex items-center gap-2">
            <input value="${esc(t.date)}" data-timeline-date="${t.id}" placeholder="Date" class="w-20 shrink-0 bg-[#3d1e17] border border-[#6b3529] rounded-md px-2 py-1 text-xs font-mono text-[#f0dcc4] outline-none focus:ring-2 focus:ring-orange-500/40" />
            <input value="${esc(t.title)}" data-timeline-title="${t.id}" placeholder="Événement" class="flex-1 min-w-0 bg-[#3d1e17] border border-[#6b3529] rounded-md px-2 py-1 text-sm text-[#f5e6d3] outline-none focus:ring-2 focus:ring-orange-500/40" />
            <button data-remove-timeline="${t.id}" class="text-[#9c7452] hover:text-red-400 shrink-0">${icon('x', 13)}</button>
          </div>
          <textarea rows="2" data-timeline-desc="${t.id}" placeholder="Détails (optionnel)" class="w-full bg-[#3d1e17] border border-[#6b3529] rounded-md px-2 py-1 text-xs text-[#f0dcc4] outline-none focus:ring-2 focus:ring-orange-500/40">${esc(t.description)}</textarea>
        </div>`).join('')}</div>`}
  </div>`;
}

/* ---------------- Tiroir (fiche détaillée) ---------------- */

function openDrawer(id) {
  State.selectedId = id;
  State.linkSearch = '';
  renderDrawer();
  document.getElementById('drawer-overlay').classList.remove('hidden');
  document.getElementById('drawer').classList.remove('hidden');
}
function closeDrawer() {
  State.selectedId = null;
  document.getElementById('drawer-overlay').classList.add('hidden');
  document.getElementById('drawer').classList.add('hidden');
}

function renderDrawer() {
  const entity = Store.entities.find((e) => e.id === State.selectedId);
  const drawer = document.getElementById('drawer');
  if (!entity) { closeDrawer(); return; }

  const cat = catOf(entity.category);
  const geo = isGeoEntity(entity);
  const level = geo ? levelOf(entity) : null;
  const badgeIcon = geo ? level.icon : cat.icon;
  const badgeLabel = geo ? level.label : cat.label;
  const c = COLOR_MAP[cat.color];
  const fields = geo ? level.fields : cat.fields;
  const linked = entity.links.map((id) => Store.entities.find((e) => e.id === id)).filter(Boolean);

  let fieldsHtml = '';
  let prevSection;
  fields.forEach((f) => {
    if (f.section && f.section !== prevSection) {
      fieldsHtml += `<h4 class="text-xs font-mono uppercase tracking-widest text-[#9c7452] border-b border-[#5c2e22] pb-1.5 pt-1">${esc(f.section)}</h4>`;
    }
    prevSection = f.section;
    fieldsHtml += fieldHtml(f, entity.fields[f.key], c);
  });

  const linksHtml = `<div class="pt-2">
    <label class="block text-xs font-mono uppercase tracking-wide text-[#b8916a] mb-2">Liens</label>
    ${linked.length ? `<div class="flex flex-wrap gap-2 mb-3">${linked.map((le) => {
      const lc = COLOR_MAP[catOf(le.category).color];
      return `<button data-navigate-link="${le.id}" class="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full text-xs border ${lc.bgSoft} ${lc.border} ${lc.text}">
        ${icon('link-2', 10)} ${esc(le.name)}
        <span data-remove-link="${le.id}" class="ml-1 hover:text-[#f5e6d3] rounded-full px-1">${icon('x', 10)}</span>
      </button>`;
    }).join('')}</div>` : ''}
    <input id="link-search" placeholder="Rechercher une entité à lier…" class="w-full bg-[#2a1310] border border-[#6b3529] rounded-md px-3 py-2 text-sm placeholder-[#7a5a42] outline-none focus:ring-2 focus:ring-orange-500/40" />
    <div id="link-candidates" class="mt-2"></div>
  </div>`;

  drawer.innerHTML = `
    <div class="p-5 border-b border-[#5c2e22] bg-[#2a1310]">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <div class="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full ${c.bgSoft} ${c.text} mb-2">${icon(badgeIcon, 11)} ${esc(badgeLabel)}</div>
          <input id="entity-name" value="${esc(entity.name)}" class="w-full bg-transparent font-display text-xl text-[#f5e6d3] outline-none border-b border-transparent focus:border-[#6b3529] pb-1" />
        </div>
        <button id="drawer-close" class="text-[#9c7452] hover:text-[#e0c19c] p-1">${icon('x', 18)}</button>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto p-5 space-y-5">
      ${fieldsHtml}
      ${entity.category === 'politique' ? relationsSectionHtml(entity) : ''}
      ${entity.geoLevel === 'creature' ? variantsSectionHtml(entity) : ''}
      ${entity.category === 'personnages' ? personalTimelineSectionHtml(entity) : ''}
      ${linksHtml}
    </div>
    <div class="p-4 border-t border-[#5c2e22] flex items-center justify-between">
      <button id="delete-entity" class="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300">${icon('trash-2', 13)} Supprimer cette fiche</button>
      <span class="text-xs text-[#9c7452]">Enregistré automatiquement</span>
    </div>`;

  refreshIcons();
  wireDrawerEvents(entity, fields);
}

function wireDrawerEvents(entity, fields) {
  const drawer = document.getElementById('drawer');

  document.getElementById('drawer-close').onclick = closeDrawer;
  document.getElementById('entity-name').addEventListener('input', (e) => {
    Store.updateEntity(entity.id, { name: e.target.value });
    renderSidebarCounts();
  });
  document.getElementById('delete-entity').onclick = () => { Store.deleteAny(entity.id); closeDrawer(); renderSidebarCounts(); if (window.__rerenderMain) window.__rerenderMain(); };

  drawer.querySelectorAll('[data-field]').forEach((el) => {
    el.addEventListener('input', () => { Store.updateField(entity.id, el.getAttribute('data-field'), el.value); if (window.__rerenderMain) window.__rerenderMain(); });
    el.addEventListener('change', () => { Store.updateField(entity.id, el.getAttribute('data-field'), el.value); if (window.__rerenderMain) window.__rerenderMain(); });
  });
  drawer.querySelectorAll('[data-image-input]').forEach((el) => {
    el.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => { Store.updateField(entity.id, el.getAttribute('data-image-input'), reader.result); renderDrawer(); if (window.__rerenderMain) window.__rerenderMain(); };
      reader.readAsDataURL(file);
    });
  });
  drawer.querySelectorAll('[data-image-clear]').forEach((el) => {
    el.addEventListener('click', () => { Store.updateField(entity.id, el.getAttribute('data-image-clear'), ''); renderDrawer(); if (window.__rerenderMain) window.__rerenderMain(); });
  });

  // Liens
  drawer.querySelectorAll('[data-navigate-link]').forEach((el) => el.addEventListener('click', (e) => {
    if (e.target.closest('[data-remove-link]')) return;
    openDrawer(el.getAttribute('data-navigate-link'));
  }));
  drawer.querySelectorAll('[data-remove-link]').forEach((el) => el.addEventListener('click', (e) => {
    e.stopPropagation();
    Store.toggleLink(entity.id, el.getAttribute('data-remove-link'));
    renderDrawer(); if (window.__rerenderMain) window.__rerenderMain();
  }));
  const linkSearch = document.getElementById('link-search');
  linkSearch.addEventListener('input', () => {
    const q = linkSearch.value.trim().toLowerCase();
    const box = document.getElementById('link-candidates');
    if (!q) { box.innerHTML = ''; return; }
    const candidates = Store.entities.filter((e) => e.id !== entity.id && !entity.links.includes(e.id) && e.name.toLowerCase().includes(q)).slice(0, 6);
    box.innerHTML = candidates.length ? `<div class="border border-[#5c2e22] rounded-md divide-y divide-[#5c2e22] overflow-hidden">${candidates.map((cand) => {
      const cc = catOf(cand.category);
      const ci = isGeoEntity(cand) ? levelOf(cand).icon : cc.icon;
      return `<button data-pick-link="${cand.id}" class="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#e0c19c] hover:bg-[#2a1310] text-left">${icon(ci, 13, COLOR_MAP[cc.color].text)}<span class="flex-1 truncate">${esc(cand.name)}</span>${icon('chevron-right', 13, 'text-[#9c7452]')}</button>`;
    }).join('')}</div>` : '';
    refreshIcons();
    box.querySelectorAll('[data-pick-link]').forEach((el) => el.addEventListener('click', () => {
      Store.toggleLink(entity.id, el.getAttribute('data-pick-link'));
      linkSearch.value = ''; box.innerHTML = '';
      renderDrawer(); if (window.__rerenderMain) window.__rerenderMain();
    }));
  });

  // Relations (Politique)
  if (entity.category === 'politique') {
    drawer.querySelectorAll('[data-relation-type]').forEach((el) => el.addEventListener('change', () => {
      Store.updateRelation(entity.id, el.getAttribute('data-relation-type'), { type: el.value }); renderDrawer();
    }));
    drawer.querySelectorAll('[data-relation-value]').forEach((el) => {
      const badge = el.closest('[data-relation-row]').querySelector('span.font-mono');
      el.addEventListener('input', () => {
        const v = Number(el.value);
        Store.updateRelation(entity.id, el.getAttribute('data-relation-value'), { value: v });
        if (badge) { badge.textContent = (v > 0 ? '+' : '') + v; badge.className = `text-xs font-mono px-1.5 py-0.5 rounded border shrink-0 ${relationValueClass(v)}`; }
      });
      el.addEventListener('change', () => renderDrawer());
    });
    drawer.querySelectorAll('[data-remove-relation]').forEach((el) => el.addEventListener('click', () => {
      Store.removeRelation(entity.id, el.getAttribute('data-remove-relation')); renderDrawer();
    }));
    const relSearch = document.getElementById('relation-search');
    if (relSearch) relSearch.addEventListener('input', () => {
      const q = relSearch.value.trim().toLowerCase();
      const box = document.getElementById('relation-candidates');
      if (!q) { box.innerHTML = ''; return; }
      const rels = entity.relations || [];
      const candidates = Store.entities.filter((e) => e.category === 'politique' && e.id !== entity.id && !rels.some((r) => r.targetId === e.id) && e.name.toLowerCase().includes(q)).slice(0, 6);
      box.innerHTML = candidates.length ? `<div class="border border-[#5c2e22] rounded-md divide-y divide-[#5c2e22] overflow-hidden">${candidates.map((c) => `<button data-pick-relation="${c.id}" class="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#e0c19c] hover:bg-[#2a1310] text-left"><span class="flex-1 truncate">${esc(c.name)}</span>${icon('chevron-right', 13, 'text-[#9c7452]')}</button>`).join('')}</div>` : '';
      refreshIcons();
      box.querySelectorAll('[data-pick-relation]').forEach((el) => el.addEventListener('click', () => {
        Store.addRelation(entity.id, el.getAttribute('data-pick-relation')); renderDrawer();
      }));
    });
  }

  // Variantes (Créature)
  if (entity.geoLevel === 'creature') {
    const addVariantBtn = document.getElementById('add-variant-btn');
    if (addVariantBtn) addVariantBtn.addEventListener('click', () => {
      const node = Store.createGeoNode('bestiaire', 'variante', entity.id);
      renderSidebarCounts();
      openDrawer(node.id);
    });
  }

  // Chronologie personnelle (Personnages)
  if (entity.category === 'personnages') {
    const addTl = document.getElementById('add-timeline-btn');
    if (addTl) addTl.addEventListener('click', () => { Store.addTimelineEntry(entity.id); renderDrawer(); });
    drawer.querySelectorAll('[data-timeline-date]').forEach((el) => el.addEventListener('input', () => Store.updateTimelineEntry(entity.id, el.getAttribute('data-timeline-date'), { date: el.value })));
    drawer.querySelectorAll('[data-timeline-title]').forEach((el) => el.addEventListener('input', () => Store.updateTimelineEntry(entity.id, el.getAttribute('data-timeline-title'), { title: el.value })));
    drawer.querySelectorAll('[data-timeline-desc]').forEach((el) => el.addEventListener('input', () => Store.updateTimelineEntry(entity.id, el.getAttribute('data-timeline-desc'), { description: el.value })));
    drawer.querySelectorAll('[data-remove-timeline]').forEach((el) => el.addEventListener('click', () => { Store.removeTimelineEntry(entity.id, el.getAttribute('data-remove-timeline')); renderDrawer(); }));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('drawer-overlay');
  if (overlay) overlay.addEventListener('click', closeDrawer);
  refreshIcons();
});
