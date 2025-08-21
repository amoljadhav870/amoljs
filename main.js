// main.js
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

// ===== BMI Calculator =====
const bmiForm = document.getElementById('bmiForm');
const bmiOut = document.getElementById('bmiResult');

bmiForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const h = parseFloat(document.getElementById('height').value);
  const w = parseFloat(document.getElementById('weight').value);
  if (!h || !w) { bmiOut.textContent = 'Enter height and weight.'; return; }
  const m = h / 100;
  const bmi = w / (m*m);
  let cat = 'Normal';
  if (bmi < 18.5) cat = 'Underweight';
  else if (bmi < 25) cat = 'Normal';
  else if (bmi < 30) cat = 'Overweight';
  else cat = 'Obese';
  bmiOut.textContent = `BMI: ${bmi.toFixed(1)} (${cat})`;
});

// ===== 1RM Estimator (Epley) =====
const ormForm = document.getElementById('ormForm');
const ormOut = document.getElementById('ormResult');
ormForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const load = parseFloat(document.getElementById('load').value);
  const reps = Math.min(12, Math.max(1, parseInt(document.getElementById('reps').value, 10)));
  if (!load || !reps) { ormOut.textContent = 'Enter load and reps.'; return; }
  const orm = load * (1 + reps/30); // Epley formula
  ormOut.textContent = `Estimated 1RM: ${orm.toFixed(1)} kg`;
});

// ===== Schedule table =====
const schedule = [
  { day: 'Mon', class: 'Push (Chest/Shoulders/Tris)', time: '7:00–8:00', coach: 'Alex' },
  { day: 'Tue', class: 'Pull (Back/Bis)', time: '7:00–8:00', coach: 'Rohit' },
  { day: 'Wed', class: 'Legs', time: '7:00–8:00', coach: 'Alex' },
  { day: 'Thu', class: 'Core & Conditioning', time: '7:00–8:00', coach: 'Meera' },
  { day: 'Fri', class: 'Full Body Strength', time: '7:00–8:00', coach: 'Rohit' },
  { day: 'Sat', class: 'Glute Focus', time: '9:00–10:00', coach: 'Meera' },
  { day: 'Sun', class: 'Mobility & Stretch', time: '9:00–10:00', coach: 'Alex' }
];
const tableBody = document.querySelector('#scheduleTable tbody');
const dayFilter = document.getElementById('dayFilter');

function renderSchedule(filter='all') {
  tableBody.innerHTML = '';
  schedule.filter(s => filter === 'all' || s.day === filter).forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.day}</td><td>${s.class}</td><td>${s.time}</td><td>${s.coach}</td>`;
    tableBody.appendChild(tr);
  });
}
if (tableBody) renderSchedule();
dayFilter?.addEventListener('change', () => renderSchedule(dayFilter.value));

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
  showError('name'); showError('email'); showError('message');

  const data = new FormData(form);
  const name = data.get('name')?.toString().trim();
  const email = data.get('email')?.toString().trim();
  const message = data.get('message')?.toString().trim();

  let ok = true;
  if (!name) { showError('name', 'Please enter your name.'); ok = false; }
  if (!email || !isEmail(email)) { showError('email', 'Enter a valid email.'); ok = false; }
  if (!message || message.length < 10) { showError('message', 'Message must be at least 10 characters.'); ok = false; }

  if (!ok) return;

  statusEl.textContent = 'Sending...';
  setTimeout(() => {
    statusEl.textContent = 'Thanks! Your message has been sent.';
    form.reset();
  }, 600);
});

// ===== Year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();
