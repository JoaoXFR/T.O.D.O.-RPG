/**
 * TODO — RPG
 * Main JavaScript — Interactivity, Animations & Particles
 */

'use strict';

/* ══════════════════════════════════════════════════════════════
   HEADER SCROLL EFFECT
══════════════════════════════════════════════════════════════ */
const siteHeader = document.getElementById('site-header');

function handleHeaderScroll() {
  if (window.scrollY > 50) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll(); // run on load

/* ══════════════════════════════════════════════════════════════
   MOBILE NAVIGATION TOGGLE
══════════════════════════════════════════════════════════════ */
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

/* ══════════════════════════════════════════════════════════════
   TAB NAVIGATION SYSTEM
══════════════════════════════════════════════════════════════ */
const tabLinks = document.querySelectorAll('.tab-link');
const tabSections = document.querySelectorAll('.tab-section');

tabLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    if (!this.hasAttribute('data-target')) return;

    e.preventDefault();
    const target = this.getAttribute('data-target');

    // Deactivate all
    tabLinks.forEach(l => l.classList.remove('active-nav'));
    tabSections.forEach(s => s.classList.remove('active-tab'));

    // Activate target
    document.querySelectorAll(`.tab-link[data-target="${target}"]`).forEach(l => l.classList.add('active-nav'));
    document.querySelectorAll(`.tab-section[data-tab="${target}"]`).forEach(s => s.classList.add('active-tab'));

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Mobile menu close
    const mobileMenu = document.getElementById('mobile-menu');
    const navToggle = document.getElementById('nav-toggle');
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });
});

/* ══════════════════════════════════════════════════════════════
   SCROLL REVEAL ANIMATION
══════════════════════════════════════════════════════════════ */
function setupScrollReveal() {
  // Tag all major elements for reveal
  const selectors = [
    '.section-header',
    '.feature-item',
    '.tool-card',
    '.agent-card',
    '.testimonial-card',
    '.pricing-card',
    '.hb-card',
    '.cc-mini',
    '.campaign-card-big',
    '.split-content',
    '.split-visual',
    '.hero-stats',
    '.features-mockup',
    '.homebrew-preview',
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, idx) => {
      // Determine direction based on layout context
      if (el.closest('.split-layout') && !el.classList.contains('split-visual')) {
        el.classList.add('reveal-left');
      } else if (el.classList.contains('split-visual') || el.classList.contains('features-mockup') || el.classList.contains('homebrew-preview')) {
        el.classList.add('reveal-right');
      } else {
        el.classList.add('reveal');
      }
      // Stagger delay for grid items
      if (el.classList.contains('feature-item') ||
        el.classList.contains('tool-card') ||
        el.classList.contains('pricing-card') ||
        el.classList.contains('testimonial-card')) {
        el.style.transitionDelay = `${idx * 0.08}s`;
      }
    });
  });

  // Intersection Observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });
}

setupScrollReveal();

/* ══════════════════════════════════════════════════════════════
   ANIMATED COUNTER — HERO STATS
══════════════════════════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000; // ms
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('pt-BR');
  }

  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ══════════════════════════════════════════════════════════════
   PARTICLE CANVAS — HERO BACKGROUND
══════════════════════════════════════════════════════════════ */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
let animationId;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3 - 0.1, // slight upward drift
    size: Math.random() * 1.5 + 0.3,
    alpha: Math.random() * 0.5 + 0.1,
    alphaDir: (Math.random() > 0.5 ? 1 : -1) * 0.003,
    // Colors: red/crimson, purple, pale white
    hue: Math.random() < 0.5 ? 350 : (Math.random() < 0.5 ? 270 : 220),
    sat: Math.random() < 0.8 ? 80 : 10,
    lit: 60,
  };
}

function initParticles(count = 120) {
  if (!canvas) return;
  particles = [];
  for (let i = 0; i < count; i++) particles.push(createParticle());
}

function drawParticles() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    // Update position
    p.x += p.vx;
    p.y += p.vy;

    // Update alpha (twinkle)
    p.alpha += p.alphaDir;
    if (p.alpha > 0.7) { p.alpha = 0.7; p.alphaDir *= -1; }
    if (p.alpha < 0.05) { p.alpha = 0.05; p.alphaDir *= -1; }

    // Wrap around edges
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < -10) p.y = canvas.height;
    if (p.y > canvas.height) p.y = -10;

    // Draw
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.lit}%, ${p.alpha})`;
    ctx.fill();

    // Connect nearby particles with a faint line
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(196, 30, 58, ${(1 - dist / 90) * 0.06})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });

  animationId = requestAnimationFrame(drawParticles);
}

function initCanvas() {
  if (!canvas) return;
  resizeCanvas();
  initParticles();
  cancelAnimationFrame(animationId);
  drawParticles();
}

// Pause animation when not visible (performance)
const heroSection = document.getElementById('hero-section');
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!animationId) drawParticles();
    } else {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  });
}, { threshold: 0 });

if (heroSection) heroObserver.observe(heroSection);

// Resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initCanvas, 200);
}, { passive: true });

initCanvas();

/* ══════════════════════════════════════════════════════════════
   MOCKUP — DICE ROLL INTERACTION
══════════════════════════════════════════════════════════════ */
const rollBtns = document.querySelectorAll('.roll-btn');
const rollValue = document.querySelector('.roll-value');
const rollStatus = document.querySelector('.roll-status');

const statusMap = [
  { min: 1, max: 4, text: 'Falha Crítica!', cls: 'fail' },
  { min: 5, max: 9, text: 'Falha', cls: 'fail' },
  { min: 10, max: 14, text: 'Sucesso Parcial', cls: 'partial' },
  { min: 15, max: 19, text: 'Sucesso', cls: 'success' },
  { min: 20, max: 20, text: 'Sucesso Crítico!', cls: 'success' },
];

// Inject missing CSS for fail/partial
const extraStyle = document.createElement('style');
extraStyle.textContent = `
  .roll-status.fail    { background: rgba(220,38,38,0.15); color: #f87171; border: 1px solid rgba(220,38,38,0.3); }
  .roll-status.partial { background: rgba(251,191,36,0.12); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }
`;
document.head.appendChild(extraStyle);

function doRoll(btn) {
  // Highlight clicked button
  rollBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const d20 = Math.floor(Math.random() * 20) + 1;
  const bonus = Math.floor(Math.random() * 5) + 1;
  const total = d20 + bonus;

  // Animate the result text
  if (rollValue) {
    rollValue.style.opacity = '0';
    setTimeout(() => {
      rollValue.innerHTML = `🎲 ${d20} + ${bonus} = <strong>${total}</strong>`;
      rollValue.style.opacity = '1';
      rollValue.style.transition = 'opacity 0.2s';
    }, 100);
  }

  // Status text
  if (rollStatus) {
    const statusInfo = statusMap.find(s => total >= s.min && total <= s.max);
    rollStatus.className = `roll-status ${statusInfo?.cls || 'success'}`;
    rollStatus.textContent = statusInfo?.text || 'Sucesso';
  }

  // Shake animation
  btn.style.transform = 'rotate(15deg) scale(1.2)';
  setTimeout(() => { btn.style.transform = ''; }, 200);
}

rollBtns.forEach(btn => {
  btn.addEventListener('click', () => doRoll(btn));
});

// Auto-roll demo every 5s
let autoRollInterval;
function startAutoRoll() {
  autoRollInterval = setInterval(() => {
    const randomBtn = rollBtns[Math.floor(Math.random() * rollBtns.length)];
    if (randomBtn) doRoll(randomBtn);
  }, 4500);
}

const mockupObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!autoRollInterval) startAutoRoll();
    } else {
      clearInterval(autoRollInterval);
      autoRollInterval = null;
    }
  });
}, { threshold: 0.5 });

const mockupWindow = document.querySelector('.mockup-window');
if (mockupWindow) mockupObserver.observe(mockupWindow);

/* ══════════════════════════════════════════════════════════════
   ACTIVE NAV LINK — BASE STYLE
══════════════════════════════════════════════════════════════ */
// Inject active nav link style
const navStyle = document.createElement('style');
navStyle.textContent = `
  .nav-links a.active-nav,
  .nav-logo.active-nav {
    color: var(--color-text) !important;
  }
  .nav-links a.active-nav::after {
    transform: translateX(-50%) scaleX(1) !important;
  }
`;
document.head.appendChild(navStyle);

/* ══════════════════════════════════════════════════════════════
   PARALLAX — HERO SIGIL
══════════════════════════════════════════════════════════════ */
const heroSigil = document.querySelector('.hero-sigil');

if (heroSigil && window.matchMedia('(min-width: 768px)').matches) {
  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    heroSigil.style.transform = `translate(calc(-50% + ${dx * 15}px), calc(-50% + ${dy * 10}px))`;
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   UTILITY — Reduced Motion
══════════════════════════════════════════════════════════════ */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  cancelAnimationFrame(animationId);
  if (canvas) canvas.style.display = 'none';
  if (heroSigil) heroSigil.style.animation = 'none';
  document.querySelectorAll('.title-acronym .letter').forEach(l => {
    l.style.animation = 'none';
  });
}

/* ══════════════════════════════════════════════════════════════
   GLITCH TEXT EFFECT — TODO LOGO
══════════════════════════════════════════════════════════════ */
const logoAcronym = document.querySelector('.logo-acronym');

function glitchEffect(el) {
  const original = el.textContent;
  const glitchChars = '█▓▒░|/\\!@#%&*?<>[]{}0123456789';
  let iterations = 0;
  const maxIterations = 8;
  const interval = setInterval(() => {
    el.textContent = original
      .split('')
      .map((char, idx) => {
        if (char === '.') return char;
        if (idx < iterations / 2) return char;
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      })
      .join('');
    iterations++;
    if (iterations > maxIterations * 2) {
      clearInterval(interval);
      el.textContent = original;
    }
  }, 50);
}

if (logoAcronym && !prefersReducedMotion.matches) {
  logoAcronym.addEventListener('mouseenter', () => glitchEffect(logoAcronym));

  // Random glitch every 12s
  setInterval(() => {
    if (Math.random() > 0.5) glitchEffect(logoAcronym);
  }, 12000);
}

/* ══════════════════════════════════════════════════════════════
   TYPED TEXT EFFECT — HERO TITLE SUB
══════════════════════════════════════════════════════════════ */
const titleSub = document.querySelector('.title-sub');

function typeEffect(el, text, speed = 55) {
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

if (titleSub && !prefersReducedMotion.matches) {
  const originalText = titleSub.textContent;
  titleSub.textContent = '';

  // Wait a bit before starting the typing effect
  setTimeout(() => {
    typeEffect(titleSub, originalText);
  }, 800);
}

/* ══════════════════════════════════════════════════════════════
   CURSOR GLOW (desktop only)
══════════════════════════════════════════════════════════════ */
if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion.matches) {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  glow.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(196,30,58,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    will-change: transform;
  `;
  document.body.appendChild(glow);

  let glowX = 0, glowY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  function animateGlow() {
    glowX += (targetX - glowX) * 0.08;
    glowY += (targetY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

/* ══════════════════════════════════════════════════════════════
   INITIALIZATION LOG
══════════════════════════════════════════════════════════════ */
console.log(
  '%cTODO%c — Plataforma Paranormal\n%cSistema inicializado. Bem-vindo, Agente.',
  'font-size:24px; font-family: serif; color: #e8234a; font-weight: bold;',
  'font-size:12px; color: #9ca3b0;',
  'font-size:11px; color: #5c6474; font-style: italic;'
);

/* ══════════════════════════════════════════════════════════════
   APP STATE & LOCALSTORAGE MANAGER
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // --- STATS GLOBALS ---
  const globalAgentEl = document.getElementById('global-agent-count');
  const globalCampEl = document.getElementById('global-campaign-count');
  const globalSessEl = document.getElementById('global-sessions-count');

  function updateGlobalStats() {
    if (globalAgentEl) globalAgentEl.innerText = localStorage.getItem('todo_agent_count') || '0';
    if (globalCampEl) globalCampEl.innerText = localStorage.getItem('todo_camp_count') || '0';
    if (globalSessEl) globalSessEl.innerText = localStorage.getItem('todo_sess_count') || '0';
  }

  // Record a session visit purely for effect
  let sessCount = parseInt(localStorage.getItem('todo_sess_count') || '0');
  if (!sessionStorage.getItem('todo_active_session')) {
    sessCount++;
    localStorage.setItem('todo_sess_count', sessCount);
    sessionStorage.setItem('todo_active_session', 'true');
  }

  // --- AGENTS DASHBOARD ---
  const maxAgents = 30;
  let agentCount = parseInt(localStorage.getItem('todo_agent_count') || '0');
  const counterEl = document.getElementById('agente-counter');
  const emptyStateEl = document.getElementById('agent-empty-state');
  const btnTopCreate = document.getElementById('btn-top-create-agent');
  const btnCenterCreate = document.getElementById('btn-center-create-agent');
  const gridContainer = document.getElementById('agents-grid-container');

  function renderAgentCards() {
    document.querySelectorAll('.app-created-agent').forEach(el => el.remove());
    for (let i = 0; i < agentCount; i++) {
      createAgentDOM();
    }
    updateCounterSystem();
  }

  function updateCounterSystem() {
    localStorage.setItem('todo_agent_count', agentCount);
    if (counterEl) counterEl.innerText = `Agentes: ${agentCount}/${maxAgents}`;
    if (emptyStateEl) emptyStateEl.style.display = (agentCount === 0) ? 'flex' : 'none';
    updateGlobalStats();
  }

  function createAgentDOM() {
    const card = document.createElement('div');
    card.className = 'agent-dash-card app-created-agent';
    const dateStr = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });

    card.innerHTML = `
      <button class="agent-dash-settings btn-remove-agent" aria-label="Remover Agente">
        <i class="fas fa-trash" style="color: var(--color-red-light);"></i>
      </button>
      <div class="dash-card-content">
        <div class="dash-card-avatar empty"><i class="fas fa-user-secret"></i></div>
        <div class="dash-card-info">
          <h4>Novo Agente</h4>
          <span class="dash-card-class">Recruta</span>
          <span class="dash-card-date">Criado em ${dateStr}</span>
        </div>
      </div>
      <div class="dash-card-footer">
        <button class="btn btn-primary btn-sm">Acessar Ficha</button>
      </div>
    `;

    card.querySelector('.btn-remove-agent').addEventListener('click', () => {
      card.remove();
      agentCount--;
      updateCounterSystem();
    });

    if (gridContainer && emptyStateEl) gridContainer.insertBefore(card, emptyStateEl);
  }

  function handleCreateAgent() {
    if (agentCount >= maxAgents) return alert("Lotação Máxima! Você já tem 30 agentes.");
    agentCount++;
    createAgentDOM();
    updateCounterSystem();
  }

  if (btnTopCreate) btnTopCreate.addEventListener('click', handleCreateAgent);
  if (btnCenterCreate) btnCenterCreate.addEventListener('click', handleCreateAgent);

  // --- CAMPAIGNS DASHBOARD ---
  const maxCamps = 10;
  let campCount = parseInt(localStorage.getItem('todo_camp_count') || '0');
  const campCounterEl = document.getElementById('campaign-counter');
  const campEmptyStateEl = document.getElementById('campaign-empty-state');
  const btnTopCamp = document.getElementById('btn-top-create-campaign');
  const btnCenterCamp = document.getElementById('btn-center-create-campaign');
  const campGrid = document.getElementById('campaigns-grid-container');

  function renderCamps() {
    document.querySelectorAll('.app-created-camp').forEach(el => el.remove());
    for (let i = 0; i < campCount; i++) createCampDOM();
    updateCampCounter();
  }

  function updateCampCounter() {
    localStorage.setItem('todo_camp_count', campCount);
    if (campCounterEl) campCounterEl.innerText = `Campanhas: ${campCount}/${maxCamps}`;
    if (campEmptyStateEl) campEmptyStateEl.style.display = (campCount === 0) ? 'flex' : 'none';
    updateGlobalStats();
  }

  function createCampDOM() {
    const card = document.createElement('div');
    card.className = 'agent-dash-card app-created-camp';

    card.innerHTML = `
      <button class="agent-dash-settings btn-remove-camp" aria-label="Remover">
        <i class="fas fa-trash" style="color: var(--color-red-light);"></i>
      </button>
      <div class="dash-card-content">
        <div class="dash-card-avatar empty"><i class="fas fa-book-dead"></i></div>
        <div class="dash-card-info">
          <h4>Nova Investigação</h4>
          <span class="dash-card-class">Status: Preparação</span>
          <span class="dash-card-date">Mestre: Você</span>
        </div>
      </div>
      <div class="dash-card-footer">
        <button class="btn btn-outline btn-sm">Abrir Mesa</button>
      </div>
    `;

    card.querySelector('.btn-remove-camp').addEventListener('click', () => {
      card.remove();
      campCount--;
      updateCampCounter();
    });

    if (campGrid && campEmptyStateEl) campGrid.insertBefore(card, campEmptyStateEl);
  }

  function handleCreateCamp() {
    if (campCount >= maxCamps) return alert("Limite Atingido! Máximo de 10 Campanhas.");
    campCount++;
    createCampDOM();
    updateCampCounter();
  }

  if (btnTopCamp) btnTopCamp.addEventListener('click', handleCreateCamp);
  if (btnCenterCamp) btnCenterCamp.addEventListener('click', handleCreateCamp);

  // --- BESTIARY ENGINE ---
  const communityContent = document.getElementById('bestiary-community-content');
  const loginWall        = document.getElementById('bestiary-login-wall');
  const communityGrid    = document.getElementById('community-bestiary-grid');
  const communityEmpty   = document.getElementById('community-bestiary-empty');
  const agentNameLabel   = document.getElementById('bestiary-agent-name');
  const btnSubmitThreat  = document.getElementById('btn-submit-threat');

  const THREAT_ICONS = [
    'fas fa-ghost', 'fas fa-skull', 'fas fa-spider', 'fas fa-eye',
    'fas fa-skull-crossbones', 'fas fa-dragon', 'fas fa-bat',
    'fas fa-biohazard', 'fas fa-radiation', 'fas fa-cloud'
  ];

  // Helper — returns the per-user localStorage key, or null if not logged in
  function getUserBestiaryKey() {
    const userName = localStorage.getItem('todo_user_name');
    if (!userName) return null;
    // Sanitise name so it is safe as a key
    return 'todo_bestiary_' + userName.toLowerCase().replace(/\s+/g, '_');
  }

  function getThreatLevelClass(level) {
    const lvl = parseInt(level) || 1;
    if (lvl <= 2) return 'threat-2';
    if (lvl <= 4) return 'threat-4';
    if (lvl <= 6) return 'threat-6';
    if (lvl <= 8) return 'threat-8';
    return 'threat-10';
  }

  // Render threats that belong to the currently logged-in user
  function renderCommunityThreats() {
    if (!communityGrid) return;
    const key = getUserBestiaryKey();
    if (!key) return; // not logged in — guard

    const threats = JSON.parse(localStorage.getItem(key) || '[]');
    communityGrid.innerHTML = '';

    if (communityEmpty) {
      communityEmpty.style.display = threats.length === 0 ? 'flex' : 'none';
    }

    threats.forEach((threat, index) => {
      const card = document.createElement('article');
      card.className = 'bestiary-card community-card';
      card.setAttribute('role', 'listitem');

      const icon     = THREAT_ICONS[index % THREAT_ICONS.length];
      const lvlClass = getThreatLevelClass(threat.level);
      const naLabel  = threat.level ? `N.A. ${threat.level}` : 'N.A. ?';

      card.innerHTML = `
        <button class="bestiary-delete-btn" aria-label="Remover ameaça">
          <i class="fas fa-trash"></i>
        </button>
        <div class="bestiary-card-top">
          <div class="bestiary-threat-level ${lvlClass}">
            <span>${naLabel}</span>
          </div>
          <div class="bestiary-card-icon community-icon">
            <i class="${icon}"></i>
          </div>
        </div>
        <div class="bestiary-card-body">
          <h3 class="bestiary-card-name">${threat.name}</h3>
          <span class="bestiary-card-type">${threat.type}</span>
          <p class="bestiary-card-desc">${threat.desc}</p>
          <div class="bestiary-card-stats">
            <div class="bestiary-stat">
              <span class="bstat-label">PV</span>
              <span class="bstat-val">${threat.pv || '?'}</span>
            </div>
            <div class="bestiary-stat">
              <span class="bstat-label">DEF</span>
              <span class="bstat-val">${threat.def || '?'}</span>
            </div>
            <div class="bestiary-stat">
              <span class="bstat-label">SAN</span>
              <span class="bstat-val">${threat.san || '?'}</span>
            </div>
          </div>
        </div>
        <div class="bestiary-card-footer">
          <span class="bestiary-community-badge">
            <i class="fas fa-user-secret"></i> ${threat.author}
          </span>
          <small class="bestiary-card-date">${threat.date}</small>
        </div>
      `;

      card.querySelector('.bestiary-delete-btn').addEventListener('click', () => {
        const key2 = getUserBestiaryKey();
        if (!key2) return;
        const list = JSON.parse(localStorage.getItem(key2) || '[]');
        list.splice(index, 1);
        localStorage.setItem(key2, JSON.stringify(list));
        renderCommunityThreats();
      });

      communityGrid.appendChild(card);
    });
  }

  // Show or hide the community segment based on login state
  // Called on startup AND after every login/logout event
  function refreshBestiaryForUser() {
    const userName = localStorage.getItem('todo_user_name');
    const isLoggedIn = !!userName;

    if (loginWall)        loginWall.style.display        = isLoggedIn ? 'none' : 'flex';
    if (communityContent) communityContent.style.display = isLoggedIn ? 'block' : 'none';

    if (isLoggedIn) {
      // Update the agent-name label inside the form header
      if (agentNameLabel) agentNameLabel.textContent = userName;
      renderCommunityThreats();
    } else {
      // Clear any rendered cards from previous session
      if (communityGrid) communityGrid.innerHTML = '';
      if (communityEmpty) communityEmpty.style.display = 'none';
    }
  }

  // Submit handler
  if (btnSubmitThreat) {
    btnSubmitThreat.addEventListener('click', () => {
      const key = getUserBestiaryKey();
      if (!key) return; // safety guard

      const nameEl  = document.getElementById('bthreat-name');
      const typeEl  = document.getElementById('bthreat-type');
      const descEl  = document.getElementById('bthreat-desc');
      const pvEl    = document.getElementById('bthreat-pv');
      const defEl   = document.getElementById('bthreat-def');
      const sanEl   = document.getElementById('bthreat-san');
      const levelEl = document.getElementById('bthreat-level');

      const name = nameEl?.value.trim();
      const type = typeEl?.value.trim();
      const desc = descEl?.value.trim();

      // Validate required fields
      if (!name || !type || !desc) {
        [nameEl, typeEl, descEl].forEach(el => {
          if (el && !el.value.trim()) {
            el.style.borderColor = 'var(--color-red-light)';
            el.style.boxShadow   = '0 0 8px var(--color-red-glow)';
            setTimeout(() => { el.style.borderColor = ''; el.style.boxShadow = ''; }, 2500);
          }
        });
        return;
      }

      const author   = localStorage.getItem('todo_user_name') || 'Agente Anônimo';
      const now      = new Date();
      const dateStr  = now.toLocaleDateString('pt-BR') + ' '
                     + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      const threats = JSON.parse(localStorage.getItem(key) || '[]');
      threats.unshift({
        name,
        type,
        desc,
        pv:     pvEl?.value.trim()  || '',
        def:    defEl?.value.trim() || '',
        san:    sanEl?.value.trim() || '',
        level:  levelEl?.value      || '',
        author,
        date:   dateStr
      });
      localStorage.setItem(key, JSON.stringify(threats));

      // Clear form
      [nameEl, typeEl, descEl, pvEl, defEl, sanEl].forEach(el => { if (el) el.value = ''; });
      if (levelEl) levelEl.value = '';

      // Button feedback
      btnSubmitThreat.innerHTML = '<i class="fas fa-check"></i> Registrado!';
      btnSubmitThreat.style.background = 'var(--color-red-dark)';
      setTimeout(() => {
        btnSubmitThreat.innerHTML = '<i class="fas fa-skull"></i> Registrar Ameaça';
        btnSubmitThreat.style.background = '';
      }, 1800);

      renderCommunityThreats();
    });
  }

  // --- FORUM ENGINE ---
  const forumInput = document.getElementById('forum-input');
  const btnPostForum = document.getElementById('btn-post-forum');
  const forumFeed = document.getElementById('forum-feed-container');

  let posts = JSON.parse(localStorage.getItem('todo_forum_posts') || '[]');

  function saveAndRenderPosts() {
    localStorage.setItem('todo_forum_posts', JSON.stringify(posts));
    if (!forumFeed) return;
    forumFeed.innerHTML = '';

    if (posts.length === 0) {
      forumFeed.innerHTML = '<p style="color: var(--color-text-3); text-align: center; padding: 2rem;">O canal está silencioso. Seja o primeiro a relatar.</p>';
      return;
    }

    posts.forEach((post, index) => {
      const pDiv = document.createElement('div');
      pDiv.style = "background: var(--color-surface); padding: 1.25rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); border-left: 3px solid var(--color-red-dark);";
      pDiv.innerHTML = `
        <div style="display: flex; gap: 1rem;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-bg); display: grid; place-items: center; border: 1px solid var(--color-border); flex-shrink: 0;"><i class="fas fa-user" style="color: var(--color-text-3);"></i></div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <strong style="color: var(--color-text); font-size: 0.9rem;">Agente Anônimo</strong>
              <small style="color: var(--color-text-3); font-family: var(--font-mono); font-size: 0.7rem;">${post.date}</small>
            </div>
            <p style="color: var(--color-text-2); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">${post.text}</p>
            <div style="display: flex; gap: 1rem;">
              <button class="btn-like-post" data-index="${index}" style="background: none; border: none; color: ${post.liked ? 'var(--color-red-light)' : 'var(--color-text-3)'}; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; transition: color 0.2s;">
                <i class="fas fa-heart"></i> ${post.likes}
              </button>
            </div>
          </div>
        </div>
      `;

      const likeBtn = pDiv.querySelector('.btn-like-post');
      likeBtn.addEventListener('click', () => {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        saveAndRenderPosts();
      });

      forumFeed.appendChild(pDiv);
    });
  }

  if (btnPostForum && forumInput) {
    btnPostForum.addEventListener('click', () => {
      const text = forumInput.value.trim();
      if (!text) return;
      const now = new Date();
      posts.unshift({
        text: text,
        date: now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        likes: 0,
        liked: false
      });
      forumInput.value = '';
      saveAndRenderPosts();
    });
  }

  // --- LOGIN ENGINE ---
  const btnGoogleLogin   = document.getElementById('btn-google-login');
  const step1            = document.getElementById('login-step-1');
  const step2            = document.getElementById('login-step-2');
  const step3            = document.getElementById('login-step-3');
  const btnFinishLogin   = document.getElementById('btn-finish-login');
  const nameInput        = document.getElementById('new-agent-name-input');
  const step3NameEl      = document.getElementById('login-step3-name');

  // Nav elements
  const navBtnEnter      = document.getElementById('nav-btn-enter');
  const navUserPanel     = document.getElementById('nav-user-panel');
  const navUserNameBtn   = document.getElementById('nav-user-name-btn');
  const navProfileBtn    = document.getElementById('nav-profile-btn');
  const navProfileDrop   = document.getElementById('nav-profile-dropdown');
  const npdAgentName     = document.getElementById('npd-agent-name');
  const btnNavLogout     = document.getElementById('btn-nav-logout');
  const mobileLoginItem  = document.getElementById('mobile-login-item');

  // ── Profile dropdown toggle ──────────────────────────────
  if (navProfileBtn && navProfileDrop) {
    navProfileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navProfileDrop.classList.toggle('open');
      navProfileBtn.setAttribute('aria-expanded', String(isOpen));
      navProfileDrop.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close on outside click
    document.addEventListener('click', () => {
      navProfileDrop.classList.remove('open');
      navProfileBtn.setAttribute('aria-expanded', 'false');
      navProfileDrop.setAttribute('aria-hidden', 'true');
    });

    // Prevent closing when clicking inside the dropdown
    navProfileDrop.addEventListener('click', (e) => e.stopPropagation());

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navProfileDrop.classList.remove('open');
        navProfileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── checkLoginState ──────────────────────────────────────
  function checkLoginState() {
    const savedName = localStorage.getItem('todo_user_name');

    if (savedName) {
      // Nav: hide "Entrar", show profile button
      if (navBtnEnter)    navBtnEnter.style.display  = 'none';
      if (navUserPanel)   navUserPanel.style.display  = 'flex';
      if (navUserNameBtn) navUserNameBtn.textContent  = savedName;
      if (npdAgentName)   npdAgentName.textContent    = savedName;

      // Mobile menu: show login link to take user to step-3
      if (mobileLoginItem) mobileLoginItem.style.display = 'block';

      // Login page: show step-3
      if (step1) step1.style.display = 'none';
      if (step2) step2.style.display = 'none';
      if (step3) step3.style.display = 'block';
      if (step3NameEl) step3NameEl.textContent = savedName;

    } else {
      // Nav: show "Entrar", hide profile button
      if (navBtnEnter)  navBtnEnter.style.display  = '';
      if (navUserPanel) navUserPanel.style.display  = 'none';

      // Mobile menu
      if (mobileLoginItem) mobileLoginItem.style.display = 'block';

      // Login page: show step-1
      if (step1) step1.style.display = 'block';
      if (step2) step2.style.display = 'none';
      if (step3) step3.style.display = 'none';
    }
  }

  // ── Logout handler ──────────────────────────────────────
  function handleLogout() {
    // Close dropdown first
    if (navProfileDrop) {
      navProfileDrop.classList.remove('open');
      if (navProfileBtn) navProfileBtn.setAttribute('aria-expanded', 'false');
    }
    localStorage.removeItem('todo_user_name');
    checkLoginState();
    refreshBestiaryForUser();
    // Return to home
    const homeLink = document.querySelector('a[data-target="home"]');
    if (homeLink) homeLink.click();
  }

  if (btnNavLogout) btnNavLogout.addEventListener('click', handleLogout);

  // ── Google Login ────────────────────────────────────────
  if (btnGoogleLogin) {
    btnGoogleLogin.addEventListener('click', () => {
      const savedName = localStorage.getItem('todo_user_name');
      if (savedName) {
        const homeLink = document.querySelector('a[data-target="home"]');
        if (homeLink) homeLink.click();
      } else {
        if (step1) step1.style.display = 'none';
        if (step2) step2.style.display = 'block';
      }
    });
  }

  // ── Finish login (step 2) ────────────────────────────────
  if (btnFinishLogin && nameInput) {
    btnFinishLogin.addEventListener('click', () => {
      const pName = nameInput.value.trim();
      if (!pName) return alert('Por favor, informe seu Codenome de Agente.');
      localStorage.setItem('todo_user_name', pName);
      nameInput.value = '';
      checkLoginState();
      refreshBestiaryForUser();
      const homeLink = document.querySelector('a[data-target="home"]');
      if (homeLink) homeLink.click();
    });
  }

  // --- STARTUP ---
  updateGlobalStats();
  renderAgentCards();
  renderCamps();
  saveAndRenderPosts();
  refreshBestiaryForUser(); // show login-wall OR user's threats depending on session
  checkLoginState();
});
