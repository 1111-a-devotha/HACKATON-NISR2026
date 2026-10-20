/* Ntawusigara: evidence charts, at-a-glance insights and PNG export.
   Plain SVG, no libraries, works offline. Every figure is computed from the district table
   (window.NTW_DATA) and follows the user's current weights and selected district. */
(function (root) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  /* ---------- strings (en / rw / fr) ---------- */
  var S = {
    en: {
      evH: 'The evidence',
      reachPoor: 'Poor people reached (%)', reachNfs: 'Adults outside formal finance reached (%)',
      xK: 'Number of districts targeted, taken from the top of each ranking', xKshort: 'districts targeted',
      reachYou: 'Your ranking (current weights)', reachPov: 'Poverty rate only', reachRand: 'Random districts',
      tkReach: 'Targeting the top {k} districts with your ranking reaches {a}% of poor people and {b}% of adults outside formal finance. Poverty rate alone reaches {c}% and {d}%. Random districts would reach about {r}%. Shares use total population as a stand-in for adults.',
      evP: 'Six views of the same 30 districts. The charts follow your weights and the district you select; click any mark to open its profile.',
      tabs: { overlap: 'Where gaps overlap', progress: 'Progress since 2017', access: 'How adults access finance', ranks: 'How sure is the ranking?', prov: 'Provinces', reach: 'Does it reach the right people?' },
      yLab: 'Vertical axis',
      ym: { not_formally_served: 'Adults not formally served (%)', unbanked: 'Adults without a bank account (%)', excluded: 'Adults fully excluded (%)', informal_only: 'Adults using informal finance only (%)' },
      ymShort: { not_formally_served: 'adults outside formal finance', unbanked: 'adults without a bank account', excluded: 'fully excluded adults', informal_only: 'adults using informal finance only' },
      xPov: 'Poverty rate 2024 (%)',
      qHigh: 'Double gap: poorer and less included', qHighS: 'Double gap', qLow: 'Lower on both', median: 'median',
      bubble: 'Circle size = number of poor people',
      rho: 'Rank correlation across the 30 districts: ρ = {r}. Correlation does not show cause.',
      tkOverlap: '{n} districts are above the median on both poverty and {m}. Together they hold {p} poor people, {s} of the national total.',
      leg17: '2017 (NISR modelled)', leg24: '2024', natl: 'Rwanda 2024: {v}', stalledLeg: 'Fell less than 7 points',
      tkProgress: 'Poverty fell in every district, but by less than 7 points in {n}: {l}. Nationally it fell {d} points.',
      sortL: 'Sort by', sort: { banked: 'Share banked', rank: 'Priority rank', nfs: 'Not formally served' },
      seg: ['Excluded', 'Informal only', 'Other formal only', 'Banked'],
      tkAccess: 'In {n} districts at least 1 adult in 10 is outside formal finance. Only {b} districts have more than 40% of adults banked: {l}.',
      xRank: 'Rank (1 = highest priority)', top5band: 'Top 5', ptopH: 'Top 5 in',
      tkRanks: 'With your weights, {n} districts make the top 5 in more than half of 1,000 sampling simulations: {l}. Treat the leaders as a priority group, not a strict order.',
      tkRanks0: 'With your weights, no district makes the top 5 in more than half of the sampling simulations. Treat the leaders as a priority group, not a strict order.',
      pPoor: 'Poor people', pRate: 'Poverty rate (population-weighted)', pShare: '{s} of all poor',
      tkProv: '{a} and {b} together hold {s} of Rwanda\'s poor people.',
      png: 'Download chart (PNG)',
      src: 'Source: NISR EICV7, FinScope 2024, Census 2022 · Ntawusigara',
      tip: { poverty: 'Poverty 2024', poor: 'Poor people', rank: 'Priority rank', drop: 'Fall since 2017', pts: 'pts', likely: 'Likely rank', top5: 'Top 5 in' },
      insH: 'At a glance',
      ins1: 'districts are above the median on both poverty and adults outside formal finance. They hold {s} of the poor.',
      ins2: 'of Rwanda\'s poor people live in your current top 10 priority districts.',
      ins3: 'districts saw poverty fall less than 7 points since 2017: {l}.',
      cbOverlap: 'Overlap: poverty × outside formal finance',
      bivX: 'Outside formal finance', bivY: 'Poverty',
      bivNote: 'Thirds of districts on each measure. The top-right colour in the key = high on both.',
      shareBtn: 'Copy link to this view', copied: 'Link copied. It opens with your weights, language, map and district.'
    },
    rw: {
      evH: 'Ibimenyetso',
      reachPoor: 'Abakene bagezweho (%)', reachNfs: "Abakuru batagerwaho na serivisi z'imari zemewe bagezweho (%)",
      xK: "Umubare w'uturere twatoranyijwe, duhereye hejuru ku rutonde", xKshort: "uturere twatoranyijwe",
      reachYou: 'Urutonde rwawe (uburemere bwa none)', reachPov: "Igipimo cy'ubukene gusa", reachRand: 'Uturere twatoranyijwe uko bibonetse',
      tkReach: "Gutoranya uturere {k} two hejuru ukoresheje urutonde rwawe bigera kuri {a}% by'abakene na {b}% by'abakuru batagerwaho na serivisi z'imari zemewe. Igipimo cy'ubukene gusa kigera kuri {c}% na {d}%. Uturere twatoranyijwe uko bibonetse twagera kuri {r}% hafi. Ijanisha rikoresha abaturage bose mu mwanya w'abakuru.",
      evP: "Uburyo butandatu bwo kureba uturere 30. Ibishushanyo bikurikiza uburemere wahisemo n'akarere wahisemo; kanda ku kimenyetso icyo ari cyo cyose urebe imiterere y'akarere.",
      tabs: { overlap: 'Aho ibyuho bihurira', progress: 'Iterambere kuva 2017', access: "Uko abakuru bagera ku mari", ranks: 'Urutonde rwizewe ku ruhe rugero?', prov: 'Intara', reach: 'Ese bigera ku bakwiye?' },
      yLab: 'Umurongo uhagaze',
      ym: { not_formally_served: 'Abakuru badakoresha serivisi zemewe (%)', unbanked: 'Abakuru badafite konti ya banki (%)', excluded: "Abakuru badakoresha serivisi z'imari na zimwe (%)", informal_only: 'Abakoresha imari itemewe gusa (%)' },
      ymShort: { not_formally_served: 'abadakoresha serivisi zemewe', unbanked: 'abadafite konti ya banki', excluded: "abadakoresha serivisi z'imari na zimwe", informal_only: 'abakoresha imari itemewe gusa' },
      xPov: "Igipimo cy'ubukene 2024 (%)",
      qHigh: 'Icyuho cyikubye kabiri: ubukene bwinshi, serivisi nke', qHighS: 'Icyuho cyikubye kabiri', qLow: 'Biri hasi kuri byombi', median: 'hagati',
      bubble: "Ingano y'uruziga = umubare w'abakene",
      rho: "Isano y'imyanya mu turere 30: ρ = {r}. Isano ntigaragaza impamvu.",
      tkOverlap: "Uturere {n} turi hejuru y'igipimo cyo hagati ku bukene no ku {m}. Hamwe dufite abakene {p}, ni ukuvuga {s} by'abakene bose mu gihugu.",
      leg17: '2017 (igereranya rya NISR)', leg24: '2024', natl: 'U Rwanda 2024: {v}', stalledLeg: "Bwagabanutse munsi y'amanota 7",
      tkProgress: "Ubukene bwagabanutse mu turere twose, ariko munsi y'amanota 7 muri {n}: {l}. Mu gihugu bwagabanutseho amanota {d}.",
      sortL: 'Tondeka hakurikijwe', sort: { banked: 'Abafite banki', rank: "Umwanya w'ibyihutirwa", nfs: 'Badakoresha serivisi zemewe' },
      seg: ['Ntacyo bakoresha', 'Izitemewe gusa', 'Izindi zemewe gusa', 'Bafite banki'],
      tkAccess: "Mu turere {n}, nibura umukuru 1 kuri 10 ntakoresha serivisi z'imari zemewe. Uturere {b} gusa dufite abarenga 40% bafite banki: {l}.",
      xRank: 'Umwanya (1 = byihutirwa cyane)', top5band: '5 ba mbere', ptopH: 'Mu 5 ba mbere',
      tkRanks: "Hakurikijwe uburemere bwawe, uturere {n} tuza mu 5 ba mbere mu birenga kimwe cya kabiri cy'igeragezwa 1 000: {l}. Uturere tuyoboye dufatwe nk'itsinda ry'ibyihutirwa, si urutonde ntakuka.",
      tkRanks0: "Hakurikijwe uburemere bwawe, nta karere kaza mu 5 ba mbere mu birenga kimwe cya kabiri cy'igeragezwa. Uturere tuyoboye dufatwe nk'itsinda ry'ibyihutirwa.",
      pPoor: 'Abakene', pRate: "Igipimo cy'ubukene", pShare: "{s} by'abakene bose",
      tkProv: "{a} na {b} hamwe zifite {s} by'abakene bo mu Rwanda.",
      png: 'Kuramo igishushanyo (PNG)',
      src: 'Inkomoko: NISR EICV7, FinScope 2024, Ibarura 2022 · Ntawusigara',
      tip: { poverty: 'Ubukene 2024', poor: 'Abakene', rank: 'Umwanya', drop: 'Igabanuka kuva 2017', pts: 'amanota', likely: 'Umwanya ushoboka', top5: 'Mu 5 ba mbere' },
      insH: 'Muri make',
      ins1: "uturere turi hejuru y'igipimo cyo hagati ku bukene no ku badakoresha serivisi zemewe. Dufite {s} by'abakene.",
      ins2: "by'abakene bo mu Rwanda baba mu turere 10 twihutirwa hakurikijwe uburemere bwawe.",
      ins3: "uturere ubukene bwagabanutsemo munsi y'amanota 7 kuva 2017: {l}.",
      cbOverlap: 'Aho bihurira: ubukene × badakoresha serivisi zemewe',
      bivX: 'Badakoresha serivisi zemewe', bivY: 'Ubukene',
      bivNote: "Uturere tugabanyijwemo ibice bitatu kuri buri kimenyetso. Ibara riri hejuru iburyo mu rufunguzo = hejuru kuri byombi.",
      shareBtn: "Koporora umuyoboro w'iyi paji", copied: "Umuyoboro wakoporowe. Ufungura n'uburemere, ururimi, ikarita n'akarere wahisemo."
    },
    fr: {
      evH: 'Les preuves',
      reachPoor: 'Personnes pauvres atteintes (%)', reachNfs: 'Adultes hors finance formelle atteints (%)',
      xK: 'Nombre de districts ciblés, pris en tête de chaque classement', xKshort: 'districts ciblés',
      reachYou: 'Votre classement (poids actuels)', reachPov: 'Taux de pauvreté seul', reachRand: 'Districts au hasard',
      tkReach: 'Cibler les {k} premiers districts avec votre classement atteint {a} % des personnes pauvres et {b} % des adultes hors finance formelle. Le taux de pauvreté seul en atteint {c} % et {d} %. Des districts au hasard en atteindraient environ {r} %. Les parts utilisent la population totale comme approximation des adultes.',
      evP: 'Six vues des mêmes 30 districts. Les graphiques suivent vos poids et le district choisi ; cliquez sur un repère pour ouvrir sa fiche.',
      tabs: { overlap: 'Où les écarts se cumulent', progress: 'Progrès depuis 2017', access: 'Accès des adultes à la finance', ranks: 'Quelle confiance dans le classement ?', prov: 'Provinces', reach: 'Atteint-il les bonnes personnes ?' },
      yLab: 'Axe vertical',
      ym: { not_formally_served: 'Adultes hors finance formelle (%)', unbanked: 'Adultes sans compte bancaire (%)', excluded: 'Adultes totalement exclus (%)', informal_only: 'Adultes en informel seulement (%)' },
      ymShort: { not_formally_served: 'adultes hors finance formelle', unbanked: 'adultes sans compte bancaire', excluded: 'adultes totalement exclus', informal_only: 'adultes en informel seulement' },
      xPov: 'Taux de pauvreté 2024 (%)',
      qHigh: 'Double écart : plus pauvres, moins inclus', qHighS: 'Double écart', qLow: 'Plus bas sur les deux', median: 'médiane',
      bubble: 'Taille du cercle = nombre de pauvres',
      rho: 'Corrélation des rangs sur les 30 districts : ρ = {r}. Une corrélation ne prouve pas une cause.',
      tkOverlap: '{n} districts dépassent la médiane à la fois pour la pauvreté et les {m}. Ensemble, ils comptent {p} pauvres, soit {s} du total national.',
      leg17: '2017 (modélisé par le NISR)', leg24: '2024', natl: 'Rwanda 2024 : {v}', stalledLeg: 'Baisse de moins de 7 points',
      tkProgress: 'La pauvreté a baissé dans tous les districts, mais de moins de 7 points dans {n} : {l}. Au niveau national, la baisse est de {d} points.',
      sortL: 'Trier par', sort: { banked: 'Part bancarisée', rank: 'Rang de priorité', nfs: 'Hors finance formelle' },
      seg: ['Exclus', 'Informel seulement', 'Autres formels seulement', 'Bancarisés'],
      tkAccess: 'Dans {n} districts, au moins 1 adulte sur 10 est hors finance formelle. Seuls {b} districts ont plus de 40 % d\'adultes bancarisés : {l}.',
      xRank: 'Rang (1 = priorité la plus forte)', top5band: 'Top 5', ptopH: 'Top 5 dans',
      tkRanks: 'Avec vos poids, {n} districts sont dans le top 5 dans plus de la moitié de 1 000 simulations d\'échantillonnage : {l}. Les districts de tête forment un groupe prioritaire, pas un ordre strict.',
      tkRanks0: 'Avec vos poids, aucun district n\'est dans le top 5 dans plus de la moitié des simulations. Les districts de tête forment un groupe prioritaire.',
      pPoor: 'Personnes pauvres', pRate: 'Taux de pauvreté (pondéré par la population)', pShare: '{s} de tous les pauvres',
      tkProv: '{a} et {b} comptent ensemble {s} des pauvres du Rwanda.',
      png: 'Télécharger le graphique (PNG)',
      src: 'Source : NISR EICV7, FinScope 2024, Recensement 2022 · Ntawusigara',
      tip: { poverty: 'Pauvreté 2024', poor: 'Pauvres', rank: 'Rang de priorité', drop: 'Baisse depuis 2017', pts: 'pts', likely: 'Rang probable', top5: 'Top 5 dans' },
      insH: 'En bref',
      ins1: 'districts dépassent la médiane à la fois pour la pauvreté et pour les adultes hors finance formelle. Ils comptent {s} des pauvres.',
      ins2: 'des pauvres du Rwanda vivent dans vos 10 districts prioritaires actuels.',
      ins3: 'districts où la pauvreté a baissé de moins de 7 points depuis 2017 : {l}.',
      cbOverlap: 'Cumul : pauvreté × hors finance formelle',
      bivX: 'Hors finance formelle', bivY: 'Pauvreté',
      bivNote: 'Tiers de districts sur chaque mesure. La couleur en haut à droite de la légende = élevé sur les deux.',
      shareBtn: 'Copier le lien de cette vue', copied: 'Lien copié. Il s\'ouvre avec vos poids, la langue, la carte et le district.'
    }
  };

  var C = null;       // context from the app: rows, lang, t, fmt, pc, dec, pick, getSel, getRanges, national
  var tab = 'overlap', yKey = 'not_formally_served', sortKey = 'banked';
  var tipEl = null;

  function s(k, v) {
    var L = S[C.lang] || S.en, x = L[k] != null ? L[k] : S.en[k];
    if (typeof x === 'string' && v) Object.keys(v).forEach(function (p) { x = x.split('{' + p + '}').join(v[p]); });
    return x;
  }
  function el(tg, c, txt) { var e = document.createElement(tg); if (c) e.className = c; if (txt != null) e.textContent = txt; return e; }
  function sv(tg, a, parent) { var e = document.createElementNS(NS, tg); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (parent) parent.appendChild(e); return e; }
  function txt(parent, x, y, str, a) { var t = sv('text', Object.assign({ x: x, y: y }, a || {}), parent); t.textContent = str; return t; }
  function median(a) { var b = a.slice().sort(function (x, y) { return x - y; }), n = b.length; return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; }
  function ranks(a) { var idx = a.map(function (v, i) { return [v, i]; }).sort(function (x, y) { return x[0] - y[0]; }), r = new Array(a.length);
    for (var i = 0; i < idx.length;) { var j = i; while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++; var avg = (i + j) / 2 + 1; for (var k = i; k <= j; k++) r[idx[k][1]] = avg; i = j + 1; } return r; }
  function spearman(x, y) { var rx = ranks(x), ry = ranks(y), n = x.length, mx = median(rx), sx = 0, sy = 0, sxy = 0, my;
    mx = rx.reduce(function (a, b) { return a + b; }, 0) / n; my = ry.reduce(function (a, b) { return a + b; }, 0) / n;
    for (var i = 0; i < n; i++) { sxy += (rx[i] - mx) * (ry[i] - my); sx += Math.pow(rx[i] - mx, 2); sy += Math.pow(ry[i] - my, 2); } return sxy / Math.sqrt(sx * sy); }
  function niceMax(v, step) { return Math.ceil(v / step) * step; }
  function TC(t) { return { 'Poor and under-served': 'var(--t-poor)', 'Stalled progress': 'var(--t-stall)', 'Lower poverty, finance gaps': 'var(--t-gap)', 'Banked urban core': 'var(--t-core)' }[t]; }
  function list(a) { return a.join(', '); }
  function narrow() { return window.matchMedia && window.matchMedia('(max-width: 40rem)').matches; }

  /* ---------- tooltip ---------- */
  function tip(evt, lines) {
    if (!tipEl) { tipEl = el('div', 'ntw-tip'); tipEl.setAttribute('role', 'tooltip'); document.body.appendChild(tipEl); }
    tipEl.textContent = ''; lines.forEach(function (l, i) { var d = el('div', i ? null : 'h', l); tipEl.appendChild(d); });
    tipEl.style.display = 'block';
    var r = tipEl.getBoundingClientRect(), x, y;
    if (evt.clientX != null && evt.type.indexOf('pointer') === 0) { x = evt.clientX + 14; y = evt.clientY + 14; }
    else { var b = evt.target.getBoundingClientRect(); x = b.right + 8; y = b.top; }
    if (x + r.width > window.innerWidth - 8) x = Math.max(8, x - r.width - 28);
    if (y + r.height > window.innerHeight - 8) y = Math.max(8, y - r.height - 28);
    tipEl.style.left = x + 'px'; tipEl.style.top = y + 'px';
  }
  function untip() { if (tipEl) tipEl.style.display = 'none'; }
  function interactive(node, label, lines, district) {
    node.setAttribute('tabindex', '0'); node.setAttribute('role', 'button'); node.setAttribute('aria-label', label);
    node.addEventListener('pointerenter', function (e) { tip(e, lines); });
    node.addEventListener('pointermove', function (e) { tip(e, lines); });
    node.addEventListener('pointerleave', untip);
    node.addEventListener('focus', function (e) { tip(e, lines); });
    node.addEventListener('blur', untip);
    if (district) {
      node.style.cursor = 'pointer';
      node.addEventListener('click', function () { untip(); C.pick(district); });
      node.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); untip(); C.pick(district); } });
    }
  }
  function distLines(r) {
    var T = s('tip'), x = C.getRanges()[r.district];
    var out = [r.district + ' · ' + C.t('prov')[r.province], T.poverty + ': ' + C.pc(r.poverty_2024), T.poor + ': ' + C.fmt(r.poor_people),
      s('ym').not_formally_served.replace(' (%)', '') + ': ' + C.pc(r.not_formally_served), T.rank + ': ' + r.rank];
    if (x) out.push(T.likely + ': ' + x.lo + '–' + x.hi);
    return out;
  }

  /* ---------- shared computations (also used for insights) ---------- */
  function overlapStats(key) {
    var rows = C.rows, mx = median(rows.map(function (r) { return r.poverty_2024; })), my = median(rows.map(function (r) { return r[key]; }));
    var hit = rows.filter(function (r) { return r.poverty_2024 > mx && r[key] > my; }), poor = hit.reduce(function (a, r) { return a + r.poor_people; }, 0);
    return { mx: mx, my: my, hit: hit, poor: poor, share: poor / C.totalPoor * 100 };
  }
  function stalled() { return C.rows.filter(function (r) { return r.poverty_drop_pp < 7; }).sort(function (a, b) { return a.poverty_drop_pp - b.poverty_drop_pp; }); }

  /* ---------- chart frame ---------- */
  function frame(box, h) {
    var w = Math.max(280, Math.floor(box.clientWidth || 600));
    var svg = sv('svg', { width: w, height: h, viewBox: '0 0 ' + w + ' ' + h, class: 'ev-svg', role: 'img' });
    box.appendChild(svg); return { svg: svg, w: w, h: h };
  }

  /* 1. Overlap scatter */
  function drawOverlap(box) {
    var rows = C.rows, small = narrow(), H = small ? 340 : 440, f = frame(box, H), g = f.svg;
    var m = { l: small ? 38 : 50, r: 14, t: 14, b: 44 }, iw = f.w - m.l - m.r, ih = H - m.t - m.b;
    var xMax = niceMax(Math.max.apply(null, rows.map(function (r) { return r.poverty_2024; })) + 2, 10);
    var yv = rows.map(function (r) { return r[yKey]; }), yMin = yKey === 'unbanked' ? Math.floor((Math.min.apply(null, yv) - 5) / 10) * 10 : 0;
    var yMax = niceMax(Math.max.apply(null, yv) + (yKey === 'unbanked' ? 2 : 1), yKey === 'unbanked' ? 10 : 5);
    var X = function (v) { return m.l + v / xMax * iw; }, Y = function (v) { return m.t + ih - (v - yMin) / (yMax - yMin) * ih; };
    var pmax = Math.max.apply(null, rows.map(function (r) { return r.poor_people; })), rMax = small ? 13 : 19;
    var R = function (p) { return Math.max(4, Math.sqrt(p / pmax) * rMax); };
    var st = overlapStats(yKey);
    g.setAttribute('aria-label', s('tabs').overlap + '. ' + s('tkOverlap', { n: st.hit.length, m: s('ymShort')[yKey], p: C.fmt(st.poor), s: C.pc(Math.round(st.share)) }));
    // quadrant shading (double gap)
    sv('rect', { x: X(st.mx), y: m.t, width: X(xMax) - X(st.mx), height: Y(st.my) - m.t, class: 'ev-quad' }, g);
    // grid + axes
    var yStep = (yMax - yMin) / 4;
    for (var i = 0; i <= 4; i++) { var yy = yMin + yStep * i; sv('line', { x1: m.l, x2: m.l + iw, y1: Y(yy), y2: Y(yy), class: 'ev-grid' }, g); txt(g, m.l - 6, Y(yy) + 4, C.dec(yy, 0), { class: 'ev-tick', 'text-anchor': 'end' }); }
    for (var xv = 0; xv <= xMax; xv += 10) { txt(g, X(xv), m.t + ih + 16, C.dec(xv, 0), { class: 'ev-tick', 'text-anchor': 'middle' }); }
    sv('line', { x1: m.l, x2: m.l + iw, y1: m.t + ih, y2: m.t + ih, class: 'ev-axis' }, g);
    txt(g, m.l + iw / 2, H - 6, s('xPov'), { class: 'ev-alab', 'text-anchor': 'middle' });
    // medians
    sv('line', { x1: X(st.mx), x2: X(st.mx), y1: m.t, y2: m.t + ih, class: 'ev-ref' }, g);
    sv('line', { x1: m.l, x2: m.l + iw, y1: Y(st.my), y2: Y(st.my), class: 'ev-ref' }, g);
    txt(g, X(st.mx) + 4, m.t + ih - 4, s('median') + ' ' + C.dec(st.mx), { class: 'ev-note' });
    txt(g, m.l + 4, Y(st.my) - 4, s('median') + ' ' + C.dec(st.my), { class: 'ev-note' });
    txt(g, m.l + iw - 4, m.t + 14, s(small ? 'qHighS' : 'qHigh'), { class: 'ev-qlab', 'text-anchor': 'end' });
    txt(g, m.l + 6, m.t + ih - 20, s('qLow'), { class: 'ev-note' });
    // dots, biggest first so small ones stay clickable
    var sel = C.getSel(), order = rows.slice().sort(function (a, b) { return b.poor_people - a.poor_people; });
    order.forEach(function (r) {
      var c = sv('circle', { cx: X(r.poverty_2024), cy: Y(r[yKey]), r: R(r.poor_people), class: 'ev-dot' + (sel === r.district ? ' sel' : '') }, g);
      c.style.fill = TC(r.typology);
      interactive(c, distLines(r).join(', '), distLines(r), r.district);
    });
    // selective direct labels: current top 6 + selected
    var lab = rows.filter(function (r) { return r.rank <= (small ? 4 : 6) || r.district === sel; }), placed = [];
    lab.sort(function (a, b) { return a.rank - b.rank; }).forEach(function (r) {
      var cx = X(r.poverty_2024), cy = Y(r[yKey]), rr = R(r.poor_people), w = r.district.length * 6.6, right = cx + rr + 4 + w < m.l + iw;
      var x = right ? cx + rr + 3 : cx - rr - 3, y = cy + 4, tries = [0, -13, 13, -26, 26];
      for (var k = 0; k < tries.length; k++) { var yy2 = y + tries[k], x0 = right ? x : x - w;
        if (!placed.some(function (p) { return Math.abs(p.y - yy2) < 12 && x0 < p.x1 && x0 + w > p.x0; })) { y = yy2; break; } }
      placed.push({ x0: right ? x : x - w, x1: right ? x + w : x, y: y });
      txt(g, x, y, r.district, { class: 'ev-dlab' + (r.district === sel ? ' sel' : ''), 'text-anchor': right ? 'start' : 'end' });
    });
    // y label (rotated)
    txt(g, 12, m.t + ih / 2, s('ym')[yKey], { class: 'ev-alab', 'text-anchor': 'middle', transform: 'rotate(-90 12 ' + (m.t + ih / 2) + ')' });
    return s('tkOverlap', { n: st.hit.length, m: s('ymShort')[yKey], p: C.fmt(st.poor), s: C.pc(Math.round(st.share)) }) + ' ' +
      s('rho', { r: C.dec(spearman(rows.map(function (r) { return r.poverty_2024; }), rows.map(function (r) { return r[yKey]; })), 2) });
  }

  /* 2. Progress dumbbell */
  function drawProgress(box) {
    var rows = C.rows.slice().sort(function (a, b) { return b.poverty_2024 - a.poverty_2024; }), small = narrow();
    var rh = 19, m = { l: small ? 84 : 100, r: small ? 40 : 56, t: 24, b: 34 }, H = m.t + rows.length * rh + m.b, f = frame(box, H), g = f.svg, iw = f.w - m.l - m.r;
    var xMax = 70, X = function (v) { return m.l + v / xMax * iw; }, nat = C.national;
    for (var xv = 0; xv <= xMax; xv += 10) { sv('line', { x1: X(xv), x2: X(xv), y1: m.t - 6, y2: H - m.b, class: 'ev-grid' }, g); txt(g, X(xv), H - m.b + 15, C.dec(xv, 0), { class: 'ev-tick', 'text-anchor': 'middle' }); }
    txt(g, m.l + iw / 2, H - 4, s('xPov').replace(' 2024', ''), { class: 'ev-alab', 'text-anchor': 'middle' });
    sv('line', { x1: X(nat.poverty_2024), x2: X(nat.poverty_2024), y1: m.t - 10, y2: H - m.b, class: 'ev-ref' }, g);
    txt(g, X(nat.poverty_2024) + 4, m.t - 12, s('natl', { v: C.pc(nat.poverty_2024) }), { class: 'ev-note' });
    txt(g, f.w - 4, m.t - 12, '−' + s('tip').pts, { class: 'ev-note', 'text-anchor': 'end' });
    var sel = C.getSel();
    rows.forEach(function (r, i) {
      var y = m.t + i * rh + rh / 2, stall = r.poverty_drop_pp < 7, row = sv('g', { class: 'ev-row' + (sel === r.district ? ' sel' : '') }, g);
      sv('rect', { x: 0, y: y - rh / 2, width: f.w, height: rh, class: 'ev-hit' }, row);
      txt(row, m.l - 8, y + 4, r.district, { class: 'ev-ylab' + (stall ? ' strong' : ''), 'text-anchor': 'end' });
      sv('line', { x1: X(r.poverty_2024), x2: X(r.poverty_2017_modelled), y1: y, y2: y, class: 'ev-bar-line' + (stall ? ' stall' : '') }, row);
      sv('circle', { cx: X(r.poverty_2017_modelled), cy: y, r: 4.5, class: 'ev-d17' }, row);
      sv('circle', { cx: X(r.poverty_2024), cy: y, r: 5, class: 'ev-d24' + (stall ? ' stall' : '') }, row);
      txt(row, f.w - 4, y + 4, C.dec(r.poverty_drop_pp), { class: 'ev-val' + (stall ? ' strong' : ''), 'text-anchor': 'end' });
      var T = s('tip');
      interactive(row, r.district + ': 2017 ' + C.pc(r.poverty_2017_modelled) + ', 2024 ' + C.pc(r.poverty_2024),
        [r.district, '2017*: ' + C.pc(r.poverty_2017_modelled), '2024: ' + C.pc(r.poverty_2024), T.drop + ': ' + C.dec(r.poverty_drop_pp) + ' ' + T.pts], r.district);
    });
    var st = stalled(), nd = C.national.poverty_2017_modelled - C.national.poverty_2024;
    g.setAttribute('aria-label', s('tabs').progress);
    return s('tkProgress', { n: st.length, l: list(st.map(function (r) { return r.district + ' (−' + C.dec(r.poverty_drop_pp) + ')'; })), d: C.dec(nd) });
  }

  /* 3. Access strand, 100% stacked */
  function drawAccess(box) {
    var rows = C.rows.slice(), small = narrow();
    if (sortKey === 'banked') rows.sort(function (a, b) { return a.banked - b.banked || b.not_formally_served - a.not_formally_served; });
    else if (sortKey === 'nfs') rows.sort(function (a, b) { return b.not_formally_served - a.not_formally_served || a.banked - b.banked; });
    else rows.sort(function (a, b) { return a.rank - b.rank; });
    var rh = 19, m = { l: small ? 84 : 100, r: 8, t: 8, b: 26 }, H = m.t + rows.length * rh + m.b, f = frame(box, H), g = f.svg, iw = f.w - m.l - m.r;
    var X = function (v) { return m.l + v / 100 * iw; };
    var keys = ['excluded', 'informal_only', 'other_formal_only', 'banked'], cols = ['var(--s-exc)', 'var(--s-inf)', 'var(--s-formal)', 'var(--s-bank)'], names = s('seg');
    [0, 25, 50, 75, 100].forEach(function (v) { txt(g, X(v), H - 8, v + '%', { class: 'ev-tick', 'text-anchor': v === 0 ? 'start' : v === 100 ? 'end' : 'middle' }); });
    var sel = C.getSel();
    rows.forEach(function (r, i) {
      var y = m.t + i * rh, row = sv('g', { class: 'ev-row' + (sel === r.district ? ' sel' : '') }, g), x = 0, tot = keys.reduce(function (a, k) { return a + r[k]; }, 0) || 100;
      sv('rect', { x: 0, y: y, width: f.w, height: rh, class: 'ev-hit' }, row);
      txt(row, m.l - 8, y + rh / 2 + 4, r.district, { class: 'ev-ylab', 'text-anchor': 'end' });
      keys.forEach(function (k, j) { var w = r[k] / tot * 100; if (w <= 0) return;
        var rc = sv('rect', { x: X(x) + (x > 0 ? 1 : 0), y: y + 3, width: Math.max(0.5, X(x + w) - X(x) - (x > 0 ? 1 : 0)), height: rh - 6, rx: 1.5 }, row); rc.style.fill = cols[j]; x += w; });
      var lines = [r.district].concat(keys.slice().reverse().map(function (k) { return names[keys.indexOf(k)] + ': ' + C.pc(r[k]); }));
      interactive(row, lines.join(', '), lines, r.district);
    });
    // legend
    var lg = el('div', 'ev-legend'); keys.forEach(function (k, j) { var sp = el('span'); var i2 = el('i'); i2.style.background = cols[j]; sp.appendChild(i2); sp.appendChild(document.createTextNode(names[j])); lg.appendChild(sp); });
    box.insertBefore(lg, box.firstChild);
    var gap = C.rows.filter(function (r) { return r.not_formally_served >= 10; }), bk = C.rows.filter(function (r) { return r.banked > 40; });
    g.setAttribute('aria-label', s('tabs').access);
    return s('tkAccess', { n: gap.length, b: bk.length, l: list(bk.map(function (r) { return r.district + ' (' + C.pc(r.banked) + ')'; })) });
  }

  /* 4. Rank uncertainty */
  function drawRanks(box) {
    var RG = C.getRanges(), rows = C.rows.slice().sort(function (a, b) { return a.rank - b.rank; }), small = narrow();
    var rh = 19, m = { l: small ? 84 : 100, r: small ? 44 : 64, t: 26, b: 34 }, H = m.t + rows.length * rh + m.b, f = frame(box, H), g = f.svg, iw = f.w - m.l - m.r;
    var X = function (v) { return m.l + (v - 1) / 29 * iw; };
    sv('rect', { x: X(1) - 4, y: m.t - 8, width: X(5) - X(1) + 8, height: rows.length * rh + 8, class: 'ev-band' }, g);
    txt(g, X(3), m.t - 12, s('top5band'), { class: 'ev-note', 'text-anchor': 'middle' });
    txt(g, f.w - 4, m.t - 12, s('ptopH'), { class: 'ev-note', 'text-anchor': 'end' });
    [1, 5, 10, 15, 20, 25, 30].forEach(function (v) { sv('line', { x1: X(v), x2: X(v), y1: m.t - 4, y2: H - m.b, class: 'ev-grid' }, g); txt(g, X(v), H - m.b + 15, v, { class: 'ev-tick', 'text-anchor': 'middle' }); });
    txt(g, m.l + iw / 2, H - 4, s('xRank'), { class: 'ev-alab', 'text-anchor': 'middle' });
    var sel = C.getSel(), T = s('tip');
    rows.forEach(function (r, i) {
      var y = m.t + i * rh + rh / 2, x = RG[r.district] || { lo: r.rank, hi: r.rank, pTop5: 0 }, strong = x.pTop5 >= 50;
      var row = sv('g', { class: 'ev-row' + (sel === r.district ? ' sel' : '') }, g);
      sv('rect', { x: 0, y: y - rh / 2, width: f.w, height: rh, class: 'ev-hit' }, row);
      txt(row, m.l - 8, y + 4, r.rank + '. ' + r.district, { class: 'ev-ylab' + (strong ? ' strong' : ''), 'text-anchor': 'end' });
      sv('line', { x1: X(x.lo), x2: X(x.hi), y1: y, y2: y, class: 'ev-range' + (strong ? ' strong' : '') }, row);
      sv('circle', { cx: X(r.rank), cy: y, r: 4.5, class: 'ev-rk' + (strong ? ' strong' : '') }, row);
      txt(row, f.w - 4, y + 4, Math.round(x.pTop5) + '%', { class: 'ev-val' + (strong ? ' strong' : ''), 'text-anchor': 'end' });
      interactive(row, r.district + ', ' + T.rank + ' ' + r.rank + ', ' + T.likely + ' ' + x.lo + '–' + x.hi,
        [r.district, T.rank + ': ' + r.rank, T.likely + ': ' + x.lo + '–' + x.hi, T.top5 + ': ' + C.pc(Math.round(x.pTop5)) + ' (1 000 sim.)'], r.district);
    });
    var lead = rows.filter(function (r) { return RG[r.district] && RG[r.district].pTop5 > 50; });
    g.setAttribute('aria-label', s('tabs').ranks);
    return lead.length ? s('tkRanks', { n: lead.length, l: list(lead.map(function (r) { return r.district; })) }) : s('tkRanks0');
  }

  /* 5. Provinces: two small bar charts sharing rows, one measure each */
  function drawProv(box) {
    var P = {}; C.rows.forEach(function (r) { var p = P[r.province] || (P[r.province] = { k: r.province, poor: 0, pop: 0 }); p.poor += r.poor_people; p.pop += r.population_2022; });
    var ps = Object.keys(P).map(function (k) { return P[k]; }).sort(function (a, b) { return b.poor - a.poor; });
    var wrap = el('div', 'ev-two'); box.appendChild(wrap);
    var slots = [el('div'), el('div')]; slots.forEach(function (d) { wrap.appendChild(d); });
    function bars(title, val, fmtv, max) {
      var b = slots.shift(); b.appendChild(el('h4', 'ev-h4', title));
      var rh = 34, m = { l: narrow() ? 112 : 128, r: 64, t: 4, b: 8 }, H = m.t + ps.length * rh + m.b, f = frame(b, H), g = f.svg, iw = f.w - m.l - m.r;
      ps.forEach(function (p, i) { var y = m.t + i * rh, v = val(p), w = Math.max(2, v / max * iw);
        var row = sv('g', { class: 'ev-row' }, g);
        txt(row, m.l - 8, y + rh / 2 + 4, C.t('prov')[p.k], { class: 'ev-ylab', 'text-anchor': 'end' });
        sv('rect', { x: m.l, y: y + 7, width: w, height: rh - 14, rx: 3, class: 'ev-pbar' }, row);
        txt(row, m.l + w + 6, y + rh / 2 + 4, fmtv(v), { class: 'ev-val strong' });
        var lines = [C.t('prov')[p.k], s('pPoor') + ': ' + C.fmt(p.poor), s('pRate') + ': ' + C.pc(p.poor / p.pop * 100), s('pShare', { s: C.pc(Math.round(p.poor / C.totalPoor * 100)) })];
        interactive(row, lines.join(', '), lines, null);
      });
      g.setAttribute('aria-label', title);
    }
    bars(s('pPoor'), function (p) { return p.poor; }, function (v) { return C.fmt(v); }, Math.max.apply(null, ps.map(function (p) { return p.poor; })));
    bars(s('pRate'), function (p) { return p.poor / p.pop * 100; }, function (v) { return C.pc(Math.round(v * 10) / 10); }, 50);
    var a = ps[0], b = ps[1];
    return s('tkProv', { a: C.t('prov')[a.k], b: C.t('prov')[b.k], s: C.pc(Math.round((a.poor + b.poor) / C.totalPoor * 100)) });
  }


  /* 6. Reach: how much of the problem does a targeting rule reach? */
  function reachCurves() {
    var rows = C.rows, N = rows.length;
    function nfs(r) { return r.not_formally_served / 100 * r.population_2022; }
    function poor(r) { return r.poor_people; }
    var tot = { poor: rows.reduce(function (a, r) { return a + poor(r); }, 0), nfs: rows.reduce(function (a, r) { return a + nfs(r); }, 0) };
    function curve(order, val, t) { var c = [0], run = 0; order.forEach(function (r) { run += val(r); c.push(run / t * 100); }); return c; }
    var byRank = rows.slice().sort(function (a, b) { return a.rank - b.rank; });
    var byPov = rows.slice().sort(function (a, b) { return b.poverty_2024 - a.poverty_2024; });
    var rand = []; for (var i = 0; i <= N; i++) rand.push(i / N * 100);
    return {
      N: N, rand: rand,
      poor: { you: curve(byRank, poor, tot.poor), pov: curve(byPov, poor, tot.poor) },
      nfs: { you: curve(byRank, nfs, tot.nfs), pov: curve(byPov, nfs, tot.nfs) }
    };
  }
  function drawReach(box) {
    var R = reachCurves(), N = R.N, K = 10, small = narrow();
    var wrap = el('div', 'ev-two'); box.appendChild(wrap);
    var rslots = [el('div'), el('div')]; rslots.forEach(function (d) { wrap.appendChild(d); });
    ['poor', 'nfs'].forEach(function (key, kix) {
      var slot = rslots[kix]; slot.appendChild(el('h4', 'ev-h4', s(key === 'poor' ? 'reachPoor' : 'reachNfs')));
      var H = small ? 250 : 290, m = { l: 38, r: 16, t: 12, b: 40 }, f = frame(slot, H), g = f.svg, iw = f.w - m.l - m.r, ih = H - m.t - m.b;
      function X(k) { return m.l + k / N * iw; } function Y(v) { return m.t + (1 - v / 100) * ih; }
      [0, 25, 50, 75, 100].forEach(function (v) { sv('line', { x1: m.l, x2: m.l + iw, y1: Y(v), y2: Y(v), class: 'ev-grid' }, g); txt(g, m.l - 6, Y(v) + 4, v, { class: 'ev-tick', 'text-anchor': 'end' }); });
      [0, 5, 10, 15, 20, 25, 30].forEach(function (k) { txt(g, X(k), H - m.b + 15, k, { class: 'ev-tick', 'text-anchor': 'middle' }); });
      txt(g, m.l + iw / 2, H - 6, s('xK'), { class: 'ev-alab', 'text-anchor': 'middle' });
      sv('line', { x1: X(K), x2: X(K), y1: m.t, y2: H - m.b, class: 'ev-ref' }, g);
      function path(arr) { return arr.map(function (v, i) { return (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1); }).join(' '); }
      sv('path', { d: path(R.rand), class: 'ev-ln rand' }, g);
      sv('path', { d: path(R[key].pov), class: 'ev-ln pov' }, g);
      sv('path', { d: path(R[key].you), class: 'ev-ln you' }, g);
      [['pov', 'reachPov'], ['you', 'reachYou']].forEach(function (p, ix) {
        var v = R[key][p[0]][K], c = sv('circle', { cx: X(K), cy: Y(v), r: 5, class: 'ev-pt ' + p[0] }, g);
        txt(g, ix ? X(K) - 9 : X(K) + 9, ix ? Y(v) - 9 : Y(v) + 15, C.pc(Math.round(v)), { class: 'ev-val strong', 'text-anchor': ix ? 'end' : 'start' });
        interactive(c, s(p[1]) + ', ' + K + ' / ' + N + ': ' + Math.round(v) + '%', [s(p[1]), K + ' / ' + N + ' ' + s('xKshort'), C.pc(Math.round(v))], null);
      });
      g.setAttribute('aria-label', s(key === 'poor' ? 'reachPoor' : 'reachNfs'));
    });
    var yp = Math.round(R.poor.you[K]), yn = Math.round(R.nfs.you[K]), pp = Math.round(R.poor.pov[K]), pn = Math.round(R.nfs.pov[K]), rr = Math.round(R.rand[K]);
    return s('tkReach', { k: K, a: yp, b: yn, c: pp, d: pn, r: rr });
  }

  var DRAW = { overlap: drawOverlap, progress: drawProgress, access: drawAccess, ranks: drawRanks, prov: drawProv, reach: drawReach };

  /* ---------- PNG export: inline computed styles so CSS variables survive ---------- */
  var PROPS = ['fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-dasharray', 'stroke-opacity', 'opacity', 'font-size', 'font-family', 'font-weight', 'paint-order', 'visibility'];
  function exportPNG(container, name, title) {
    var svgs = container.querySelectorAll('svg.ev-svg'); if (!svgs.length) return;
    var bg = getComputedStyle(document.querySelector('#evSec') || document.body).backgroundColor || '#fff', ink = getComputedStyle(document.body).color;
    var pad = 16, head = 34, foot = 26, W = 0, H = 0, parts = [];
    [].forEach.call(svgs, function (o) { var w = +o.getAttribute('width'), h = +o.getAttribute('height'); parts.push({ o: o, w: w, h: h, y: H }); W = Math.max(W, w); H += h + 8; });
    var outW = W + pad * 2, outH = head + H + foot;
    var out = document.createElementNS(NS, 'svg'); out.setAttribute('xmlns', NS); out.setAttribute('width', outW); out.setAttribute('height', outH);
    sv('rect', { x: 0, y: 0, width: outW, height: outH, fill: bg }, out);
    var tt = sv('text', { x: pad, y: 24, fill: ink, 'font-size': 16, 'font-weight': 700, 'font-family': 'Georgia, serif' }, out); tt.textContent = 'Ntawusigara · ' + title;
    parts.forEach(function (p) {
      var cl = p.o.cloneNode(true), src = p.o.querySelectorAll('*'), dst = cl.querySelectorAll('*');
      for (var i = 0; i < src.length; i++) { var cs = getComputedStyle(src[i]), st = ''; PROPS.forEach(function (k) { var v = cs.getPropertyValue(k); if (v) st += k + ':' + v + ';'; }); dst[i].setAttribute('style', st); }
      cl.setAttribute('x', pad); cl.setAttribute('y', head + p.y); cl.removeAttribute('class'); out.appendChild(cl);
    });
    var ft = sv('text', { x: pad, y: outH - 9, fill: ink, 'font-size': 11, 'font-family': 'Arial, sans-serif', opacity: 0.75 }, out); ft.textContent = s('src');
    var data = new XMLSerializer().serializeToString(out), img = new Image(), scale = 2;
    img.onload = function () {
      var cv = document.createElement('canvas'); cv.width = outW * scale; cv.height = outH * scale; var cx = cv.getContext('2d'); cx.scale(scale, scale); cx.drawImage(img, 0, 0);
      cv.toBlob(function (b) { var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); a.remove(); }, 'image/png');
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data);
  }

  /* ---------- section rendering ---------- */
  function render() {
    var sec = document.getElementById('evSec'); if (!sec || !C) return;
    document.getElementById('evH').textContent = s('evH');
    document.getElementById('evP').textContent = s('evP');
    var tl = document.getElementById('evTabs'); tl.textContent = '';
    Object.keys(DRAW).forEach(function (k) {
      var b = el('button', 'ev-tab', s('tabs')[k]); b.type = 'button'; b.setAttribute('role', 'tab'); b.id = 'evt-' + k;
      b.setAttribute('aria-selected', k === tab ? 'true' : 'false'); b.setAttribute('aria-controls', 'evPanel'); b.tabIndex = k === tab ? 0 : -1;
      b.addEventListener('click', function () { tab = k; render(); document.getElementById('evt-' + k).focus(); });
      b.addEventListener('keydown', function (e) { var ks = Object.keys(DRAW), i = ks.indexOf(k);
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); tab = ks[(i + (e.key === 'ArrowRight' ? 1 : ks.length - 1)) % ks.length]; render(); document.getElementById('evt-' + tab).focus(); } });
      tl.appendChild(b);
    });
    var panel = document.getElementById('evPanel'); panel.setAttribute('aria-labelledby', 'evt-' + tab); panel.textContent = '';
    var ctl = el('div', 'ev-ctl');
    if (tab === 'overlap') {
      var lb = el('label', null, s('yLab') + ' '), se = el('select'); se.id = 'evY'; lb.setAttribute('for', 'evY');
      Object.keys(S.en.ym).forEach(function (k) { var o = el('option', null, s('ym')[k]); o.value = k; se.appendChild(o); }); se.value = yKey;
      se.addEventListener('change', function () { yKey = se.value; render(); }); ctl.appendChild(lb); ctl.appendChild(se);
    }
    if (tab === 'access') {
      var lb2 = el('label', null, s('sortL') + ' '), se2 = el('select'); se2.id = 'evSort'; lb2.setAttribute('for', 'evSort');
      ['banked', 'nfs', 'rank'].forEach(function (k) { var o = el('option', null, s('sort')[k]); o.value = k; se2.appendChild(o); }); se2.value = sortKey;
      se2.addEventListener('change', function () { sortKey = se2.value; render(); }); ctl.appendChild(lb2); ctl.appendChild(se2);
    }
    var pb = el('button', 'btn ghost ev-png', s('png')); pb.type = 'button'; ctl.appendChild(pb);
    panel.appendChild(ctl);
    var take = el('p', 'ev-take'); panel.appendChild(take);
    var plot = el('div', 'ev-plot'); panel.appendChild(plot);
    if (tab === 'overlap') {
      var lg = el('div', 'ev-legend');
      ['Poor and under-served', 'Stalled progress', 'Lower poverty, finance gaps', 'Banked urban core'].forEach(function (k) { var sp = el('span'); var i = el('i'); i.className = 'dot'; i.style.background = TC(k); sp.appendChild(i); sp.appendChild(document.createTextNode(C.t('typ')[k])); lg.appendChild(sp); });
      lg.appendChild(el('span', 'muted', s('bubble'))); panel.insertBefore(lg, plot);
    }
    if (tab === 'progress') {
      var lg2 = el('div', 'ev-legend');
      [['ev-k17', s('leg17')], ['ev-k24', s('leg24')], ['ev-kst', s('stalledLeg')]].forEach(function (x) { var sp = el('span'); var i = el('i'); i.className = x[0]; sp.appendChild(i); sp.appendChild(document.createTextNode(x[1])); lg2.appendChild(sp); });
      panel.insertBefore(lg2, plot);
    }
    if (tab === 'reach') {
      var lg3 = el('div', 'ev-legend');
      [['you', 'reachYou'], ['pov', 'reachPov'], ['rand', 'reachRand']].forEach(function (x) { var sp = el('span'); sp.appendChild(el('i', 'kl ' + x[0])); sp.appendChild(document.createTextNode(s(x[1]))); lg3.appendChild(sp); });
      panel.insertBefore(lg3, plot);
    }
    take.textContent = DRAW[tab](plot);
    pb.addEventListener('click', function () { exportPNG(plot, 'ntawusigara_' + tab + '.png', s('tabs')[tab]); });
    renderInsights();
  }

  function renderInsights() {
    var box = document.getElementById('insights'); if (!box) return; box.textContent = '';
    box.appendChild(el('h3', null, s('insH')));
    var st = overlapStats('not_formally_served'), top10 = C.rows.filter(function (r) { return r.rank <= 10; }).reduce(function (a, r) { return a + r.poor_people; }, 0), sl = stalled();
    var g = el('div', 'ins-grid');
    [[st.hit.length, s('ins1', { s: C.pc(Math.round(st.share)) })],
     [C.pc(Math.round(top10 / C.totalPoor * 100)), s('ins2')],
     [sl.length, s('ins3', { l: list(sl.map(function (r) { return r.district; })) })]].forEach(function (x) {
      var d = el('div', 'ins'); d.appendChild(el('b', null, String(x[0]))); d.appendChild(el('span', null, x[1])); g.appendChild(d); });
    box.appendChild(g);
  }

  var rt = null;
  root.NtwCharts = {
    s: function (k, v) { return C ? s(k, v) : (S.en[k] || k); },
    init: function (ctx) {
      C = ctx; C.totalPoor = C.rows.reduce(function (a, r) { return a + r.poor_people; }, 0);
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(render, 150); });
    },
    update: function (ctx) { if (ctx) Object.assign(C, ctx); render(); },
    overlapStats: function (k) { return overlapStats(k || 'not_formally_served'); }
  };
})(typeof self !== 'undefined' ? self : this);
