// ── NAV ──
const header = document.getElementById('site-header');
const toggle = document.getElementById('nav-toggle');
const drawer = document.getElementById('nav-drawer');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 40);
}, { passive: true });

function closeDrawer() {
  drawer.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}

toggle.addEventListener('click', () => {
  const open = drawer.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.drawer-link').forEach(a => {
  a.addEventListener('click', closeDrawer);
});

document.addEventListener('click', e => {
  if (!header.contains(e.target) && !drawer.contains(e.target)) closeDrawer();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDrawer();
});

// ── ACTIVE NAV LINK ──
const navLinks = document.querySelectorAll('[data-nav]');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href')));

const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const link = document.querySelector(`[data-nav][href="#${entry.target.id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('is-active'));
      link.classList.add('is-active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => s && spy.observe(s));

// ── SCROLL REVEAL ──
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('is-visible'), i * 60);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.sr').forEach(el => io.observe(el));

// ── PROJECT GALLERY THUMBNAILS ──
document.querySelectorAll('.gallery-thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetImg = document.getElementById(btn.dataset.target);
    if (!targetImg) return;
    const isContain = btn.dataset.fit === 'contain';
    targetImg.src = btn.dataset.src;
    targetImg.classList.toggle('project-media__img--contain', isContain);
    targetImg.parentElement.classList.toggle('project-media--tall', isContain);
    btn.parentElement.querySelectorAll('.gallery-thumb').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
  });
});
