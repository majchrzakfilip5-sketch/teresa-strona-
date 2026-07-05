const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Otwórz menu' : 'Zamknij menu');
  mobileNav.classList.toggle('open', !open);
  mobileNav.setAttribute('aria-hidden', String(open));
  document.body.classList.toggle('menu-open', !open);
});

mobileNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Otwórz menu');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px' });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const form = document.querySelector('#waitlist-form');
const toast = document.querySelector('.toast');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const button = form.querySelector('button');
  const original = button.innerHTML;
  button.disabled = true;
  button.innerHTML = 'Gotowe <span>✓</span>';
  toast.classList.add('show');
  form.reset();
  window.setTimeout(() => {
    toast.classList.remove('show');
    button.disabled = false;
    button.innerHTML = original;
  }, 4200);
});
