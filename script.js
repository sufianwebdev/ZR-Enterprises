const pageLoader = document.querySelector('.page-loader');
if (pageLoader) {
  let exitScheduled = false;
  const dismissPageLoader = () => {
    if (exitScheduled) return;
    exitScheduled = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wait = reducedMotion ? 0 : Math.max(0, 650 - performance.now());
    window.setTimeout(() => {
      document.documentElement.classList.remove('has-page-loader');
      window.setTimeout(() => pageLoader.remove(), reducedMotion ? 0 : 450);
    }, wait);
  };
  if (document.readyState === 'complete') dismissPageLoader();
  else window.addEventListener('load', dismissPageLoader, { once: true });
  window.setTimeout(dismissPageLoader, 2500);
}

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

function closeMenu() {
  nav?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (nav && !nav.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);

document.querySelectorAll('#year').forEach(el => { el.textContent = new Date().getFullYear(); });

const form = document.querySelector('#quote-form');
const categorySelect = document.querySelector('#category');
document.querySelectorAll('[data-category]').forEach(link => {
  link.addEventListener('click', () => {
    if (categorySelect) categorySelect.value = link.dataset.category;
  });
});

// The native POST keeps FormSubmit's free CAPTCHA enabled and works without JS.
// Set the thank-you URL to the current host so previews and alternate domains work.
const nextUrl = document.querySelector('#form-next');
if (nextUrl && ['https:', 'http:'].includes(window.location.protocol)) {
  nextUrl.value = new URL('thank-you.html', window.location.href).href;
}

document.querySelector('#whatsapp-form')?.addEventListener('click', () => {
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  if (String(data.get('_honey') || '').trim()) return;
  const value = name => String(data.get(name) || '').trim();
  const lines = ['Hello ZR Enterprises, I would like to request a quotation.', '',
    `Name: ${value('name')}`,
    value('company') ? `Company: ${value('company')}` : '',
    `Email: ${value('email')}`,
    `Phone / WhatsApp: ${value('phone')}`,
    `Category: ${value('category')}`,
    value('quantity') ? `Quantity: ${value('quantity')}` : '',
    value('delivery_city') ? `Delivery city: ${value('delivery_city')}` : '',
    value('preferred_model') ? `Preferred brand / model: ${value('preferred_model')}` : '',
    value('budget_pkr') ? `Budget (PKR): ${value('budget_pkr')}` : '',
    '', `Requirement: ${value('message')}`];
  const message = lines.filter(line => line !== '').join('\n');
  const url = `https://wa.me/923204174734?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  const status = document.querySelector('#form-status');
  if (status) status.textContent = 'Your WhatsApp chat is opening. Tap Send in WhatsApp to share your inquiry.';
});

form?.addEventListener('submit', event => {
  // Never replace native validation or claim email delivery before the provider confirms it.
  if (String(new FormData(form).get('_honey') || '').trim()) event.preventDefault();
});

if ('IntersectionObserver' in window && nav) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      nav.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href') === `#${entry.target.id}` && !link.classList.contains('button')) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

// The contact section already has WhatsApp actions; keep the floating shortcut
// away from the quotation form's controls on smaller screens.
const contactSection = document.querySelector('#contact');
const floatingChat = document.querySelector('.floating-whatsapp');
if ('IntersectionObserver' in window && contactSection && floatingChat) {
  const contactObserver = new IntersectionObserver(([entry]) => {
    floatingChat.classList.toggle('is-hidden', entry.isIntersecting);
  }, { rootMargin: '-90px 0px 0px 0px' });
  contactObserver.observe(contactSection);
}

// Duplicate only the visual track so the loop is seamless and screen readers
// encounter the list of brands once. Reduced-motion users get the static list.
const brandSlider = document.querySelector('.brand-slider');
if (brandSlider) {
  const track = brandSlider.querySelector('.brand-track');
  const brands = brandSlider.querySelector('.brand-names');
  const toggle = brandSlider.querySelector('.brand-motion-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const copy = brands.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  track.append(copy);
  brandSlider.classList.add('is-ready');
  const syncMotionPreference = () => { toggle.hidden = reducedMotion.matches; };
  syncMotionPreference();
  reducedMotion.addEventListener('change', syncMotionPreference);
  toggle.addEventListener('click', () => {
    const paused = brandSlider.classList.toggle('is-paused');
    toggle.setAttribute('aria-label', paused ? 'Resume brand slider' : 'Pause brand slider');
    toggle.querySelector('span').textContent = paused ? '▶' : 'Ⅱ';
  });
}

// The profile's sector logos form one continuous, user-controllable track.
// A visual-only copy keeps the loop seamless without repeating logos for screen readers.
const sectorLogoShowcase = document.querySelector('.sector-logo-showcase');
if (sectorLogoShowcase) {
  const track = sectorLogoShowcase.querySelector('.sector-logo-track');
  const group = sectorLogoShowcase.querySelector('.sector-logo-group');
  const toggle = sectorLogoShowcase.querySelector('.sector-logo-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const copy = group.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  copy.querySelectorAll('img').forEach(img => { img.alt = ''; });
  track.append(copy);
  sectorLogoShowcase.classList.add('is-ready');
  const syncPreference = () => { toggle.hidden = reducedMotion.matches; };
  syncPreference();
  reducedMotion.addEventListener('change', syncPreference);
  toggle.addEventListener('click', () => {
    const paused = sectorLogoShowcase.classList.toggle('is-paused');
    toggle.setAttribute('aria-label', paused ? 'Resume organization logo slider' : 'Pause organization logo slider');
    toggle.querySelector('span').textContent = paused ? '▶' : 'Ⅱ';
  });
}
