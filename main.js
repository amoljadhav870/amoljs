// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// ===== Theme toggle (light / dark) =====
const themeBtn = document.querySelector('.theme-toggle');
const root = document.documentElement;

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') root.classList.add('light');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isLight = root.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// ===== Smooth scroll for in-page links =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const targetId = a.getAttribute('href').slice(1);
    const el = document.getElementById(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// ===== Contact form validation (client-side) =====
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

const showError = (name, msg) => {
  const small = document.querySelector(`.error[data-for="${name}"]`);
  if (small) small.textContent = msg || '';
};

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  showError('name');
  showError('email');
  showError('message');

  const data = new FormData(form);
  const name = data.get('name')?.toString().trim();
  const email = data.get('email')?.toString().trim();
  const message = data.get('message')?.toString().trim();

  let ok = true;
  if (!name) { showError('name', 'Please enter your name.'); ok = false; }
  if (!email || !isEmail(email)) { showError('email', 'Enter a valid email.'); ok = false; }
  if (!message || message.length < 10) { showError('message', 'Message must be at least 10 characters.'); ok = false; }

  if (!ok) return;

  // Demo: pretend to send (no backend). Replace with fetch() to your API.
  statusEl.textContent = 'Sending...';
  setTimeout(() => {
    statusEl.textContent = 'Thanks! Your message has been sent.';
    form.reset();
  }, 600);
});

// ===== Year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();
