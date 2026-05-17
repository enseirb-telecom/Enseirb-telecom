/**
 * counter.js — Compteur de visiteurs dynamique avec localStorage
 * Persiste entre les sessions, simule un flux de visiteurs
 */

const COUNTER_KEY   = 'enseirb_telecom_visits';
const BASE_TOTAL    = 3842;   // Départ réaliste
const SIM_INTERVAL  = 28000;  // Nouveaux visiteurs simulés toutes les ~28s

function getWeekStart(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay() + 1); // lundi
  return d.toDateString();
}

function getMonthStart(date) {
  return `${date.getFullYear()}-${date.getMonth()}`;
}

function loadData() {
  try {
    const raw = localStorage.getItem(COUNTER_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

function saveData(data) {
  try { localStorage.setItem(COUNTER_KEY, JSON.stringify(data)); } catch (_) {}
}

function initCounter() {
  const now       = new Date();
  const today     = now.toDateString();
  const weekStart = getWeekStart(now);
  const monthKey  = getMonthStart(now);

  let data = loadData();

  if (!data) {
    // Première visite sur ce navigateur : on initialise avec un base réaliste
    data = {
      total:      BASE_TOTAL + Math.floor(Math.random() * 50),
      todayDate:  null,
      todayCount: 0,
      weekStart:  null,
      weekCount:  0,
      monthKey:   null,
      monthCount: 0
    };
  }

  // Incrémenter le total pour cette visite
  data.total++;

  // Compteur du jour
  if (data.todayDate !== today) {
    data.todayDate  = today;
    data.todayCount = 1;
  } else {
    data.todayCount++;
  }

  // Compteur de la semaine
  if (data.weekStart !== weekStart) {
    data.weekStart  = weekStart;
    data.weekCount  = data.todayCount;
  } else {
    data.weekCount++;
  }

  // Compteur du mois
  if (data.monthKey !== monthKey) {
    data.monthKey   = monthKey;
    data.monthCount = data.todayCount;
  } else {
    data.monthCount++;
  }

  saveData(data);
  renderCounter(data);
  return data;
}

/* --- Rendu animé des compteurs --- */
function animateNumber(el, target, duration = 1200) {
  const start   = parseInt(el.textContent.replace(/\D/g, '')) || 0;
  const diff    = target - start;
  const steps   = 60;
  const stepMs  = duration / steps;
  let  current  = start;
  let  step     = 0;

  const timer = setInterval(() => {
    step++;
    const ease = 1 - Math.pow(1 - step / steps, 3); // ease-out cubic
    current = Math.round(start + diff * ease);
    el.textContent = current;
    if (step >= steps) { clearInterval(timer); el.textContent = target; }
  }, stepMs);
}

function renderCounter(data) {
  const mainEl   = document.getElementById('visitorCount');
  const todayEl  = document.getElementById('todayCount');
  const weekEl   = document.getElementById('weekCount');
  const monthEl  = document.getElementById('monthCount');

  if (!mainEl) return;

  // Compteur principal formaté 6 chiffres
  const total = data.total;
  let digits  = total.toString().padStart(6, '0');

  // Animation roll digit par digit
  mainEl.innerHTML = '';
  digits.split('').forEach((d, i) => {
    const span = document.createElement('span');
    span.className  = 'digit';
    span.textContent = '0';
    mainEl.appendChild(span);
    setTimeout(() => animateDigit(span, parseInt(d)), i * 120);
  });

  animateNumber(todayEl,  data.todayCount,  800);
  animateNumber(weekEl,   data.weekCount,   1000);
  animateNumber(monthEl,  data.monthCount,  1200);
}

function animateDigit(el, target) {
  let current = 0;
  const timer = setInterval(() => {
    el.textContent = current;
    current++;
    if (current > target) { clearInterval(timer); el.textContent = target; }
  }, 60);
}

/* --- Simulation de visiteurs en temps réel --- */
function simulateLiveVisitors() {
  setInterval(() => {
    const data = loadData();
    if (!data) return;

    // Entre 0 et 2 nouveaux visiteurs simulés
    const n = Math.floor(Math.random() * 3);
    if (n === 0) return;

    data.total      += n;
    data.todayCount += n;
    data.weekCount  += n;
    data.monthCount += n;
    saveData(data);

    // Mise à jour visuelle discrète
    const mainEl  = document.getElementById('visitorCount');
    const todayEl = document.getElementById('todayCount');
    if (mainEl) {
      const digits = data.total.toString().padStart(6, '0');
      mainEl.querySelectorAll('.digit').forEach((el, i) => {
        el.textContent = digits[i];
      });
      // Flash subtil
      mainEl.style.transform = 'scale(1.05)';
      setTimeout(() => { mainEl.style.transform = 'scale(1)'; }, 300);
    }
    if (todayEl) todayEl.textContent = data.todayCount;

  }, SIM_INTERVAL + Math.random() * 10000);
}

// Démarrage
window.addEventListener('DOMContentLoaded', () => {
  initCounter();
  simulateLiveVisitors();
});
