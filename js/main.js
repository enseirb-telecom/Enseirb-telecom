/* =============================================
   ENSEIRB-MATMECA — Département Télécommunications
   main.js — Navigation, Particules, Compteur dynamique
   ============================================= */

/* ---- Particles ---- */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 16}s;
      animation-duration: ${10 + Math.random() * 12}s;
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
      opacity: ${0.2 + Math.random() * 0.3};
    `;
    container.appendChild(p);
  }
}

/* ---- Loading Screen ---- */
function initLoading() {
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loading').classList.add('hidden'), 1100);
  });
}

/* ---- Navigation ---- */
function initNavigation() {
  const navLinks    = document.querySelectorAll('.nav-link');
  const footerLinks = document.querySelectorAll('.footer-nav');
  const sections    = document.querySelectorAll('.page-section');

  function showSection(name) {
    sections.forEach(s => s.classList.remove('active'));
    navLinks.forEach(l => { l.classList.remove('active'); if (l.dataset.page === name) l.classList.add('active'); });
    const target = document.getElementById(name);
    if (target) target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(l => l.addEventListener('click', e => {
    e.preventDefault(); showSection(l.dataset.page);
    history.pushState(null, '', '#' + l.dataset.page);
  }));
  footerLinks.forEach(l => l.addEventListener('click', e => {
    e.preventDefault(); showSection(l.dataset.page);
    history.pushState(null, '', '#' + l.dataset.page);
  }));

  window.addEventListener('load', () => {
    const hash = location.hash.substring(1);
    showSection((hash && document.getElementById(hash)) ? hash : 'accueil');
  });

  window.addEventListener('popstate', () => {
    const hash = location.hash.substring(1);
    showSection((hash && document.getElementById(hash)) ? hash : 'accueil');
  });
}

/* ---- Header Scroll Effect ---- */
function initScrollEffects() {
  const header    = document.getElementById('header');
  const scrollTop = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 90);
    scrollTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ====================================================
   REAL VISITOR COUNTER
   - Total global : API CounterAPI (gratuit, partagé entre tous les visiteurs)
   - Aujourd'hui / semaine / mois : localStorage (réel, par navigateur)
   - Une seule incrémentation par session (30 min de gap minimum)
   ==================================================== */
async function initVisitorCounter() {
  const NAMESPACE   = 'enseirb-matmeca-telecom'; // identifiant unique du site
  const KEY_TOTAL   = 'total-visits';
  const SESSION_KEY = 'enseirb_session_ts';
  const LOCAL_KEY   = 'enseirb_visit_log';
  const SESSION_GAP = 30 * 60 * 1000; // 30 min

  const now = Date.now();

  // --- Déterminer si c'est une nouvelle session ---
  const lastSession  = parseInt(sessionStorage.getItem(SESSION_KEY) || '0', 10);
  const isNewSession = (now - lastSession) > SESSION_GAP || lastSession === 0;

  // --- Mise à jour du log local (pour today/week/month) ---
  let log;
  try { log = JSON.parse(localStorage.getItem(LOCAL_KEY)) || []; }
  catch { log = []; }

  if (isNewSession) {
    sessionStorage.setItem(SESSION_KEY, String(now));
    log.push(now);
    // Garder seulement les 90 derniers jours
    const cutoff = now - 90 * 24 * 60 * 60 * 1000;
    log = log.filter(t => t > cutoff);
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(log)); } catch {}
  }

  // --- Calcul des stats locales ---
  const todayStart = new Date(); todayStart.setHours(0,0,0,0);
  const weekStart  = new Date(todayStart); weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const monthStart = new Date(todayStart); monthStart.setDate(1);

  const todayCount = log.filter(t => t >= todayStart.getTime()).length;
  const weekCount  = log.filter(t => t >= weekStart.getTime()).length;
  const monthCount = log.filter(t => t >= monthStart.getTime()).length;

  animateCounter('todayCount',  0, todayCount,  800);
  animateCounter('weekCount',   0, weekCount,   1000);
  animateCounter('monthCount',  0, monthCount,  1200);

  // --- Compteur global via CounterAPI (vraies visites partagées) ---
  // CounterAPI : https://counterapi.dev — gratuit, sans inscription
  const endpoint = isNewSession
    ? `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY_TOTAL}/hit`  // incrémente + retourne
    : `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY_TOTAL}`;     // lecture seule

  try {
    const res  = await fetch(endpoint);
    const json = await res.json();
    const total = json.count ?? json.value ?? 0;
    animateCounter('visitorCount', 0, total, 1800, v => String(v).padStart(6, '0'));
  } catch {
    // Fallback si l'API est inaccessible : affiche le total local uniquement
    animateCounter('visitorCount', 0, log.length, 1800, v => String(v).padStart(6, '0'));
    console.warn('CounterAPI inaccessible — affichage du compteur local uniquement.');
  }
}

function animateCounter(id, from, to, duration, formatter = v => v) {
  const el = document.getElementById(id);
  if (!el) return;
  const startTime = performance.now();
  const diff = to - from;

  function step(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 4); // easeOutQuart
    el.textContent = formatter(Math.round(from + diff * ease));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---- Console Easter Egg ---- */
function initConsole() {
  console.log('%c🎓 ENSEIRB-MATMECA', 'color:#3b82f6;font-size:26px;font-weight:800;');
  console.log('%c📡 Département Télécommunications', 'color:#8b5cf6;font-size:17px;font-weight:700;');
  console.log('%cCurieux(se) ? Parfait — c\'est l\'esprit d\'un ingénieur ! 🚀', 'color:#10b981;font-size:13px;');
  console.log('%cContact : sec_telecom@enseirb-matmeca.fr', 'color:#ec4899;font-size:12px;');
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initLoading();
  initNavigation();
  initScrollEffects();
  initVisitorCounter();
  initConsole();
});

/* ---- Hamburger Menu (mobile) ---- */
function initHamburger() {
  const btn = document.getElementById('hamburgerBtn');
  const nav = document.querySelector('nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // Fermer le menu quand on clique sur un lien
  document.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      btn.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', initHamburger);
